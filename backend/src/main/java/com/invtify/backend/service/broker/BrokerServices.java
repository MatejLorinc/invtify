package com.invtify.backend.service.broker;

import com.invtify.backend.model.broker.Broker;
import com.invtify.backend.service.broker.services.GetBrokerFundsService;
import com.invtify.backend.service.broker.services.GetInvestmentAssetsService;
import com.invtify.backend.service.broker.services.GetOpenPositionsService;
import com.invtify.backend.service.broker.trading212.Trading212Service;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class BrokerServices {
    private final Map<Broker, GetInvestmentAssetsService> getInvestmentAssetsServices = new HashMap<>();
    private final Map<Broker, GetBrokerFundsService> getBrokerFundsServices = new HashMap<>();
    private final Map<Broker, GetOpenPositionsService> getOpenPositionsServices = new HashMap<>();

    public BrokerServices() {
        Trading212Service trading212Service = new Trading212Service();
        getInvestmentAssetsServices.put(Broker.TRADING_212, trading212Service);
        getBrokerFundsServices.put(Broker.TRADING_212, trading212Service);
        getOpenPositionsServices.put(Broker.TRADING_212, trading212Service);
    }

    public GetInvestmentAssetsService getInvestmentAssetsService(Broker broker) {
        return getInvestmentAssetsServices.get(broker);
    }

    public GetBrokerFundsService getBrokerFundsService(Broker broker) {
        return getBrokerFundsServices.get(broker);
    }

    public GetOpenPositionsService getOpenPositionsService(Broker broker) {
        return getOpenPositionsServices.get(broker);
    }
}
