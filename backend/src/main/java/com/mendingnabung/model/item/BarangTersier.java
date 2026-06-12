package com.mendingnabung.model.item;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/** Tertiary/luxury goods — wants, not needs. */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "barang_tersier")
@DiscriminatorValue("TERSIER")
@PrimaryKeyJoinColumn(name = "item_id")
public class BarangTersier extends Item {

    public BarangTersier(String name, BigDecimal price, int urgency) {
        super(name, price, urgency);
    }

    @Override
    public double calculateRegretScore() {
        // Barang tersier = kebutuhan mewah/keinginan, skor penyesalan rendah jika tidak dibeli
        // Formula: urgency * 10 (skala 0-50)
        return getUrgency() * 10.0;
    }

    @Override
    public String getPriorityLabel() {
        return "Kebutuhan Tersier";
    }

    public double hitungPenyesalan() {
        return calculateRegretScore();
    }

    public String tampilkanSaran() {
        return getPriorityLabel();
    }
}
