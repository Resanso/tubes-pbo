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
import java.util.List;

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
    @PostMapping
    public ResponseEntity<Wishlist> add(@RequestBody AddRequest req) {
        // Modul 9: try-catch untuk menangani customer/item tidak ditemukan
        try {
            var customer = customerRepository.findById(req.getCustomerId()).orElseThrow(
                () -> new IllegalArgumentException("Customer tidak ditemukan")
            );
            var item = itemRepository.findById(req.getItemId()).orElseThrow(
                () -> new IllegalArgumentException("Item tidak ditemukan")
            );

            Wishlist wishlist = new Wishlist(LocalDate.now(), customer, item);
            wishlist.tambahWishlist();
            return ResponseEntity.ok(wishlistRepository.save(wishlist));
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
