package com.invtify.backend.service.broker.services;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface GetOpenPositionsService {
    CompletableFuture<List<OpenPosition>> fetchOpenPositions(String brokerToken);
}
