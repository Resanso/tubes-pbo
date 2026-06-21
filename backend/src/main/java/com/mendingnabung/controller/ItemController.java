package com.mendingnabung.controller;

import com.mendingnabung.dto.CreateItemDto;
import com.mendingnabung.model.Category;
import com.mendingnabung.model.item.BarangPrimer;
import com.mendingnabung.model.item.BarangSekunder;
import com.mendingnabung.model.item.BarangTersier;
import com.mendingnabung.model.item.Item;
import com.mendingnabung.repository.CategoryRepository;
import com.mendingnabung.repository.ItemRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ItemController {

    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;

    @PersistenceContext
    private EntityManager entityManager;

    /** GET /api/items */
    @GetMapping
    public ResponseEntity<List<Item>> getAll() {
        List<Item> items = entityManager
                .createQuery("SELECT DISTINCT i FROM Item i LEFT JOIN FETCH i.category", Item.class)
                .getResultList();
        return ResponseEntity.ok(items);
    }

    /** GET /api/items/{id} */
    @GetMapping("/{id}")
    public ResponseEntity<Item> getById(@PathVariable Long id) {
        List<Item> result = entityManager
                .createQuery("SELECT i FROM Item i LEFT JOIN FETCH i.category WHERE i.id = :id", Item.class)
                .setParameter("id", id)
                .getResultList();
        return result.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(result.get(0));
    }

    /** GET /api/items/search?q=keyword */
    @GetMapping("/search")
    public ResponseEntity<List<Item>> search(@RequestParam String q) {
        List<Item> items = entityManager
                .createQuery("SELECT DISTINCT i FROM Item i LEFT JOIN FETCH i.category WHERE LOWER(i.name) LIKE LOWER(:q)", Item.class)
                .setParameter("q", "%" + q + "%")
                .getResultList();
        return ResponseEntity.ok(items);
    }

    /** POST /api/items */
    @PostMapping
    @Transactional
    public ResponseEntity<Item> create(@Valid @RequestBody CreateItemDto dto) {
        Item item = switch (dto.getItemType()) {
            case PRIMER   -> new BarangPrimer(dto.getName(), dto.getPrice(), dto.getUrgency());
            case SEKUNDER -> new BarangSekunder(dto.getName(), dto.getPrice(), dto.getUrgency());
            case TERSIER  -> new BarangTersier(dto.getName(), dto.getPrice(), dto.getUrgency());
        };

        if (dto.getCategoryId() != null) {
            Category cat = categoryRepository.findById(dto.getCategoryId()).orElse(null);
            item.setCategory(cat);
        }

        return ResponseEntity.ok(itemRepository.save(item));
    }
}
