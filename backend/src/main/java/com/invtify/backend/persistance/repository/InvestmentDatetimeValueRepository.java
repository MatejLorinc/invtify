package com.invtify.backend.persistance.repository;

import com.invtify.backend.persistance.entity.Investment;
import com.invtify.backend.persistance.entity.InvestmentDatetimeValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvestmentDatetimeValueRepository extends JpaRepository<InvestmentDatetimeValue, Long> {
    List<InvestmentDatetimeValue> findByInvestment(Investment investment);
}
