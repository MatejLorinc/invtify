package com.invtify.backend.model.broker;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum BrokerType {
    EXCHANGE("Exchange"),
    BROKER("Broker");

    private final String displayName;
}
