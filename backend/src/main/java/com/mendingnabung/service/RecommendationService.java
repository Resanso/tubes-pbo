package com.mendingnabung.service;

import com.mendingnabung.interfaces.PurchaseAdvice;
import com.mendingnabung.model.PurchaseDecision;
import com.mendingnabung.model.Recommendation;
import com.mendingnabung.model.item.Item;
import com.mendingnabung.model.user.Customer;
import com.mendingnabung.repository.PurchaseDecisionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;

// Modul 6: Interface — RecommendationService mengimplementasikan kontrak PurchaseAdvice
// Modul 7: Polimorfisme — controller bergantung pada interface PurchaseAdvice, bukan class ini langsung
@Service
@RequiredArgsConstructor
@Transactional
public class RecommendationService implements PurchaseAdvice {

    private final PurchaseDecisionRepository purchaseDecisionRepository;

    // Modul 6: @Override — mengimplementasikan method dari interface PurchaseAdvice
    @Override
    public PurchaseDecision giveAdvice(Customer customer, Item item) {
        // Buat objek Recommendation untuk analisis keuangan (Modul 4: Komposisi)
        Recommendation recommendation = new Recommendation(customer, item);

        PurchaseDecision.DecisionStatus status = recommendation.buatRekomendasi();
        double regretScore = item.calculateRegretScore();
        BigDecimal remainingBalance = customer.getBalance().subtract(item.getPrice());

        PurchaseDecision decision = new PurchaseDecision(
                remainingBalance, regretScore, status, customer, item
        );
        return purchaseDecisionRepository.save(decision);
    }

    // Menghitung rasio keterjangkauan: saldo / harga item
    public double computeAffordabilityRatio(Customer customer, Item item) {
        return new Recommendation(customer, item).analisisKeuangan();
    }

    // Modul 6: @Override — implementasi beriSaran() dari interface PurchaseAdvice
    @Override
    public String beriSaran(Customer customer, Item item) {
        return new Recommendation(customer, item).tampilkanKomentar();
    }

    // Estimasi berapa bulan yang dibutuhkan customer untuk menabung hingga mampu membeli
    public int estimateSavingsDuration(Customer customer, Item item) {
        BigDecimal kekurangan = item.getPrice().subtract(customer.getBalance());
        if (kekurangan.compareTo(BigDecimal.ZERO) <= 0) {
            return 0;
        }
        if (customer.getMonthlyIncome() == null ||
                customer.getMonthlyIncome().compareTo(BigDecimal.ZERO) == 0) {
            return Integer.MAX_VALUE;
        }
        return kekurangan
                .divide(customer.getMonthlyIncome(), 0, RoundingMode.CEILING)
                .intValue();
    }
}
