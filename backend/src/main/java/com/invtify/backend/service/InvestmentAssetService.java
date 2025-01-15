package com.invtify.backend.service;

import com.invtify.backend.persistance.repository.InvestmentAssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InvestmentAssetService {
    private final InvestmentAssetRepository investmentAssetRepository;
}
