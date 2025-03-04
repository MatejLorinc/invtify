package com.invtify.backend.api.dto;

import com.invtify.backend.model.investment.InvestmentFrequency;
import com.invtify.backend.model.investment.InvestmentStrategyType;
import lombok.Builder;
import lombok.Getter;

import java.sql.Date;
import java.util.UUID;

@Builder
@Getter
public class CreateInvestmentStrategyDto {
    private final InvestmentStrategyType strategy;
    private final InvestmentFrequency frequency;
    private final float amount;
    private final float priceDrop;
    private final UUID assetId;
    private final Date createdAt;
}
