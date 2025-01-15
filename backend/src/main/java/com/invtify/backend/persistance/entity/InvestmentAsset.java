package com.invtify.backend.persistance.entity;

import com.invtify.backend.model.broker.Broker;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "investment_assets")
public class InvestmentAsset {
    @Id
    private UUID id;

    @Column(nullable = false)
    private String asset;

    @Column(nullable = false)
    private String currency;

    @Column(nullable = false)
    private Broker provider;

    @Column(nullable = false)
    private String icon;
}
