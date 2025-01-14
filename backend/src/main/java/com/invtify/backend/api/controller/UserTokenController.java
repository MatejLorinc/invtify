package com.invtify.backend.api.controller;

import com.invtify.backend.api.dto.TokensDto;
import com.invtify.backend.model.token.TokenModel;
import com.invtify.backend.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping(path = "/api/user/token")
@RequiredArgsConstructor
public class UserTokenController {
    private final TokenService tokenService;

    @GetMapping
    public ResponseEntity<TokensDto> getTokens(@AuthenticationPrincipal Jwt principal) {
        String userId = principal.getSubject();
        Collection<TokenModel> tokens = tokenService.getTokens(userId);
        TokensDto tokensDto = TokensDto.builder()
                .tokens(tokens)
                .build();
        return ResponseEntity.ok(tokensDto);
    }

    @PostMapping
    public ResponseEntity<TokenModel> setToken(@AuthenticationPrincipal Jwt principal, @RequestBody TokenModel token) {
        String userId = principal.getSubject();
        tokenService.setToken(userId, token);
        return new ResponseEntity<>(token, HttpStatus.CREATED);
    }
}
