package com.invtify.backend.service.broker;

import com.invtify.backend.model.broker.Broker;
import com.invtify.backend.service.GetInvestmentAssetsService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class BrokerServices {
    private final Map<Broker, GetInvestmentAssetsService> getInvestmentAssetsServices = new HashMap<>();

    public BrokerServices() {
        Trading212Service trading212Service = new Trading212Service();
        getInvestmentAssetsServices.put(Broker.TRADING_212, trading212Service);
    }

    public GetInvestmentAssetsService getInvestmentAssetsService(Broker broker) {
        return getInvestmentAssetsServices.get(broker);
    }
}
