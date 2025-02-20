package com.invtify.backend.service;

import com.invtify.backend.persistance.entity.InvestmentAsset;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface GetInvestmentAssetsService {
    CompletableFuture<List<InvestmentAsset>> fetchInvestmentAssets(String brokerToken);
}
