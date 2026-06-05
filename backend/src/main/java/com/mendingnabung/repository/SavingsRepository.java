package com.mendingnabung.repository;

import com.mendingnabung.model.Savings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavingsRepository extends JpaRepository<Savings, Long> {

    List<Savings> findByCustomerId(Long customerId);
}
