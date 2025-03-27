package com.invtify.backend.model.portfolio;

import com.invtify.backend.api.dto.InvestmentDatetimeValueDto;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public enum PortfolioTimeframe {
    DAY {
        @Override
        public TimeframeResult calculateTimeframeReturn(List<InvestmentDatetimeValueDto> values, float currentValue) {
            return calculateReturnForPeriod(values, currentValue, Duration.ofDays(1));
        }
    },
    WEEK {
        @Override
        public TimeframeResult calculateTimeframeReturn(List<InvestmentDatetimeValueDto> values, float currentValue) {
            return calculateReturnForPeriod(values, currentValue, Duration.ofDays(7));
        }
    },
    MONTH {
        @Override
        public TimeframeResult calculateTimeframeReturn(List<InvestmentDatetimeValueDto> values, float currentValue) {
            return calculateReturnForPeriod(values, currentValue, Duration.ofDays(30));
        }
    },
    YEAR {
        @Override
        public TimeframeResult calculateTimeframeReturn(List<InvestmentDatetimeValueDto> values, float currentValue) {
            return calculateReturnForPeriod(values, currentValue, Duration.ofDays(365));
        }
    },
    MAX {
        @Override
        public TimeframeResult calculateTimeframeReturn(List<InvestmentDatetimeValueDto> values, float currentValue) {
            List<InvestmentDatetimeValueDto> processedValues = reduceList(values);
            if (processedValues.isEmpty()) {
                return new TimeframeResult(0, 0, processedValues);
            }
            InvestmentDatetimeValueDto earliest = Collections.min(
                    processedValues, Comparator.comparing(dto -> dto.datetime().toInstant())
            );
            float initialValue = earliest.value();
            float timeframeReturn = currentValue - initialValue;
            float timeframeReturnPercentage = (initialValue == 0) ? 0 : (timeframeReturn / initialValue) * 100;
            return new TimeframeResult(timeframeReturn, timeframeReturnPercentage, processedValues);
        }
    };

    private static List<InvestmentDatetimeValueDto> reduceList(List<InvestmentDatetimeValueDto> list) {
        if (list == null || list.isEmpty()) return List.of();
        if (list.size() <= 50) return list;

        // Sort the list by datetime in ascending order.
        List<InvestmentDatetimeValueDto> sortedList = list.stream()
                .sorted(Comparator.comparing(dto -> dto.datetime().toInstant()))
                .collect(Collectors.toList());
        List<InvestmentDatetimeValueDto> result = new ArrayList<>();
        int total = sortedList.size();

        // Evenly sample 50 values. The first and last elements are always included.
        for (int i = 0; i < 50; i++) {
            int index = (int) Math.round(i * (total - 1) / 49.0);
            result.add(sortedList.get(index));
        }
        return result;
    }

    public abstract TimeframeResult calculateTimeframeReturn(List<InvestmentDatetimeValueDto> values, float currentValue);

    protected TimeframeResult calculateReturnForPeriod(List<InvestmentDatetimeValueDto> values, float currentValue, Duration period) {
        Instant now = Instant.now();
        Instant lowerBound = now.minus(period);
        
        List<InvestmentDatetimeValueDto> processedValues = reduceList(values.stream()
                .filter(dto -> !dto.datetime().toInstant().isBefore(lowerBound))
                .toList());
        if (processedValues.isEmpty()) {
            return new TimeframeResult(0, 0, processedValues);
        }

        // Find the earliest record on or after the lower bound.
        InvestmentDatetimeValueDto startDto = processedValues.stream()
                .filter(dto -> !dto.datetime().toInstant().isBefore(lowerBound))
                .min(Comparator.comparing(dto -> dto.datetime().toInstant()))
                .orElse(null);

        // If no record is found within the period, fallback to the latest record before the lower bound.
        if (startDto == null) {
            startDto = processedValues.stream()
                    .filter(dto -> dto.datetime().toInstant().isBefore(lowerBound))
                    .max(Comparator.comparing(dto -> dto.datetime().toInstant()))
                    .orElse(processedValues.get(0));
        }

        float initialValue = startDto.value();
        float timeframeReturn = currentValue - initialValue;
        float timeframeReturnPercentage = (initialValue == 0) ? 0 : (timeframeReturn / initialValue) * 100;
        return new TimeframeResult(timeframeReturn, timeframeReturnPercentage, processedValues);
    }

    public record TimeframeResult(
            float timeframeReturn,
            float timeframeReturnPercentage,
            List<InvestmentDatetimeValueDto> datetimeValues
    ) {
    }
}
