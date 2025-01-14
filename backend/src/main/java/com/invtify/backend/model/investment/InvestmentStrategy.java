package com.invtify.backend.model.investment;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum InvestmentStrategy {
    DCA_MARKET("DCA - Market");

    private final String displayName;
}
