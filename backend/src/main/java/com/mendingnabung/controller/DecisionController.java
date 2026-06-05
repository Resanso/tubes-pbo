package com.mendingnabung.controller;

import com.mendingnabung.dto.DecisionRequestDto;
import com.mendingnabung.dto.DecisionResponseDto;
import com.mendingnabung.service.RecommendationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/decisions")
@RequiredArgsConstructor
public class DecisionController {

    private final RecommendationService recommendationService;

    /** POST /api/decisions — analyse and return a buy-or-save recommendation. */
    @PostMapping
    public ResponseEntity<DecisionResponseDto> evaluate(@Valid @RequestBody DecisionRequestDto request) {
        // TODO: To be implemented by team
        return null;
    }

    /** GET /api/decisions/customer/{customerId} — fetch decision history for a customer. */
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<DecisionResponseDto>> getByCustomer(@PathVariable Long customerId) {
        // TODO: To be implemented by team
        return null;
    }
}
