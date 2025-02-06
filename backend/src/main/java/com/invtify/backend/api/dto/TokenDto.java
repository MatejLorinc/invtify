package com.invtify.backend.api.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TokenDto {
    private final String brokerId;
    private final String token;
}
