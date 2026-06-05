package com.mendingnabung.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class RegisterRequestDto {

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal balance;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal monthlyIncome;
}
