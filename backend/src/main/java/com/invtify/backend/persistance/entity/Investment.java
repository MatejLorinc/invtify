package com.invtify.backend.persistance.entity;

import com.invtify.backend.model.investment.FrequencyType;
import com.invtify.backend.model.investment.InvestmentStrategy;
import com.invtify.backend.model.token.TokenProvider;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "investments")
public class Investment {
    @Id
    private UUID id;

    @Column(nullable = false)
    private InvestmentStrategy strategy;

    @Column(nullable = false)
    private TokenProvider provider;

    @Column(name = "frequency_type", nullable = false)
    private FrequencyType frequencyType;

    @Column(name = "frequency_day", nullable = false)
    private int frequencyDay = 0;

    @Column(name = "frequency_hour", nullable = false)
    private int frequencyHour = 8;

    @Column(nullable = false)
    private float amount;

    @ManyToOne
    private User user;
}
