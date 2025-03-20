package com.invtify.backend.service.broker.trading212;

import lombok.Data;

@Data
public class Trading212OpenPosition {
    private float averagePrice;
    private float currentPrice;
    private String frontend;
    private float fxPpl;
    private String initialFillDate;
    private float maxBuy;
    private float maxSell;
    private float pieQuantity;
    private int ppl;
    private float quantity;
    private String ticker;
}