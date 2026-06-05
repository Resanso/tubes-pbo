package com.mendingnabung.model;

import com.mendingnabung.model.item.Item;
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
@Table(name = "wishlists")
public class Wishlist {

    public enum Status {
        PENDING, APPROVED, REJECTED, PURCHASED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status = Status.PENDING;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    public Wishlist(LocalDate date, Customer customer, Item item) {
        this.date = date;
        this.customer = customer;
        this.item = item;
    }
}
