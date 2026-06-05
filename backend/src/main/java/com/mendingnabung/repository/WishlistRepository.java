package com.mendingnabung.repository;

import com.mendingnabung.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    List<Wishlist> findByCustomerId(Long customerId);

    List<Wishlist> findByCustomerIdAndStatus(Long customerId, Wishlist.Status status);
}
