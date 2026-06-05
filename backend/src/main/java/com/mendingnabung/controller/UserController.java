package com.mendingnabung.controller;

import com.mendingnabung.dto.RegisterRequestDto;
import com.mendingnabung.model.user.Customer;
import com.mendingnabung.service.RecommendationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final RecommendationService recommendationService;

    /** POST /api/users/register */
    @PostMapping("/register")
    public ResponseEntity<Customer> register(@Valid @RequestBody RegisterRequestDto dto) {
        // TODO: To be implemented by team
        return null;
    }

    /** GET /api/users/{id} */
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getById(@PathVariable Long id) {
        // TODO: To be implemented by team
        return null;
    }
}
