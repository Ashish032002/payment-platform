package com.example.payment.repo;

import com.example.payment.domain.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, String> {
  List<Payment> findByOrderId(String orderId);
}
