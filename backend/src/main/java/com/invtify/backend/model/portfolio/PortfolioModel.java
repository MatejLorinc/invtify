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
        List<Map.Entry<Timestamp, Float>> sortedEntries = new ArrayList<>();

        // Collect all values
        for (InvestmentModel investment : investments) {
            for (InvestmentDatetimeValueDto dto : investment.getInvestmentDatetimeValues()) {
                sortedEntries.add(Map.entry(dto.datetime(), dto.value()));
            }
        }

        // Sort by timestamp
        sortedEntries.sort(Comparator.comparing(Map.Entry::getKey));

        List<InvestmentDatetimeValueDto> mergedList = new ArrayList<>();
        Timestamp currentTimestamp = null;
        float sum = 0;

        for (Map.Entry<Timestamp, Float> entry : sortedEntries) {
            if (currentTimestamp == null || Math.abs(entry.getKey().getTime() - currentTimestamp.getTime()) > 3000) {
                // Save previous sum before moving to a new time window
                if (currentTimestamp != null) {
                    mergedList.add(new InvestmentDatetimeValueDto(sum, currentTimestamp));
                }
                // Reset
                currentTimestamp = entry.getKey();
                sum = entry.getValue();
            } else {
                // Merge within 3 seconds
                currentTimestamp = entry.getKey();
                sum += entry.getValue();
                mergedList.remove(mergedList.size() - 1);
            }
        }

        // Add the last accumulated sum
        if (currentTimestamp != null) {
            mergedList.add(new InvestmentDatetimeValueDto(sum, currentTimestamp));
        }

        return mergedList;
    }
}
