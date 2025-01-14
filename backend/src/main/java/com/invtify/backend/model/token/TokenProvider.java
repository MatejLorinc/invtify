package com.invtify.backend.model.token;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum TokenProvider {
    TRADING_212("Trading 212");

    private final String displayName;
}
