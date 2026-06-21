package com.mendingnabung.interfaces;

import com.mendingnabung.model.PurchaseDecision;
import com.mendingnabung.model.item.Item;
import com.mendingnabung.model.user.Customer;

// Modul 6: Interface — mendefinisikan kontrak method yang harus diimplementasikan kelas lain
// Konsep: abstraction layer, controller bergantung pada interface ini, bukan class konkretnya
public interface PurchaseAdvice {

    // Kontrak 1: menganalisis kondisi keuangan dan menghasilkan keputusan BELI atau NABUNG
    PurchaseDecision giveAdvice(Customer customer, Item item);

    // Kontrak 2: menghasilkan saran dalam bentuk teks yang mudah dibaca oleh user
    String beriSaran(Customer customer, Item item);
}
