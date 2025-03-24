package com.ecom.customerorder.repository;
import com.ecom.customerorder.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> { }