package com.mendingnabung.dto;

import com.mendingnabung.model.PurchaseDecision.DecisionStatus;
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
}
