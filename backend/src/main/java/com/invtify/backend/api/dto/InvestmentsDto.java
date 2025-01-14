package com.invtify.backend.api.dto;

import com.invtify.backend.model.investment.InvestmentModel;
import lombok.Builder;
import lombok.Getter;

import java.util.Collection;

@Builder
@Getter
public class InvestmentsDto {
    private Collection<InvestmentModel> investments;
}
