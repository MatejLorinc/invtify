package com.invtify.backend.service;

import com.invtify.backend.model.broker.Broker;
import com.invtify.backend.model.broker.TokenModel;
import com.invtify.backend.persistance.entity.Token;
import com.invtify.backend.persistance.entity.User;
import com.invtify.backend.persistance.repository.TokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokenRepository tokenRepository;
    private final UserService userService;

    public Collection<Token> getTokens(String userId) {
        User user = userService.getUser(userId);
        return user.getTokens();
    }

    public Collection<TokenModel> getTokenModels(String userId) {
        return getTokens(userId).stream().map(TokenModel::create).toList();
    }

    @Transactional
    public void setToken(String userId, TokenModel tokenModel) {
        User user = userService.getUser(userId);

        tokenRepository.findByUserAndBroker(user, tokenModel.getBroker()).ifPresentOrElse(token -> {
            token.setToken(tokenModel.getToken());
            tokenRepository.save(token);
        }, () -> {
            Token token = new Token();
            token.setUser(user);
            token.setBroker(tokenModel.getBroker());
            token.setToken(tokenModel.getToken());
            tokenRepository.save(token);
        });
    }

    @Transactional
    public void deleteToken(String userId, Broker broker) {
        User user = userService.getUser(userId);
        tokenRepository.deleteByUserAndBroker(user, broker);
    }
}
