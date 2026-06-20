package com.mendingnabung.dto;

import com.mendingnabung.model.item.ItemType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CreateItemDto {

    @NotBlank
    private String name;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal price;

    @Min(1) @Max(5)
    private int urgency;

    @NotNull
    private ItemType itemType;

    private Long categoryId;
}
