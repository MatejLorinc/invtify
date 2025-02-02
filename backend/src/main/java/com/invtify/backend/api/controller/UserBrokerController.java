package com.invtify.backend.api.controller;

import com.invtify.backend.api.dto.BrokersDto;
import com.invtify.backend.model.broker.BrokerModel;
import com.invtify.backend.model.broker.TokenModel;
import com.invtify.backend.service.BrokerService;
import com.invtify.backend.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping(path = "/api/user/broker")
@RequiredArgsConstructor
public class UserBrokerController {
    private final TokenService tokenService;
    private final BrokerService brokerService;

    @GetMapping
    public ResponseEntity<BrokersDto> getBrokers(@AuthenticationPrincipal Jwt principal) {
        String userId = principal.getSubject();
        Collection<BrokerModel> tokens = brokerService.getBrokers(userId);
        BrokersDto brokersDto = BrokersDto.builder()
                .tokens(tokens)
                .build();
        return ResponseEntity.ok(brokersDto);
    }

    @PostMapping
    public ResponseEntity<TokenModel> setBroker(@AuthenticationPrincipal Jwt principal, @RequestBody TokenModel token) {
        String userId = principal.getSubject();
        tokenService.setToken(userId, token);
        return new ResponseEntity<>(token, HttpStatus.CREATED);
    }
}
