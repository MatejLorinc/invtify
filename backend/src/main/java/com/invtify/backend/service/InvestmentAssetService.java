package com.invtify.backend.service;

import com.invtify.backend.model.broker.Broker;
import com.invtify.backend.persistance.entity.InvestmentAsset;
import com.invtify.backend.persistance.repository.InvestmentAssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class InvestmentAssetService {
    private final InvestmentAssetRepository investmentAssetRepository;

    public Collection<InvestmentAsset> getInvestmentAssets(Broker broker) {
        return investmentAssetRepository.findAllByBroker(broker);
    }

    public void updateInvestmentAssets(GetInvestmentAssetsService brokerService, String brokerToken) {

    }
}
