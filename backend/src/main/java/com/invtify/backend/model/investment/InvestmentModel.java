package com.invtify.backend.model.investment;

import com.invtify.backend.api.dto.InvestmentDatetimeValueDto;
import com.invtify.backend.persistance.entity.Investment;
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

    public static InvestmentModel create(Investment investment) {
        return InvestmentModel.builder()
                .uniqueId(investment.getId())
                .investmentStrategy(InvestmentStrategy.create(investment))
                .currentValue(investment.getTotallyInvested() + investment.getProfitLoss())
                .totallyInvested(investment.getTotallyInvested())
                .rateOfReturn(investment.getRateOfReturn())
                .profitLoss(investment.getProfitLoss())
                .investmentDatetimeValues(investment.getDatetimeValues().stream()
                        .map(investmentDatetimeValue ->
                                new InvestmentDatetimeValueDto(investmentDatetimeValue.getValue(),
                                        investmentDatetimeValue.getDatetime())
                        ).toList())
                .build();
    }
}
