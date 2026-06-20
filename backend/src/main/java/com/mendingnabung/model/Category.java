package com.mendingnabung.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mendingnabung.model.item.Item;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    private List<Item> items = new ArrayList<>();

    public Category(String name) {
        this.name = name;
    }

    public void tambahKategori() {
        System.out.println("Kategori berhasil ditambahkan: " + name);
    }

    public void ubahKategori(String namaBaru) {
        System.out.println("Kategori diubah: " + name + " -> " + namaBaru);
        this.name = namaBaru;
    }

    public void hapusKategori() {
        System.out.println("Kategori '" + name + "' berhasil dihapus.");
        this.name = null;
    }
}