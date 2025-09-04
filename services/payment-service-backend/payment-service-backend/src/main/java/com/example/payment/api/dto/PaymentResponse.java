package com.example.payment.api.dto;

import java.math.BigDecimal;

public record PaymentResponse(
    String id,
    String orderId,
    BigDecimal amount,
    String currency,
    String method,
    String status,
    String transactionRef
) {}
