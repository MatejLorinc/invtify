package com.invtify.backend.model.investment;

import com.invtify.backend.model.token.TokenProvider;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Builder
@Getter
public final class InvestmentModel {
    private final UUID uniqueId;
    private final InvestmentStrategy strategy;
    private final TokenProvider provider;
    private final InvestmentFrequency frequency;
    private final int amount;
    private final String icon;
}
