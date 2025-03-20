package com.invtify.backend.service.broker.services;

import com.invtify.backend.model.broker.Broker;

public record OpenPosition(Broker broker, String assetTicker, float price, float quantity) {
}
