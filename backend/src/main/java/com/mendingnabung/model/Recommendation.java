package com.mendingnabung.model;

import com.mendingnabung.model.item.Item;
import com.mendingnabung.model.user.Customer;

import java.math.BigDecimal;
import java.math.RoundingMode;

// Modul 3: Enkapsulasi — field private, hanya bisa diakses lewat constructor dan method
public class Recommendation {

    // Modul 3: field private (enkapsulasi)
    private final Customer customer;
    private final Item item;

    // Modul 3: Constructor untuk inisialisasi objek
    public Recommendation(Customer customer, Item item) {
        // Modul 9: throw exception jika data tidak valid
        if (customer == null || item == null) {
            throw new IllegalArgumentException("Customer dan item tidak boleh null");
        }
        this.customer = customer;
        this.item = item;
    }

    // Menganalisis kondisi keuangan: mengembalikan rasio saldo/harga
    // Nilai >= 1.0 berarti customer mampu membeli
    public double analisisKeuangan() {
        // Modul 9: try-catch-finally untuk menangani eksepsi pembagian
        try {
            BigDecimal harga = item.getPrice();
            if (harga == null || harga.compareTo(BigDecimal.ZERO) == 0) {
                throw new ArithmeticException("Harga item tidak boleh nol");
            }
            return customer.getBalance()
                    .divide(harga, 4, RoundingMode.HALF_UP)
                    .doubleValue();
        } catch (ArithmeticException e) {
            System.out.println("Terjadi eksepsi saat analisis keuangan: " + e.getMessage());
            return 0.0;
        } finally {
            System.out.println("analisisKeuangan() selesai dieksekusi");
        }
    }

    // Menentukan rekomendasi: BELI jika saldo cukup dan regret score >= 50, NABUNG jika tidak
    public PurchaseDecision.DecisionStatus buatRekomendasi() {
        boolean saldoCukup = customer.getBalance().compareTo(item.getPrice()) >= 0;
        double regretScore = item.calculateRegretScore();

        if (saldoCukup && regretScore >= 50.0) {
            return PurchaseDecision.DecisionStatus.BELI;
        }
        return PurchaseDecision.DecisionStatus.NABUNG;
    }

    // Menghasilkan kalimat saran yang mudah dibaca berdasarkan hasil buatRekomendasi()
    public String tampilkanKomentar() {
        PurchaseDecision.DecisionStatus status = buatRekomendasi();
        double rasio = analisisKeuangan();
        double regretScore = item.calculateRegretScore();
        int bulanNabung = estimasiBulanNabung();

        if (status == PurchaseDecision.DecisionStatus.BELI) {
            return String.format(
                "Rekomendasi: BELI — Saldo kamu %.0f%% dari harga item dan skor penyesalan %.0f/100. " +
                "Sebaiknya segera beli %s sebelum kehabisan!",
                rasio * 100, regretScore, item.getName()
            );
        } else if (rasio >= 1.0) {
            return String.format(
                "Rekomendasi: TAHAN DULU — Saldo cukup, tapi skor penyesalan hanya %.0f/100. " +
                "%s bukan kebutuhan mendesak saat ini.",
                regretScore, item.getName()
            );
        } else {
            return String.format(
                "Rekomendasi: NABUNG — Saldo belum cukup (kurang %.2f). " +
                "Dengan penghasilan bulanan kamu, butuh sekitar %d bulan untuk membeli %s.",
                item.getPrice().subtract(customer.getBalance()), bulanNabung, item.getName()
            );
        }
    }

    // Estimasi berapa bulan yang dibutuhkan untuk menabung hingga mampu membeli
    private int estimasiBulanNabung() {
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
