package com.invtify.backend.model.investment;

import com.invtify.backend.persistance.entity.Investment;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public final class InvestmentModel {
    private final long uniqueId;
    private final InvestmentStrategy investmentStrategy;
    private final float currentValue;
    private final float totallyInvested;
    private final float rateOfReturn;
    private final float profitLoss;

    public static InvestmentModel create(Investment investment) {
        return InvestmentModel.builder()
                .uniqueId(investment.getId())
                .investmentStrategy(InvestmentStrategy.create(investment))
                .build();
    }
}
