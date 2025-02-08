package com.invtify.backend.persistance.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "investment_values")
public class InvestmentDatetimeValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Investment investment;

    @Column(nullable = false)
    private float value;

    @Column(nullable = false)
    private Timestamp datetime;

    @Override
    public String toString() {
        return "InvestmentDatetimeValue{" +
                "id=" + id +
                ", investment=" + investment.getId() +
                ", value=" + value +
                ", datetime=" + datetime +
                '}';
    }
}
