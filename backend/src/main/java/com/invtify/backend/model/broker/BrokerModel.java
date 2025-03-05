package com.invtify.backend.model.broker;

import com.invtify.backend.service.broker.services.BrokerFunds;

public record BrokerModel(TokenModel tokenModel, BrokerFunds brokerFunds, int reservesLifetimeDays) {
}