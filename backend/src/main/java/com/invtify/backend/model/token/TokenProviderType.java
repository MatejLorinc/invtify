package com.invtify.backend.model.token;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum TokenProviderType {
    EXCHANGE("Exchange"),
    BROKER("Broker");

    private final String displayName;
}
