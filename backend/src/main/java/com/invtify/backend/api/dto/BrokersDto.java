package com.invtify.backend.api.dto;

import com.invtify.backend.model.broker.BrokerModel;
import lombok.Builder;
import lombok.Getter;

import java.util.Collection;

@Builder
@Getter
public class BrokersDto {
    private Collection<BrokerModel> brokers;
}
