package com.mendingnabung.controller;

import com.mendingnabung.model.Wishlist;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlists")
@RequiredArgsConstructor
public class WishlistController {

    /** GET /api/wishlists/customer/{customerId} */
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Wishlist>> getByCustomer(@PathVariable Long customerId) {
        // TODO: To be implemented by team
        return null;
    }

    /** POST /api/wishlists */
    @PostMapping
    public ResponseEntity<Wishlist> add(@RequestBody Wishlist wishlist) {
        // TODO: To be implemented by team
        return null;
    }

    /** DELETE /api/wishlists/{id} */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        // TODO: To be implemented by team
        return null;
    }
}
