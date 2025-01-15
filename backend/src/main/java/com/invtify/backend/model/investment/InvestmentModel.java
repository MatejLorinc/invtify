package com.invtify.backend.model.investment;

import com.invtify.backend.model.broker.Broker;
import com.invtify.backend.persistance.entity.Investment;
import com.invtify.backend.persistance.entity.InvestmentAsset;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Builder
@Getter
public final class InvestmentModel {
    private final UUID uniqueId;
    private final InvestmentStrategy strategy;
    private final Broker provider;
    private final InvestmentFrequency frequency;
    private final float amount;
    private final InvestmentAsset asset;

    public static InvestmentModel create(Investment investment) {
        return InvestmentModel.builder()
                .uniqueId(investment.getId())
                .asset(investment.getAsset())
                .strategy(investment.getStrategy())
                .provider(investment.getProvider())
                .frequency(new InvestmentFrequency(investment.getFrequencyType(), investment.getFrequencyDay(), investment.getFrequencyHour()))
                .amount(investment.getAmount())
                .build();
    }
}
