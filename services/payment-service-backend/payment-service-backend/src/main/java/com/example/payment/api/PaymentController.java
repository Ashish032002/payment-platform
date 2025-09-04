package com.example.payment.api;

import com.example.payment.api.dto.*;
import com.example.payment.domain.Payment;
import com.example.payment.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
  private final PaymentService svc;
  public PaymentController(PaymentService svc){ this.svc = svc; }

  @PostMapping("/intents")
  public ResponseEntity<PaymentResponse> create(@Valid @RequestBody CreatePaymentRequest req){
    Payment p = svc.create(req);
    return ResponseEntity.ok(toResp(p));
  }

  @PostMapping("/{id}/confirm")
  public ResponseEntity<PaymentResponse> confirm(@PathVariable String id,
                                                 @Valid @RequestBody ConfirmPaymentRequest req){
    Payment p = svc.confirm(id, req);
    return ResponseEntity.ok(toResp(p));
  }

  @GetMapping("/{id}")
  public ResponseEntity<PaymentResponse> get(@PathVariable String id){
    return ResponseEntity.ok(toResp(svc.get(id)));
  }

  @GetMapping
  public List<PaymentResponse> byOrder(@RequestParam String orderId){
    return svc.byOrderId(orderId).stream().map(this::toResp).toList();
  }

  private PaymentResponse toResp(Payment p){
    return new PaymentResponse(p.getId(), p.getOrderId(), p.getAmount(), p.getCurrency(),
      p.getMethod(), p.getStatus(), p.getTransactionRef());
  }
}
