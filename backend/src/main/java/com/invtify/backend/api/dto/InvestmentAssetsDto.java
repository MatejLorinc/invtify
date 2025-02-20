package com.invtify.backend.api.dto;

import com.invtify.backend.persistance.entity.InvestmentAsset;

import java.util.Collection;

public record InvestmentAssetsDto(Collection<InvestmentAsset> assets) {
}
