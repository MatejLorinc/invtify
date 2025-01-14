package com.invtify.backend.persistance.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(name = "users")
@NoArgsConstructor
public class User {
    @Id
    @Column(updatable = false, nullable = false)
    private String id;

    @OneToMany(mappedBy = "user")
    private Collection<Token> tokens = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Investment> investments = new ArrayList<>();

    public User(String id) {
        this.id = id;
    }
}
