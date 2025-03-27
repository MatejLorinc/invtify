package com.invtify.backend.model.investment;

import com.invtify.backend.api.dto.InvestmentDatetimeValueDto;
import com.invtify.backend.model.portfolio.PortfolioTimeframe;
import com.invtify.backend.persistance.entity.Investment;
import com.invtify.backend.service.broker.services.OpenPosition;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public final class InvestmentModel {
    private final long uniqueId;
    private final InvestmentStrategy investmentStrategy;
    private final float currentValue;
    private final float totallyInvested;
    private final float rateOfReturn;
    private final float profitLoss;
    private final List<InvestmentDatetimeValueDto> investmentDatetimeValues;

    public static InvestmentModel create(Investment investment, OpenPosition position) {
        float currentValue = position.price() * position.quantity();
        float totallyInvested = investment.getTotallyInvested();
        float profitLoss = currentValue - totallyInvested;

        return InvestmentModel.builder()
                .uniqueId(investment.getId())
                .investmentStrategy(InvestmentStrategy.create(investment))
                .currentValue(currentValue)
                .totallyInvested(totallyInvested)
                .rateOfReturn(totallyInvested == 0 ? 0 : profitLoss / totallyInvested * 100)
                .profitLoss(profitLoss)
                .investmentDatetimeValues(PortfolioTimeframe.reduceList(investment.getDatetimeValues().stream()
                        .map(investmentDatetimeValue ->
                                new InvestmentDatetimeValueDto(investmentDatetimeValue.getValue(),
                                        investmentDatetimeValue.getDatetime())
                        ).toList()))
                .build();
    }
}
