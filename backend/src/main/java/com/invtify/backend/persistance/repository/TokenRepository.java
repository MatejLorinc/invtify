package com.invtify.backend.persistance.repository;

import com.invtify.backend.model.broker.Broker;
import com.invtify.backend.persistance.entity.Token;
import com.invtify.backend.persistance.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, String> {
    Optional<Token> findByUserAndBroker(User user, Broker broker);

    void deleteByUserAndBroker(User user, Broker broker);
}
