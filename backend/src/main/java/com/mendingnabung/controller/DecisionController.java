package com.mendingnabung.controller;

import com.mendingnabung.dto.DecisionRequestDto;
import com.mendingnabung.dto.DecisionResponseDto;
import com.mendingnabung.dto.DecisionResponseDto.SavingsPlanDto;
import com.mendingnabung.interfaces.PurchaseAdvice;
import com.mendingnabung.model.PurchaseDecision;
import com.mendingnabung.model.Recommendation;
import com.mendingnabung.model.Savings;
import com.mendingnabung.repository.CustomerRepository;
import com.mendingnabung.repository.ItemRepository;
import com.mendingnabung.repository.PurchaseDecisionRepository;
import com.mendingnabung.repository.SavingsRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/decisions")
@RequiredArgsConstructor
@Transactional
public class DecisionController {

    // Inject via interface PurchaseAdvice, bukan RecommendationService langsung (abstraction)
    private final PurchaseAdvice purchaseAdvice;
    private final CustomerRepository customerRepository;
    private final ItemRepository itemRepository;
    private final PurchaseDecisionRepository purchaseDecisionRepository;
    private final SavingsRepository savingsRepository;

    @PersistenceContext
    private EntityManager entityManager;

    /** POST /api/decisions — analisis dan kembalikan rekomendasi BELI atau NABUNG */
    @PostMapping
    public ResponseEntity<DecisionResponseDto> evaluate(@Valid @RequestBody DecisionRequestDto request) {
        // Load customer dan item, return 404 jika tidak ditemukan
        var customer = customerRepository.findById(request.getCustomerId()).orElse(null);
        var item     = itemRepository.findById(request.getItemId()).orElse(null);
        if (customer == null || item == null) return ResponseEntity.notFound().build();

        // Panggil service untuk mendapatkan keputusan BELI/NABUNG
        PurchaseDecision decision = purchaseAdvice.giveAdvice(customer, item);
        String advice = purchaseAdvice.beriSaran(customer, item);

        // Hitung estimasi durasi nabung (Modul 4: Komposisi — Recommendation digunakan di sini)
        Recommendation rec = new Recommendation(customer, item);
        int estimatedMonths = rec.estimasiBulanNabung();
        if (estimatedMonths <= 0) {
            estimatedMonths = 6; // default plan
        }

        // Buat savings plan jika keputusan NABUNG
        SavingsPlanDto savingsPlanDto = null;
        if (decision.getDecisionStatus() == PurchaseDecision.DecisionStatus.NABUNG) {
            // Hitung target: harga item (saldo saat ini mungkin kurang)
            BigDecimal targetAmount = item.getPrice();
            int duration = Math.max(estimatedMonths, 1); // minimal 1 bulan

            // Simpan ke database
            Savings savings = new Savings(targetAmount, duration, customer);
            savings.setResult(String.format(
                "Nabung Rp %s per bulan selama %d bulan untuk %s",
                targetAmount.divide(BigDecimal.valueOf(duration), 0, RoundingMode.CEILING),
                duration,
                item.getName()
            ));
            savingsRepository.save(savings);

            savingsPlanDto = new SavingsPlanDto(
                savings.getId(),
                savings.getTargetAmount(),
                savings.getDuration(),
                savings.getResult()
            );
        }

        // Map hasil ke DTO untuk dikirim ke frontend
        DecisionResponseDto response = new DecisionResponseDto(
            decision.getId(),
            decision.getDecisionStatus(),
            decision.getRegretScore(),
            decision.getRemainingBalance(),
            advice
        );
        response.setSavingsPlan(savingsPlanDto);

        return ResponseEntity.ok(response);
    }

    /** GET /api/decisions/customer/{customerId} — riwayat keputusan customer */
    @GetMapping("/customer/{customerId}")
    @Transactional(readOnly = true)
    public ResponseEntity<List<Map<String, Object>>> getByCustomer(@PathVariable Long customerId) {
        // JOIN FETCH customer dan item agar tidak kena LazyInitializationException saat beriSaran()
        // Modul 7: Stream + Lambda untuk mapping ke format HistoryEntry yang diharapkan frontend
        List<Map<String, Object>> history = entityManager
                .createQuery(
                    "SELECT d FROM PurchaseDecision d " +
                    "LEFT JOIN FETCH d.customer " +
                    "LEFT JOIN FETCH d.item i " +
                    "LEFT JOIN FETCH i.category " +
                    "WHERE d.customer.id = :cid " +
                    "ORDER BY d.id DESC",
                    PurchaseDecision.class)
                .setParameter("cid", customerId)
                .getResultList()
                .stream()
                .map(d -> {
                    // Nested map purchaseDecision agar cocok dengan tipe HistoryEntry di frontend
                    Map<String, Object> decision = new LinkedHashMap<>();
                    decision.put("decisionId",       d.getId());
                    decision.put("decisionStatus",   d.getDecisionStatus().name());
                    decision.put("regretScore",      d.getRegretScore());
                    decision.put("remainingBalance", d.getRemainingBalance());
                    decision.put("advice",           purchaseAdvice.beriSaran(d.getCustomer(), d.getItem()));

                    // Cari savings plan yang terkait (optional)
                    List<Savings> savingsList = savingsRepository.findByCustomerId(customerId);
                    if (!savingsList.isEmpty()) {
                        Savings latest = savingsList.get(savingsList.size() - 1);
                        Map<String, Object> savingsPlan = new LinkedHashMap<>();
                        savingsPlan.put("id",           latest.getId());
                        savingsPlan.put("targetAmount", latest.getTargetAmount());
                        savingsPlan.put("duration",     latest.getDuration());
                        savingsPlan.put("result",       latest.getResult());
                        decision.put("savingsPlan", savingsPlan);
                    }

                    Map<String, Object> entry = new LinkedHashMap<>();
                    entry.put("id",               d.getId());
                    entry.put("decisionDate",     LocalDate.now().toString());
                    entry.put("result",           d.getDecisionStatus().name());
                    entry.put("purchaseDecision", decision);
                    return entry;
                })
                .toList();
        return ResponseEntity.ok(history);
    }
}
