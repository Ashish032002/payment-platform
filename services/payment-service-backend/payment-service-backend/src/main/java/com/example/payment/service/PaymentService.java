package com.example.payment.service;

import com.example.payment.api.dto.*;
import com.example.payment.domain.Payment;
import com.example.payment.repo.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PaymentService {
  private final PaymentRepository repo;
  public PaymentService(PaymentRepository repo) { this.repo = repo; }

  @Transactional
  public Payment create(CreatePaymentRequest req) {
    Payment p = new Payment();
    p.setOrderId(req.orderId());
    p.setAmount(req.amount());
    p.setCurrency(req.currency().toUpperCase());
    p.setMethod(req.method().toUpperCase());
    p.setStatus("PENDING");
    return repo.save(p);
  }

  @Transactional
  public Payment confirm(String id, ConfirmPaymentRequest req) {
    Payment p = repo.findById(id).orElseThrow();
    if (!"PENDING".equals(p.getStatus())) return p;
    p.setTransactionRef(req.transactionRef());
    p.setStatus("CONFIRMED");
    return repo.save(p);
  }

  public Payment get(String id){ return repo.findById(id).orElseThrow(); }

  public List<Payment> byOrderId(String orderId){ return repo.findByOrderId(orderId); }
}
