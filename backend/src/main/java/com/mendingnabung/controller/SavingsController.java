package com.mendingnabung.controller;

import com.mendingnabung.model.Savings;
import com.mendingnabung.repository.SavingsRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/savings")
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SavingsController {

    private final SavingsRepository savingsRepository;

    @PersistenceContext
    private EntityManager entityManager;

    /** GET /api/savings/customer/{customerId} — semua rencana tabungan customer */
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Map<String, Object>>> getByCustomer(@PathVariable Long customerId) {
        List<Savings> savingsList = entityManager
                .createQuery(
                    "SELECT s FROM Savings s " +
                    "LEFT JOIN FETCH s.customer " +
                    "WHERE s.customer.id = :cid " +
                    "ORDER BY s.id DESC",
                    Savings.class)
                .setParameter("cid", customerId)
                .getResultList();

        // Modul 7: Stream + Lambda untuk mapping ke format frontend
        List<Map<String, Object>> result = savingsList.stream()
                .map(s -> {
                    Map<String, Object> map = new LinkedHashMap<>();
                    map.put("id",           s.getId());
                    map.put("targetAmount", s.getTargetAmount());
                    map.put("duration",     s.getDuration());
                    map.put("result",       s.getResult());
                    return map;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }
}
