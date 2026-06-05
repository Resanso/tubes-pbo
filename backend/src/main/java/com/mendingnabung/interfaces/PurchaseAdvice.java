package com.mendingnabung.interfaces;

import com.mendingnabung.model.PurchaseDecision;
import com.mendingnabung.model.item.Item;
import com.mendingnabung.model.user.Customer;

/**
 * Contract for any component that can produce a purchase recommendation.
 * Abstraction layer — the controller depends on this interface, not on the concrete service.
 */
public interface PurchaseAdvice {

    /**
     * Analyses the customer's financial state against the requested item
     * and produces a {@link PurchaseDecision}.
     *
     * @param customer the customer requesting advice
     * @param item     the item under consideration
     * @return a fully populated PurchaseDecision (BELI or NABUNG)
     */
    PurchaseDecision giveAdvice(Customer customer, Item item);
}
