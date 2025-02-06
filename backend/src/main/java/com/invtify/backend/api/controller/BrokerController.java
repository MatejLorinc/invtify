package com.invtify.backend.api.controller;

import com.invtify.backend.api.dto.BrokersDto;
import com.invtify.backend.api.dto.TokenDto;
import com.invtify.backend.model.broker.Broker;
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
public class BrokerController {
    private final TokenService tokenService;
    private final BrokerService brokerService;

    @GetMapping
    public ResponseEntity<BrokersDto> getBrokers(@AuthenticationPrincipal Jwt principal) {
        String userId = principal.getSubject();
        Collection<BrokerModel> brokers = brokerService.getBrokers(userId);
        BrokersDto brokersDto = BrokersDto.builder()
                .brokers(brokers)
                .build();
        return ResponseEntity.ok(brokersDto);
    }

    @PostMapping
    public ResponseEntity<TokenDto> setBroker(@AuthenticationPrincipal Jwt principal, @RequestBody TokenDto token) {
        String userId = principal.getSubject();
        TokenModel tokenModel = TokenModel.builder()
                .broker(Broker.valueOf(token.getBroker()))
                .token(token.getToken())
                .build();
        System.out.println(tokenModel);
        tokenService.setToken(userId, tokenModel);
        return new ResponseEntity<>(token, HttpStatus.CREATED);
    }
}
