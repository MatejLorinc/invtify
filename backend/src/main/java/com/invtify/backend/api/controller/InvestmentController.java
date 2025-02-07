package com.invtify.backend.api.controller;

import com.invtify.backend.api.dto.DeleteInvestmentDto;
import com.invtify.backend.api.dto.InvestmentsDto;
import com.invtify.backend.model.investment.InvestmentModel;
import com.invtify.backend.service.InvestmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping(path = "/api/user/investments")
@RequiredArgsConstructor
public class InvestmentController {
    private final InvestmentService investmentService;

    @GetMapping
    public ResponseEntity<InvestmentsDto> getInvestments(@AuthenticationPrincipal Jwt principal) {
        String userId = principal.getSubject();
        Collection<InvestmentModel> investments = investmentService.getInvestments(userId); // null
        InvestmentsDto investmentsDto = InvestmentsDto.builder()
                .investments(investments)
                .build();
        return ResponseEntity.ok(investmentsDto);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void setInvestment(@AuthenticationPrincipal Jwt principal, @RequestBody InvestmentModel investment) {
        String userId = principal.getSubject();
        investmentService.setInvestment(userId, investment);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteInvestment(@AuthenticationPrincipal Jwt principal, @RequestBody DeleteInvestmentDto deleteInvestmentDto) {
        String userId = principal.getSubject();
        boolean deleted = investmentService.deleteInvestment(userId, deleteInvestmentDto.investmentId());
        if (!deleted) return ResponseEntity.ok("Investment deletion failed");
        return ResponseEntity.ok("Investment deleted successfully");
    }
}
