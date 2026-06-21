package com.mendingnabung.controller;

import com.mendingnabung.dto.DecisionRequestDto;
import com.mendingnabung.dto.DecisionResponseDto;
import com.mendingnabung.interfaces.PurchaseAdvice;
import com.mendingnabung.model.PurchaseDecision;
import com.mendingnabung.repository.CustomerRepository;
import com.mendingnabung.repository.ItemRepository;
import com.mendingnabung.repository.PurchaseDecisionRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/decisions")
@RequiredArgsConstructor
public class DecisionController {

    // Inject via interface PurchaseAdvice, bukan RecommendationService langsung (abstraction)
    private final PurchaseAdvice purchaseAdvice;
    private final CustomerRepository customerRepository;
    private final ItemRepository itemRepository;
    private final PurchaseDecisionRepository purchaseDecisionRepository;

    @jakarta.persistence.PersistenceContext
    private jakarta.persistence.EntityManager entityManager;

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

        // Map hasil ke DTO untuk dikirim ke frontend
        return ResponseEntity.ok(new DecisionResponseDto(
                decision.getId(),
                decision.getDecisionStatus(),
                decision.getRegretScore(),
                decision.getRemainingBalance(),
                advice
        ));
    }

    /** GET /api/decisions/customer/{customerId} — riwayat keputusan customer */
    @GetMapping("/customer/{customerId}")
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
