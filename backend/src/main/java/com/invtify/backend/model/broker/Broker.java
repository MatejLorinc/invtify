package com.invtify.backend.model.broker;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Broker {
    TRADING_212("Trading 212");

    private final String displayName;
}
