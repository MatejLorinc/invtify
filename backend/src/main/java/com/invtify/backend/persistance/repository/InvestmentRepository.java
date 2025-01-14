package com.invtify.backend.persistance.repository;

import com.invtify.backend.persistance.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvestmentRepository extends JpaRepository<User, String> {

}
