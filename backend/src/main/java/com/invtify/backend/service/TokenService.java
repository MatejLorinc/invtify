package com.invtify.backend.service;

import com.invtify.backend.model.UserModel;
import com.invtify.backend.model.token.TokenModel;
import com.invtify.backend.model.token.TokenProvider;
import com.invtify.backend.persistance.entity.Token;
import com.invtify.backend.persistance.entity.User;
import com.invtify.backend.persistance.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokenRepository tokenRepository;
    private final UserService userService;

    public Collection<TokenModel> getTokens(String userId) {
        UserModel user = userService.getUserModel(userId);
        return user.getTokens().values();
    }

    public void setToken(String userId, TokenModel tokenModel) {
        User user = userService.getUser(userId);
        TokenProvider provider = tokenModel.getProvider();

        tokenRepository.findByUserAndProvider(user, provider).ifPresentOrElse(token -> {
            token.setToken(tokenModel.getToken());
            tokenRepository.save(token);
        }, () -> {
            Token token = new Token();
            token.setUser(user);
            token.setProvider(provider);
            token.setToken(tokenModel.getToken());
            tokenRepository.save(token);
        });
    }
}
