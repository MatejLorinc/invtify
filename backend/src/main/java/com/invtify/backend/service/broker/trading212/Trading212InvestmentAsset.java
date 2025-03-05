package com.invtify.backend.service.broker.trading212;

import lombok.Data;

@Data
public class Trading212InvestmentAsset {
    private String addedOn;
    private String currencyCode;
    private String isin;
    private int maxOpenQuantity;
    private int minTradeQuantity;
    private String name;
    private String shortName;
    private String ticker;
    private String type;
    private int workingScheduleId;
}