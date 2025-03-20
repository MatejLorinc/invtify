package com.invtify.backend.persistance.repository;

import com.invtify.backend.model.broker.Broker;
import com.invtify.backend.persistance.entity.InvestmentAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.UUID;

@Repository
public interface InvestmentAssetRepository extends JpaRepository<InvestmentAsset, UUID> {
    Collection<InvestmentAsset> findAllByBroker(Broker broker);

    InvestmentAsset findByBrokerAndTicker(Broker broker, String ticker);
}
