package com.invtify.backend.api.controller;

import com.invtify.backend.api.dto.InvestmentAssetsDto;
import com.invtify.backend.model.broker.Broker;
import com.invtify.backend.persistance.entity.InvestmentAsset;
import com.invtify.backend.service.broker.services.InvestmentAssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping(path = "/api/user/assets")
@RequiredArgsConstructor
public class AssetController {
    private final InvestmentAssetService investmentAssetService;

    @GetMapping
    public ResponseEntity<InvestmentAssetsDto> get(@AuthenticationPrincipal Jwt principal, @RequestParam String brokerId, @RequestParam String token) {
        Collection<InvestmentAsset> investmentsAssets = investmentAssetService.getInvestmentAssets(
                Broker.valueOf(brokerId),
                token
        ).join();
        return ResponseEntity.ok(new InvestmentAssetsDto(investmentsAssets));
    }
}
