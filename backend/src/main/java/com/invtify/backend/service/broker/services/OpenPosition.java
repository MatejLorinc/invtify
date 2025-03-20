package com.invtify.backend.service.broker.services;

import com.invtify.backend.persistance.entity.InvestmentAsset;

public record OpenPosition(InvestmentAsset asset, float price, float quantity) {
}
