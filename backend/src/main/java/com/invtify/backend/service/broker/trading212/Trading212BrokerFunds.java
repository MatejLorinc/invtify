package com.invtify.backend.service.broker.trading212;

import lombok.Data;

@Data
public class Trading212BrokerFunds {
    private int blocked;
    private int free;
    private int invested;
    private int pieCash;
    private int ppl;
    private int result;
    private int total;
}