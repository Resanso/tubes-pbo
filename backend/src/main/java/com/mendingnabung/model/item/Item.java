package com.mendingnabung.model.item;

import com.mendingnabung.model.Category;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Abstract base class for all purchasable items.
 * Urgency scale: 1 (lowest) – 5 (highest).
 */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "items")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "item_type", discriminatorType = DiscriminatorType.STRING)
public abstract class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 200)
    private String name;

    @DecimalMin(value = "0.0")
    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal price;

    /** 1 = not urgent, 5 = extremely urgent */
    @Column(nullable = false)
    private int urgency;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    public Item(String name, BigDecimal price, int urgency) {
        this.name = name;
        this.price = price;
        this.urgency = urgency;
    }

    /**
     * Calculates a regret score if the customer does NOT buy this item.
     * Higher score = more regret for skipping.
     */
    public abstract double calculateRegretScore();

    /**
     * Returns a human-readable priority label for this item type.
     */
    public abstract String getPriorityLabel();
}
