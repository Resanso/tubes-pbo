package com.mendingnabung.model.item;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/** Primary/essential goods (sandang, pangan, papan). */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "barang_primer")
@DiscriminatorValue("PRIMER")
@PrimaryKeyJoinColumn(name = "item_id")
public class BarangPrimer extends Item {

    public BarangPrimer(String name, BigDecimal price, int urgency) {
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
