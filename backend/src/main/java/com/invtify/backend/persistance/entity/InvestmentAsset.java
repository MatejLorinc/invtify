package com.invtify.backend.persistance.entity;

import com.invtify.backend.model.broker.Broker;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "investment_assets")
public class InvestmentAsset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String asset;

    @Column(nullable = false)
    private String currency;

    @Column(nullable = false)
    private Broker broker;

    @Column(nullable = false)
    private String icon;
}
