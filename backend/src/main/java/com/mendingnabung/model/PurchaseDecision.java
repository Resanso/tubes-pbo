package com.mendingnabung.model;

import com.mendingnabung.model.item.Item;
import com.mendingnabung.model.user.Customer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "purchase_decisions")
public class PurchaseDecision {

    public enum DecisionStatus {
        BELI,   // Buy
        NABUNG  // Save
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "remaining_balance", nullable = false, precision = 15, scale = 2)
    private BigDecimal remainingBalance;

    /** 0.0 – 100.0 composite regret/priority score */
    @Column(name = "regret_score", nullable = false)
    private double regretScore;

    @Enumerated(EnumType.STRING)
    @Column(name = "decision_status", nullable = false, length = 10)
    private DecisionStatus decisionStatus;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    public PurchaseDecision(BigDecimal remainingBalance, double regretScore,
                             DecisionStatus decisionStatus, Customer customer, Item item) {
        this.remainingBalance = remainingBalance;
        this.regretScore = regretScore;
        this.decisionStatus = decisionStatus;
        this.customer = customer;
        this.item = item;
    }

    // Modul 3: Enkapsulasi — field private, logika bisnis diakses lewat method public

    // Menghitung sisa uang customer setelah membeli item; nilai negatif = saldo tidak cukup
    public BigDecimal hitungSisaUang() {
        // Modul 9: Exception — try-catch untuk menangani kondisi data tidak valid
        try {
            if (customer == null || item == null) {
                throw new IllegalArgumentException("Customer atau item tidak boleh null");
            }
            return customer.getBalance().subtract(item.getPrice());
        } catch (IllegalArgumentException e) {
            System.out.println("Terjadi eksepsi saat menghitung sisa uang: " + e.getMessage());
            return BigDecimal.ZERO;
        } finally {
            System.out.println("hitungSisaUang() selesai dieksekusi");
        }
    }

    // Menentukan keputusan: BELI jika saldo cukup dan skor penyesalan >= 50, NABUNG jika tidak
    public DecisionStatus tentukanKeputusan() {
        try {
            BigDecimal sisa = hitungSisaUang();
            boolean saldoCukup = sisa.compareTo(BigDecimal.ZERO) >= 0;

            if (saldoCukup && regretScore >= 50.0) {
                return DecisionStatus.BELI;
            }
            return DecisionStatus.NABUNG;
        } catch (Exception e) {
            System.out.println("Terjadi eksepsi saat menentukan keputusan: " + e.getMessage());
            return DecisionStatus.NABUNG;
        }
    }

    // Menampilkan ringkasan hasil keputusan ke console
    public void tampilkanHasil() {
        System.out.println("===== Hasil Keputusan =====");
        System.out.println("Item         : " + (item != null ? item.getName() : "-"));
        System.out.println("Harga        : Rp " + (item != null ? item.getPrice() : 0));
        System.out.println("Saldo        : Rp " + (customer != null ? customer.getBalance() : 0));
        System.out.println("Sisa Uang    : Rp " + hitungSisaUang());
        System.out.printf ("Regret Score : %.1f / 100%n", regretScore);
        System.out.println("Keputusan    : " + decisionStatus);
        System.out.println("===========================");
    }
}
