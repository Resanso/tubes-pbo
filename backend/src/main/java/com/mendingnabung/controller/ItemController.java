package com.mendingnabung.controller;

import com.mendingnabung.model.item.Item;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {

    /** GET /api/items */
    @GetMapping
    public ResponseEntity<List<Item>> getAll() {
        // TODO: To be implemented by team
        return null;
    }

    /** GET /api/items/{id} */
    @GetMapping("/{id}")
    public ResponseEntity<Item> getById(@PathVariable Long id) {
        // TODO: To be implemented by team
        return null;
    }

    /** GET /api/items/search?q=keyword */
    @GetMapping("/search")
    public ResponseEntity<List<Item>> search(@RequestParam String q) {
        // TODO: To be implemented by team
        return null;
    }
}
