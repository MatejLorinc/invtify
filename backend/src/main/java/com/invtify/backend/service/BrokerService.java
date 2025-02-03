package com.invtify.backend.service;

import com.invtify.backend.model.broker.BrokerModel;
import com.invtify.backend.model.broker.TokenModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class BrokerService {
    private final TokenService tokenService;

    public Collection<BrokerModel> getBrokers(String userId) {
        return tokenService.getTokenModels(userId).stream().map(this::toBrokerModel).toList();
    }

    public BrokerModel toBrokerModel(TokenModel tokenModel) {
        return BrokerModel.builder()
                .tokenModel(tokenModel)
                .availableBalance(0)
                .investedBalance(0)
                .totalBalance(0)
                .reservesLifetimeDays(0)
                .build();
    }
}
