package com.invtify.backend.service.broker.services;

import com.invtify.backend.model.broker.Broker;
import com.invtify.backend.service.broker.BrokerServices;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class OpenPositionsService {
    private final BrokerServices brokerServices;

    public CompletableFuture<List<OpenPosition>> getOpenPositions(Broker broker, String brokerToken) {
        return brokerServices.getOpenPositionsService(broker).fetchOpenPositions(brokerToken);
    }
}
