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

    @Column(nullable = false)
    private Broker provider;

    @Column(nullable = false)
    private String token;

    @ManyToOne
    private User user;

    @Override
    public String toString() {
        return "Token{" +
                "id=" + id +
                ", provider=" + provider +
                ", token='" + token + '\'' +
                ", user=" + user.getId() +
                '}';
    }
}
