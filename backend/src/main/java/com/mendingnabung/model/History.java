package com.mendingnabung.model;

import com.mendingnabung.model.user.Customer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "histories")
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "decision_date", nullable = false)
    private LocalDate decisionDate;

    /** Free-text summary of the decision outcome. */
    @Column(nullable = false, length = 500)
    private String result;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "purchase_decision_id")
    private PurchaseDecision purchaseDecision;

    public History(LocalDate decisionDate, String result, Customer customer) {
        this.decisionDate = decisionDate;
        this.result = result;
        this.customer = customer;
    }
}
