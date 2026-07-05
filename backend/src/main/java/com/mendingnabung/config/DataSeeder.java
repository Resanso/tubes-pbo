package com.mendingnabung.config;

import com.mendingnabung.model.Category;
import com.mendingnabung.model.item.BarangPrimer;
import com.mendingnabung.model.item.BarangSekunder;
import com.mendingnabung.model.item.BarangTersier;
import com.mendingnabung.model.user.Customer;
import com.mendingnabung.repository.CategoryRepository;
import com.mendingnabung.repository.CustomerRepository;
import com.mendingnabung.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;
    private final CustomerRepository customerRepository;

    @Override
    @Transactional
    public void run(String... args) {
        if (categoryRepository.count() > 0) {
            log.info("Data sudah ada, skip seeding.");
            return;
        }

        log.info("Seeding data awal...");

        // === KATEGORI ===
        Category elektronik = categoryRepository.save(new Category("Elektronik"));
        Category fashion = categoryRepository.save(new Category("Fashion"));
        Category makanan = categoryRepository.save(new Category("Makanan & Minuman"));
        Category kesehatan = categoryRepository.save(new Category("Kesehatan"));
        Category transportasi = categoryRepository.save(new Category("Transportasi"));
        Category hiburan = categoryRepository.save(new Category("Hiburan"));
        Category pendidikan = categoryRepository.save(new Category("Pendidikan"));

        // === ITEMS ===
        // Barang Primer (kebutuhan pokok)
        itemRepository.save(new BarangPrimer("Beras 5kg", new BigDecimal("75000"), 5, makanan));
        itemRepository.save(new BarangPrimer("Minyak Goreng 2L", new BigDecimal("35000"), 4, makanan));
        itemRepository.save(new BarangPrimer("Telur 1kg", new BigDecimal("30000"), 5, makanan));
        itemRepository.save(new BarangPrimer("Gula Pasir 1kg", new BigDecimal("15000"), 3, makanan));
        itemRepository.save(new BarangPrimer("Masker Medis 50pcs", new BigDecimal("25000"), 4, kesehatan));

        // Barang Sekunder
        itemRepository.save(new BarangSekunder("Kemeja Formal", new BigDecimal("150000"), 3, fashion));
        itemRepository.save(new BarangSekunder("Sepatu Olahraga", new BigDecimal("350000"), 2, fashion));
        itemRepository.save(new BarangSekunder("Tas Ransel", new BigDecimal("200000"), 3, fashion));
        itemRepository.save(new BarangSekunder("Buku Paket Semester 1", new BigDecimal("120000"), 4, pendidikan));
        itemRepository.save(new BarangSekunder("Helm Standar SNI", new BigDecimal("180000"), 4, transportasi));

        // Barang Tersier
        itemRepository.save(new BarangTersier("Smartphone X", new BigDecimal("5500000"), 2, elektronik));
        itemRepository.save(new BarangTersier("Laptop Gaming", new BigDecimal("15000000"), 1, elektronik));
        itemRepository.save(new BarangTersier("Headphone Wireless", new BigDecimal("750000"), 2, elektronik));
        itemRepository.save(new BarangTersier("Smartwatch Pro", new BigDecimal("2500000"), 1, elektronik));
        itemRepository.save(new BarangTersier("Tiket Konser", new BigDecimal("500000"), 3, hiburan));
        itemRepository.save(new BarangTersier("Kacamata Hitam", new BigDecimal("450000"), 2, fashion));

        // === CUSTOMER tambahan ===
        if (customerRepository.findByUsername("resan").isEmpty()) {
            Customer resan = new Customer("resan", "resan123", new BigDecimal("50000"), new BigDecimal("3000000"));
            resan.setSaldo(new BigDecimal("50000"));
            resan.setPenghasilanBulanan(new BigDecimal("3000000"));
            customerRepository.save(resan);
        }

        if (customerRepository.findByUsername("testuser").isEmpty()) {
            Customer test = new Customer("testuser", "test123", new BigDecimal("100000"), new BigDecimal("2500000"));
            test.setSaldo(new BigDecimal("100000"));
            test.setPenghasilanBulanan(new BigDecimal("2500000"));
            customerRepository.save(test);
        }

        log.info("Seeding selesai! Total kategori: {}, item: {}, customer: {}",
                categoryRepository.count(), itemRepository.count(), customerRepository.count());
    }
}
