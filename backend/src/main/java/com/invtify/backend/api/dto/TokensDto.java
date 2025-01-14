package com.invtify.backend.api.dto;

import com.invtify.backend.model.token.TokenModel;
import lombok.Builder;
import lombok.Getter;

import java.util.Collection;

@Builder
@Getter
public class TokensDto {
    private Collection<TokenModel> tokens;
}
