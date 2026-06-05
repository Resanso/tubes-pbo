package com.mendingnabung.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Payload sent by the frontend to request a buy-or-save recommendation. */
@Getter
@Setter
@NoArgsConstructor
public class DecisionRequestDto {

    @NotNull
    private Long customerId;

    @NotNull
    private Long itemId;
}
