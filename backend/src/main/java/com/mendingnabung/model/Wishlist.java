package com.mendingnabung.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore // cegah serialisasi circular / lazy proxy Customer ke JSON
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

    public void tambahWishlist() {
        this.date = (this.date != null) ? this.date : LocalDate.now();
        this.status = Status.PENDING;
        System.out.println("Item ditambahkan ke wishlist: " + (item != null ? item.getName() : "-")
                + " pada " + date);
    }

    public void hapusWishlist() {
        System.out.println("Item '" + (item != null ? item.getName() : "-")
                + "' dengan ID " + id + " di hapus dari wishlist.");
        this.status = Status.REJECTED;
    }

    public void tampilkanWishlist() {
        System.out.println("ID      : " + id);
        System.out.println("Tanggal : " + date);
        System.out.println("Status  : " + status);
        System.out.println("Item    : " + (item != null ? item.getName() : "-"));
        System.out.println("Customer: " + (customer != null ? customer.getUsername() : "-"));
    }
}