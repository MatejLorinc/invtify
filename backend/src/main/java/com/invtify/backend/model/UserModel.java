package com.invtify.backend.model;

import com.invtify.backend.model.broker.Broker;
import com.invtify.backend.model.investment.InvestmentModel;
import com.invtify.backend.model.token.TokenModel;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Builder
@Getter
public class UserModel {
    private final String userId;
    private final Map<Broker, TokenModel> tokens;
    private final List<InvestmentModel> investments;
}
