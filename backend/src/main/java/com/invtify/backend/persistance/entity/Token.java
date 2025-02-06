package com.invtify.backend.persistance.entity;

import com.invtify.backend.model.broker.Broker;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tokens")
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Broker broker;

    @Column(nullable = false)
    private String token;

    @ManyToOne
    private User user;

    @Override
    public String toString() {
        return "Token{" +
                "id=" + id +
                ", broker=" + broker +
                ", token='" + token + '\'' +
                ", user=" + user.getId() +
                '}';
    }
}
