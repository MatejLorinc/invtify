package com.invtify.backend.service.broker.services;

import com.invtify.backend.model.broker.Broker;
import com.invtify.backend.service.broker.BrokerServices;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class BrokerFundsService {
    private final BrokerServices brokerServices;

    public CompletableFuture<BrokerFunds> getBrokerFunds(Broker broker, String brokerToken) {
        return brokerServices.getBrokerFundsService(broker).fetchBrokerFunds(brokerToken);
    }
}
