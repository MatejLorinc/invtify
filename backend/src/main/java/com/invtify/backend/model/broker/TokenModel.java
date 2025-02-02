package com.invtify.backend.model.broker;

import com.invtify.backend.persistance.entity.Token;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public final class TokenModel {
    private final Broker broker;
    private final String token;

    public static TokenModel create(Token token) {
        return TokenModel.builder()
                .broker(token.getBroker())
                .token(token.getToken())
                .build();
    }
}
