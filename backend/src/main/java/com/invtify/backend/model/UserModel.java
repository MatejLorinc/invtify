package com.invtify.backend.model;

import com.invtify.backend.model.investment.InvestmentModel;
import com.invtify.backend.model.token.TokenModel;
import com.invtify.backend.model.token.TokenProvider;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Builder
@Getter
public class UserModel {
    private final Map<TokenProvider, TokenModel> tokens;
    private final List<InvestmentModel> investments;
}
