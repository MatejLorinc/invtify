package com.invtify.backend.service.broker;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.invtify.backend.model.broker.Broker;
import com.invtify.backend.persistance.entity.InvestmentAsset;
import com.invtify.backend.service.GetInvestmentAssetsService;
import lombok.Data;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

public class Trading212Service implements GetInvestmentAssetsService {
    @Override
    public CompletableFuture<List<InvestmentAsset>> fetchInvestmentAssets(String brokerToken) {
        return CompletableFuture.supplyAsync(() -> {
            HttpClient httpClient = HttpClient.newBuilder().build();

            String host = "https://demo.trading212.com";
            String pathname = "/api/v0/equity/metadata/instruments";
            HttpRequest request = HttpRequest.newBuilder()
                    .GET()
                    .uri(URI.create(host + pathname))
                    .header("Authorization", brokerToken)
                    .build();

            try {
                HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
                System.out.println(response.body());

                ObjectMapper objectMapper = new ObjectMapper();
                List<ApiInvestmentAsset> apiAssets = objectMapper.readValue(response.body(), new TypeReference<>() {
                });

                return apiAssets.stream()
                        .map(apiAsset -> {
                            InvestmentAsset investmentAsset = new InvestmentAsset();
                            investmentAsset.setId(UUID.randomUUID());
                            investmentAsset.setAsset(apiAsset.getName());
                            investmentAsset.setCurrency(apiAsset.getCurrencyCode());
                            investmentAsset.setBroker(Broker.TRADING_212);
                            investmentAsset.setIcon("etf.png");
                            return investmentAsset;
                        }).collect(Collectors.toList());
            } catch (IOException | InterruptedException e) {
                e.printStackTrace();
            }

            return List.of();
        });
    }

    @Data
    public static class ApiInvestmentAsset {
        private String addedOn;
        private String currencyCode;
        private String isin;
        private int maxOpenQuantity;
        private int minTradeQuantity;
        private String name;
        private String shortName;
        private String ticker;
        private String type;
        private int workingScheduleId;
    }
}
