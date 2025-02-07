package com.invtify.backend.model.investment;

import com.invtify.backend.persistance.entity.Investment;
import com.invtify.backend.persistance.entity.InvestmentAsset;
import lombok.Builder;
import lombok.Getter;

import java.sql.Date;

@Builder
@Getter
public final class InvestmentModel {
    private final long uniqueId;
    private final InvestmentStrategy strategy;
    private final InvestmentFrequency frequency;
    private final float amount;
    private final float priceDrop;
    private final InvestmentAsset asset;
    private final Date createdAt;

    public static InvestmentModel create(Investment investment) {
        return InvestmentModel.builder()
                .uniqueId(investment.getId())
                .asset(investment.getAsset())
                .strategy(investment.getStrategy())
                .frequency(new InvestmentFrequency(investment.getFrequencyType(), investment.getFrequencyDay(), investment.getFrequencyHour()))
                .amount(investment.getAmount())
                .createdAt(investment.getCreatedAt())
                .build();
    }
}
