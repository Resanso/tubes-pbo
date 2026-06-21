package com.mendingnabung.controller;

import com.mendingnabung.dto.RegisterRequestDto;
import com.mendingnabung.model.user.Customer;
import com.mendingnabung.repository.CustomerRepository;
import com.mendingnabung.service.RecommendationService;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final RecommendationService recommendationService;
    private final CustomerRepository customerRepository;

    /** POST /api/users/register */
    @PostMapping("/register")
    public ResponseEntity<Customer> register(@Valid @RequestBody RegisterRequestDto dto) {
        Customer customer = new Customer(dto.getUsername(), dto.getPassword(), dto.getBalance(), dto.getMonthlyIncome());
        return ResponseEntity.ok(customerRepository.save(customer));
    }

    /** POST /api/users/login */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        return customerRepository.findByUsername(req.getUsername())
                .filter(c -> c.getPassword().equals(req.getPassword()))
                .map(c -> ResponseEntity.ok(Map.of(
                        "token", "dev-token-" + c.getId(),
                        "customer", Map.of(
                                "id", c.getId(),
                                "username", c.getUsername(),
                                "role", c.getRole(),
                                "balance", c.getBalance(),
                                "monthlyIncome", c.getMonthlyIncome()
                        )
                )))
                .orElse(ResponseEntity.status(401).build());
    }

    /** GET /api/users/{id} */
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getById(@PathVariable Long id) {
        return customerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Getter
    @Setter
    static class LoginRequest {
        private String username;
        private String password;
    }
}
