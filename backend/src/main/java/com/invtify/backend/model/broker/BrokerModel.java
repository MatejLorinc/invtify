package com.invtify.backend.model.broker;

import lombok.Builder;
import lombok.Getter;

import java.time.Duration;

@Builder
@Getter
public final class BrokerModel {
    private final TokenModel tokenModel;
    private final double totalBalance;
    private final double investedBalance;
    private final double availableBalance;
    private final Duration remainingDuration;
}
