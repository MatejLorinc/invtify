package com.invtify.backend.service;

import com.invtify.backend.model.broker.Broker;
import com.invtify.backend.persistance.entity.InvestmentAsset;
import com.invtify.backend.persistance.repository.InvestmentAssetRepository;
import com.invtify.backend.service.broker.BrokerServices;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class InvestmentAssetService {
    private final BrokerServices brokerServices;
    private final InvestmentAssetRepository investmentAssetRepository;

    public CompletableFuture<Collection<InvestmentAsset>> getInvestmentAssets(Broker broker, String brokerToken) {
        Collection<InvestmentAsset> cachedAssets = investmentAssetRepository.findAllByBroker(broker);
        if (!cachedAssets.isEmpty()) return CompletableFuture.supplyAsync(() -> cachedAssets);
        return updateInvestmentAssets(brokerServices.getInvestmentAssetsService(broker), brokerToken);
    }

    public CompletableFuture<Collection<InvestmentAsset>> updateInvestmentAssets(GetInvestmentAssetsService brokerService, String brokerToken) {
        return brokerService.fetchInvestmentAssets(brokerToken).thenApply(investmentAssetRepository::saveAll);
    }
}
