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
}
