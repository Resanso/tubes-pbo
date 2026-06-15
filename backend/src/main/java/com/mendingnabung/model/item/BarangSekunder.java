package com.mendingnabung.model.item;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/** Secondary/comfort goods — important but not survival-critical. */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "barang_sekunder")
@DiscriminatorValue("SEKUNDER")
@PrimaryKeyJoinColumn(name = "item_id")
public class BarangSekunder extends Item {

    public BarangSekunder(String name, BigDecimal price, int urgency) {
        super(name, price, urgency);
    }

    @Override
    public double calculateRegretScore() {
        // Barang sekunder = kebutuhan pendukung, skor penyesalan sedang jika tidak dibeli
        // Formula: urgency * 15 (skala 0-75)
        return getUrgency() * 15.0;
    }

    @Override
    public String getPriorityLabel() {
        return "Kebutuhan Sekunder";
    }

    public double hitungPenyesalan() {
        return calculateRegretScore();
    }

    public String tampilkanSaran() {
        return getPriorityLabel();
    }
}
