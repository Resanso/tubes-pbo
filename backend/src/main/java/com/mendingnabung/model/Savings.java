package com.mendingnabung.model;

import com.mendingnabung.model.user.Customer;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "savings")
public class Savings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @DecimalMin(value = "0.0")
    @Column(name = "target_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal targetAmount;

    /** Duration in months to reach the target amount. */
    @Min(1)
    @Column(nullable = false)
    private int duration;

    /** Descriptive result or recommendation for the savings plan. */
    @Column(length = 500)
    private String result;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    public Savings(BigDecimal targetAmount, int duration, Customer customer) {
        this.targetAmount = targetAmount;
        this.duration = duration;
        this.customer = customer;
    }
}
