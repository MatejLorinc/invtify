package com.invtify.backend.persistance.entity;

import com.invtify.backend.model.investment.FrequencyType;
import com.invtify.backend.model.investment.InvestmentStrategyType;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "investments")
public class Investment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private InvestmentAsset asset;

    @Column(nullable = false)
    private InvestmentStrategyType strategy;

    @Column(name = "frequency_type", nullable = false)
    private FrequencyType frequencyType;

    @Column(name = "frequency_day", nullable = false)
    private int frequencyDay = 0;

    @Column(name = "frequency_hour", nullable = false)
    private int frequencyHour = 8;

    @Column(nullable = false)
    private float amount;

    @Column(nullable = false)
    private float priceDrop;

    @ManyToOne
    private User user;

    @Column(nullable = false)
    private Date createdAt;

    @Column(nullable = false)
    private float quantity = 0;

    @Column(nullable = false)
    private float totallyInvested = 0;

    @Column(nullable = false)
    private float rateOfReturn = 0;

    @Column(nullable = false)
    private float profitLoss = 0;

    @OneToMany(mappedBy = "investment")
    private List<InvestmentDatetimeValue> datetimeValues = new ArrayList<>();

    @Override
    public String toString() {
        return "Investment{" +
                "id=" + id +
                ", asset=" + asset.getId() +
                ", strategy=" + strategy +
                ", frequencyType=" + frequencyType +
                ", frequencyDay=" + frequencyDay +
                ", frequencyHour=" + frequencyHour +
                ", priceDrop=" + priceDrop +
                ", amount=" + amount +
                ", user=" + user.getId() +
                ", createdAt=" + createdAt +
                ", quantity=" + quantity +
                ", totallyInvested=" + totallyInvested +
                ", rateOfReturn=" + rateOfReturn +
                ", profitLoss=" + profitLoss +
                ", datetimeValues=" + datetimeValues +
                '}';
    }
}
