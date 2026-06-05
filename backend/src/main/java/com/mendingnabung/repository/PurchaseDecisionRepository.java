package com.mendingnabung.repository;

import com.mendingnabung.model.PurchaseDecision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseDecisionRepository extends JpaRepository<PurchaseDecision, Long> {

    List<PurchaseDecision> findByCustomerIdOrderByIdDesc(Long customerId);
}
