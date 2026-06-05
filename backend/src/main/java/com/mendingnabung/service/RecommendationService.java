package com.mendingnabung.service;

import com.mendingnabung.interfaces.PurchaseAdvice;
import com.mendingnabung.model.PurchaseDecision;
import com.mendingnabung.model.item.Item;
import com.mendingnabung.model.user.Customer;
import com.mendingnabung.repository.PurchaseDecisionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Core financial analysis service.
 * Implements {@link PurchaseAdvice} so the controller stays decoupled from this class.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class RecommendationService implements PurchaseAdvice {

    private final PurchaseDecisionRepository purchaseDecisionRepository;

    @Override
    public PurchaseDecision giveAdvice(Customer customer, Item item) {
        // TODO: To be implemented by team
        return null;
    }

    /**
     * Computes a composite affordability ratio based on balance vs. price.
     */
    public double computeAffordabilityRatio(Customer customer, Item item) {
        // TODO: To be implemented by team
        return 0;
    }

    /**
     * Projects how many months the customer needs to save to afford the item.
     */
    public int estimateSavingsDuration(Customer customer, Item item) {
        // TODO: To be implemented by team
        return 0;
    }
}
