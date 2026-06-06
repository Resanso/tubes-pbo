package com.mendingnabung.model.user;

import com.mendingnabung.model.item.Item;
import com.mendingnabung.repository.ItemRepository;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.val;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "admins")
@DiscriminatorValue("ADMIN")
@PrimaryKeyJoinColumn(name = "user_id")
public class Admin extends User {

    public Admin(String username, String password) {
        super(username, password);
    }

    @Override
    public String getRole() {
        // TODO: To be implemented by team
        return "Admin";
    }

    public void tambahItem(Item item, ItemRepository itemRepository){
        itemRepository.save(item);
        System.out.println("Item " + item.getName() + "Berhasil ditambahkan.");
    }

    public void ubahItem(Item item, ItemRepository itemRepository){
       if (itemRepository.existsById(item.getId())) {
            itemRepository.save(item);
            System.out.println("Item dengan ID" + item.getId() + "Berhasil diubah.");
        }else{
            System.out.println("Item tidak ditemukan.");
        }
    }

    public void hapusItem(Long itemId, ItemRepository itemRepository){
        if (itemRepository.existsById(itemId)) {
            itemRepository.deleteById(itemId);
            System.out.println("Item dengan ID" + itemId + "Berhasil dihapus.");
        }else{
            System.out.println("Item tidak ditemukan.");
        }
    }

    public void LihatDataItem(ItemRepository itemRepository){
        val items = itemRepository.findAll();
        if (items.isEmpty()) {
            System.out.println("Tidak ada item yang tersedia.");
        } else {
            System.out.println("Daftar Item:");
            items.forEach(item -> System.out.println("ID: " + item.getId() + ", Nama: " + item.getName() + ", Harga: " + item.getPrice()));
        }
    }
}
