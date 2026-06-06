package com.mendingnabung.model.user;

import com.mendingnabung.model.History;
import com.mendingnabung.model.Savings;
import com.mendingnabung.model.Wishlist;
import com.mendingnabung.model.item.Item;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
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

    public Wishlist inputBarang(Item item) {
        if (item == null) {
            throw new IllegalArgumentException("Item tidak boleh null");
        }

        Wishlist wishlist = new Wishlist(LocalDate.now(), this, item);
        this.wishlists.add(wishlist);
        return wishlist;
    }

    public Wishlist tambahWishlist(Item item) {
        Wishlist wishlist = inputBarang(item);
        System.out.println("Item ditambahkan ke wishlist: " + item.getName());
        return wishlist;
    }

    public void lihatHistory() {
        if (histories.isEmpty()) {
            System.out.println("Belum ada history untuk customer: " + getUsername());
            return;
        }

        histories.forEach(History::tampilkanHistory);
    }

    @Override
    public String getRole() {
        return "CUSTOMER";
    }
}
