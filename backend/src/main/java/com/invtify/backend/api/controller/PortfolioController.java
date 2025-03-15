package com.invtify.backend.api.controller;

import com.invtify.backend.model.investment.InvestmentModel;
import com.invtify.backend.model.portfolio.PortfolioModel;
import com.invtify.backend.model.portfolio.PortfolioTimeframe;
import com.invtify.backend.service.InvestmentService;
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
@RequestMapping(path = "/api/user/portfolio")
@RequiredArgsConstructor
public class PortfolioController {
    private final InvestmentService investmentService;

    @GetMapping
    public ResponseEntity<PortfolioModel> getPortfolio(@AuthenticationPrincipal Jwt principal, @RequestParam String timeframe) {
        String userId = principal.getSubject();
        Collection<InvestmentModel> investments = investmentService.getInvestments(userId);

        PortfolioTimeframe portfolioTimeframe;
        try {
            portfolioTimeframe = PortfolioTimeframe.valueOf(timeframe.toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }

        PortfolioModel portfolioModel = PortfolioModel.create(investments, portfolioTimeframe);
        return ResponseEntity.ok(portfolioModel);
    }
}
