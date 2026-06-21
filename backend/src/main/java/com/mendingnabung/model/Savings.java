package com.mendingnabung.model;

import com.mendingnabung.model.user.Customer;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "savings")
public class Savings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @DecimalMin(value = "0.0")
    @Column(name = "target_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal targetAmount;

    /** Duration in months to reach the target amount. */
    @Min(1)
    @Column(nullable = false)
    private int duration;

    /** Descriptive result or recommendation for the savings plan. */
    @Column(length = 500)
    private String result;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    public Savings(BigDecimal targetAmount, int duration, Customer customer) {
        this.targetAmount = targetAmount;
        this.duration = duration;
        this.customer = customer;
    }

    // Modul 3: Enkapsulasi — field private (via @Getter/@Setter Lombok), logika di dalam method

    // Menghitung jumlah yang harus ditabung per bulan
    // Rumus: (targetAmount - saldo sekarang) / duration; return 0 jika saldo sudah cukup
    public BigDecimal hitungSimulasi() {
        // Modul 9: try-catch-finally untuk menangani data tidak valid
        try {
            if (customer == null || targetAmount == null) {
                throw new IllegalArgumentException("Customer dan targetAmount tidak boleh null");
            }
            if (duration <= 0) {
                throw new ArithmeticException("Durasi harus lebih dari 0 bulan");
            }
            BigDecimal kekurangan = targetAmount.subtract(customer.getBalance());
            if (kekurangan.compareTo(BigDecimal.ZERO) <= 0) {
                return BigDecimal.ZERO;
            }
            return kekurangan.divide(BigDecimal.valueOf(duration), 2, RoundingMode.CEILING);
        } catch (IllegalArgumentException | ArithmeticException e) {
            System.out.println("Terjadi eksepsi saat menghitung simulasi: " + e.getMessage());
            return BigDecimal.ZERO;
        } finally {
            System.out.println("hitungSimulasi() selesai dieksekusi");
        }
    }

    // Menampilkan rencana menabung ke console
    public void tampilkanSimulasi() {
        BigDecimal perBulan = hitungSimulasi();
        BigDecimal saldoSaatIni = customer != null ? customer.getBalance() : BigDecimal.ZERO;

        System.out.println("===== Simulasi Tabungan =====");
        System.out.println("Target        : Rp " + targetAmount);
        System.out.println("Saldo Saat Ini: Rp " + saldoSaatIni);
        System.out.println("Durasi        : " + duration + " bulan");

        if (perBulan.compareTo(BigDecimal.ZERO) == 0) {
            System.out.println("Status        : Saldo sudah cukup untuk mencapai target!");
        } else {
            System.out.println("Nabung/Bulan  : Rp " + perBulan);
            System.out.println("Keterangan    : Nabung Rp " + perBulan +
                    " per bulan selama " + duration + " bulan untuk mencapai target Rp " + targetAmount);
        }

        if (result != null && !result.isBlank()) {
            System.out.println("Catatan       : " + result);
        }
        System.out.println("=============================");
    }
}
