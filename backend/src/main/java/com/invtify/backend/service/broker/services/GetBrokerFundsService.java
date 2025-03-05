package com.invtify.backend.service.broker.services;

import java.util.concurrent.CompletableFuture;

public interface GetBrokerFundsService {
    CompletableFuture<BrokerFunds> fetchBrokerFunds(String brokerToken);
}
