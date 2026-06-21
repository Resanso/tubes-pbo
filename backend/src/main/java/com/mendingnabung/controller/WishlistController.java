package com.mendingnabung.controller;

import com.mendingnabung.model.Wishlist;
import com.mendingnabung.repository.CustomerRepository;
import com.mendingnabung.repository.ItemRepository;
import com.mendingnabung.repository.WishlistRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wishlists")
@RequiredArgsConstructor
@Transactional
public class WishlistController {

    private final WishlistRepository wishlistRepository;
    private final CustomerRepository customerRepository;
    private final ItemRepository itemRepository;

    @PersistenceContext
    private EntityManager entityManager;

    // GET /api/wishlists/customer/{customerId}
    // JOIN FETCH item dan category agar tidak kena LazyInitializationException
    @GetMapping("/customer/{customerId}")
    @Transactional(readOnly = true)
    public ResponseEntity<List<Wishlist>> getByCustomer(@PathVariable Long customerId) {
        List<Wishlist> result = entityManager
                .createQuery(
                    "SELECT w FROM Wishlist w " +
                    "LEFT JOIN FETCH w.item i " +
                    "LEFT JOIN FETCH i.category " +
                    "WHERE w.customer.id = :cid " +
                    "ORDER BY w.id DESC",
                    Wishlist.class)
                .setParameter("cid", customerId)
                .getResultList();
        return ResponseEntity.ok(result);
    }

    // POST /api/wishlists — frontend mengirim { customerId, itemId }
    // Return Map agar tidak bergantung pada Hibernate proxy serialization
    @PostMapping
    public ResponseEntity<Map<String, Object>> add(@RequestBody AddRequest req) {
        try {
            var customer = customerRepository.findById(req.getCustomerId()).orElseThrow(
                () -> new IllegalArgumentException("Customer tidak ditemukan")
            );
            var item = itemRepository.findById(req.getItemId()).orElseThrow(
                () -> new IllegalArgumentException("Item tidak ditemukan")
            );

            Wishlist wishlist = new Wishlist(LocalDate.now(), customer, item);
            wishlist.tambahWishlist();
            Wishlist saved = wishlistRepository.save(wishlist);

            // Re-fetch dengan JOIN FETCH agar category ter-load dalam session yang sama
            Wishlist full = entityManager.createQuery(
                    "SELECT w FROM Wishlist w " +
                    "LEFT JOIN FETCH w.item i " +
                    "LEFT JOIN FETCH i.category " +
                    "WHERE w.id = :id", Wishlist.class)
                    .setParameter("id", saved.getId())
                    .getSingleResult();

            // Map manual ke struktur WishlistItem yang diharapkan frontend
            var itemObj = full.getItem();
            Map<String, Object> categoryMap = new LinkedHashMap<>();
            if (itemObj.getCategory() != null) {
                categoryMap.put("id", itemObj.getCategory().getId());
                categoryMap.put("name", itemObj.getCategory().getName());
            }
            Map<String, Object> itemMap = new LinkedHashMap<>();
            itemMap.put("id", itemObj.getId());
            itemMap.put("name", itemObj.getName());
            itemMap.put("price", itemObj.getPrice());
            itemMap.put("urgency", itemObj.getUrgency());
            itemMap.put("itemType", itemObj.getClass().getSimpleName().replace("Barang", "").toUpperCase());
            itemMap.put("priorityLabel", itemObj.getPriorityLabel());
            itemMap.put("category", categoryMap);

            Map<String, Object> result = new LinkedHashMap<>();
            result.put("id", full.getId());
            result.put("date", full.getDate().toString());
            result.put("status", full.getStatus().name());
            result.put("item", itemMap);
            return ResponseEntity.ok(result);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // DELETE /api/wishlists/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!wishlistRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        wishlistRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // DTO sederhana untuk request tambah wishlist (pattern seperti UserController.LoginRequest)
    @Getter
    @Setter
    static class AddRequest {
        private Long customerId;
        private Long itemId;
    }
}
