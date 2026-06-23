package com.mendingnabung.dto;

import com.mendingnabung.model.PurchaseDecision.DecisionStatus;
import com.mendingnabung.model.Savings;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/** Payload returned to the frontend after a recommendation is computed. */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DecisionResponseDto {

    private Long decisionId;
    private DecisionStatus decisionStatus;
    private double regretScore;
    private BigDecimal remainingBalance;
    private String advice;
    private SavingsPlanDto savingsPlan;

    /** Nested DTO for savings plan details. */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SavingsPlanDto {
        private Long id;
        private BigDecimal targetAmount;
        private int duration;
        private String result;
    }
}
