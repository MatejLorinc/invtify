package com.invtify.backend.service.broker.trading212;

import com.fasterxml.jackson.core.type.TypeReference;
import com.invtify.backend.model.broker.Broker;
import com.invtify.backend.persistance.entity.InvestmentAsset;
import com.invtify.backend.service.broker.services.BrokerFunds;
import com.invtify.backend.service.broker.services.GetBrokerFundsService;
import com.invtify.backend.service.broker.services.GetInvestmentAssetsService;
import com.invtify.backend.utils.NetworkUtils;

import java.lang.reflect.Type;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

public class Trading212Service implements GetInvestmentAssetsService, GetBrokerFundsService {
    @Override
    public CompletableFuture<List<InvestmentAsset>> fetchInvestmentAssets(String brokerToken) {
        return CompletableFuture.supplyAsync(() -> {
            List<Trading212InvestmentAsset> apiAssets = NetworkUtils.getHttpRequest("https://demo.trading212.com",
                    "/api/v0/equity/metadata/instruments",
                    brokerToken,
                    new TypeReference<>() {
                    });

            return apiAssets.stream()
                    .map(apiAsset -> {
                        InvestmentAsset investmentAsset = new InvestmentAsset();
                        investmentAsset.setId(UUID.randomUUID());
                        investmentAsset.setAsset(apiAsset.getName());
                        investmentAsset.setTicker(apiAsset.getTicker());
                        investmentAsset.setCurrency(apiAsset.getCurrencyCode());
                        investmentAsset.setBroker(Broker.TRADING_212);
                        investmentAsset.setIcon("etf.png");
                        return investmentAsset;
                    }).collect(Collectors.toList());
        });
    }

    @Override
    public CompletableFuture<BrokerFunds> fetchBrokerFunds(String brokerToken) {
        return CompletableFuture.supplyAsync(() -> {
            Trading212BrokerFunds brokerFunds = NetworkUtils.getHttpRequest("https://demo.trading212.com",
                    "/api/v0/equity/account/cash",
                    brokerToken,
                    new TypeReference<>() {
                        @Override
                        public Type getType() {
                            return Trading212BrokerFunds.class;
                        }
                    });

            return new BrokerFunds(brokerFunds.getTotal(), brokerFunds.getTotal() - brokerFunds.getFree(), brokerFunds.getFree());
        });
    }
}
