package com.invtify.backend.model.investment;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum InvestmentStrategy {
    DCA_MARKET("DCA - Market"),
    DCA_LIMIT("DCA - Limit"),
    EXIT_DCA("Exit DCA");

    private final String displayName;
}
