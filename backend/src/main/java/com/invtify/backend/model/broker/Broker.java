package com.invtify.backend.model.broker;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Broker {
    TRADING_212("Trading 212"),
    XTB("XTB"),
    BINANCE("Binance");

    private final String displayName;
}
