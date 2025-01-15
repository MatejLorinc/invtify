package com.invtify.backend.persistance.repository;

import com.invtify.backend.persistance.entity.InvestmentAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvestmentAssetRepository extends JpaRepository<InvestmentAsset, Long> {

}
