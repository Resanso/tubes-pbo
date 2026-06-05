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
        // TODO: To be implemented by team
        return 0;
    }

    @Override
    public String getPriorityLabel() {
        // TODO: To be implemented by team
        return null;
    }
}
