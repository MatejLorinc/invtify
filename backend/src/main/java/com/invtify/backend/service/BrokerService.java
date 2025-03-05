package com.invtify.backend.service;

import com.invtify.backend.model.broker.BrokerModel;
import com.invtify.backend.model.broker.TokenModel;
import com.invtify.backend.service.broker.services.BrokerFundsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class BrokerService {
    private final BrokerFundsService fundsService;
    private final TokenService tokenService;

    public CompletableFuture<Collection<BrokerModel>> getBrokers(String userId) {
        return CompletableFuture.supplyAsync(() -> tokenService.getTokenModels(userId).stream().map(tokenModel -> toBrokerModel(tokenModel).join()).toList());
    }

    public CompletableFuture<BrokerModel> toBrokerModel(TokenModel tokenModel) {
        return fundsService.getBrokerFunds(tokenModel.getBroker(), tokenModel.getToken())
                .thenApply(brokerFunds -> new BrokerModel(tokenModel, brokerFunds, 0));
    }
}
