package com.invtify.backend.model.portfolio;

import com.invtify.backend.api.dto.InvestmentDatetimeValueDto;
import com.invtify.backend.model.investment.InvestmentModel;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;
import java.util.*;

@Builder
@Getter
public class PortfolioModel {
    private final float currentValue;
    private final float totalReturn;
    private final float totalReturnPercentage;
    private final float timeframeReturn;
    private final float timeframeReturnPercentage;
    private final List<InvestmentDatetimeValueDto> investmentDatetimeValues;

    public static PortfolioModel create(Collection<InvestmentModel> investments, PortfolioTimeframe timeframe) {
        float currentValue = investments.stream()
                .map(InvestmentModel::getCurrentValue)
                .reduce(0f, Float::sum);
        float investedValue = investments.stream()
                .map(InvestmentModel::getTotallyInvested)
                .reduce(0f, Float::sum);
        float totalReturn = currentValue - investedValue;
        float totalReturnPercentage = investedValue != 0 ? (totalReturn / investedValue) * 100 : 0;

        PortfolioTimeframe.TimeframeResult timeframeResult = timeframe.calculateTimeframeReturn(sumInvestments(investments), currentValue);

        return PortfolioModel.builder()
                .currentValue(currentValue)
                .totalReturn(totalReturn)
                .totalReturnPercentage(totalReturnPercentage)
                .timeframeReturn(timeframeResult.timeframeReturn())
                .timeframeReturnPercentage(timeframeResult.timeframeReturnPercentage())
                .investmentDatetimeValues(timeframeResult.datetimeValues())
                .build();
    }

    private static List<InvestmentDatetimeValueDto> sumInvestments(Collection<InvestmentModel> investments) {
        Map<Timestamp, Float> summedValues = new HashMap<>();

        for (InvestmentModel investment : investments) {
            for (InvestmentDatetimeValueDto dto : investment.getInvestmentDatetimeValues()) {
                summedValues.merge(dto.datetime(), dto.value(), Float::sum);
            }
        }

        return summedValues.entrySet().stream()
                .map(entry -> new InvestmentDatetimeValueDto(entry.getValue(), entry.getKey()))
                .sorted(Comparator.comparing(InvestmentDatetimeValueDto::datetime))
                .toList();
    }
}
