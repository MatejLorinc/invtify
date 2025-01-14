package com.invtify.backend.persistance.entity;

import com.invtify.backend.model.token.TokenProvider;
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
    private TokenProvider provider;

    @Column(nullable = false)
    private String token;

    @ManyToOne
    private User user;
}
