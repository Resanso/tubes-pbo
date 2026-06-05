package com.mendingnabung.model.user;

import com.mendingnabung.model.History;
import com.mendingnabung.model.Savings;
import com.mendingnabung.model.Wishlist;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "customers")
@DiscriminatorValue("CUSTOMER")
@PrimaryKeyJoinColumn(name = "user_id")
public class Customer extends User {

    @DecimalMin(value = "0.0")
    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal balance;

    @DecimalMin(value = "0.0")
    @Column(name = "monthly_income", nullable = false, precision = 15, scale = 2)
    private BigDecimal monthlyIncome;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Wishlist> wishlists = new ArrayList<>();

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<History> histories = new ArrayList<>();

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Savings> savingsList = new ArrayList<>();

    public Customer(String username, String password, BigDecimal balance, BigDecimal monthlyIncome) {
        super(username, password);
        this.balance = balance;
        this.monthlyIncome = monthlyIncome;
    }

    @Override
    public String getRole() {
        // TODO: To be implemented by team
        return null;
    }
}
