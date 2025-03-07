package com.invtify.backend.service.broker.trading212;

import lombok.Data;

@Data
public class Trading212BrokerFunds {
    private float blocked;
    private float free;
    private float invested;
    private float pieCash;
    private int ppl;
    private float result;
    private float total;
}