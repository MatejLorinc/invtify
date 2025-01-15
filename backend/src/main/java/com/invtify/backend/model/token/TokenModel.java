package com.invtify.backend.model.token;

import com.invtify.backend.model.broker.Broker;
import com.invtify.backend.persistance.entity.Token;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public final class TokenModel {
    private final Broker provider;
    private final String token;

    public static TokenModel create(Token token) {
        return TokenModel.builder()
                .provider(token.getProvider())
                .token(token.getToken())
                .build();
    }
}
