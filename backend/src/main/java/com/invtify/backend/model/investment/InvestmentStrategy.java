package com.invtify.backend.model.investment;

import com.invtify.backend.persistance.entity.Investment;
import com.invtify.backend.persistance.entity.InvestmentAsset;
import lombok.Builder;
import lombok.Getter;

import java.sql.Date;

@Builder
@Getter
public class InvestmentStrategy {
    private final InvestmentStrategyType strategy;
    private final InvestmentFrequency frequency;
    private final float amount;
    private final float priceDrop;
    private final InvestmentAsset asset;
    private final Date createdAt;


    public static InvestmentStrategy create(Investment investment) {
        return InvestmentStrategy.builder()
                .asset(investment.getAsset())
                .strategy(investment.getStrategy())
                .frequency(new InvestmentFrequency(investment.getFrequencyType(), investment.getFrequencyDay(), investment.getFrequencyHour()))
                .amount(investment.getAmount())
                .priceDrop(investment.getPriceDrop())
                .createdAt(investment.getCreatedAt())
                .build();
    }
}
