package com.invtify.backend.model.token;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public final class TokenModel {
    private final TokenProvider provider;
    private final String token;
}
