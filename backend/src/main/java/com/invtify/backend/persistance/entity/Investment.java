package com.invtify.backend.persistance.entity;

import com.invtify.backend.model.investment.FrequencyType;
import com.invtify.backend.model.investment.InvestmentStrategy;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

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
    private InvestmentStrategy strategy;

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

    @Column(nullable = false)
    private Date createdAt;

    @Override
    public String toString() {
        return "Investment{" +
                "id=" + id +
                ", asset=" + asset +
                ", strategy=" + strategy +
                ", frequencyType=" + frequencyType +
                ", frequencyDay=" + frequencyDay +
                ", frequencyHour=" + frequencyHour +
                ", amount=" + amount +
                ", user=" + user.getId() +
                ", createdAt=" + createdAt +
                '}';
    }
}
