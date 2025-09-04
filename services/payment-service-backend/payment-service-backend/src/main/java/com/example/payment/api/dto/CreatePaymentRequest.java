package com.example.payment.api.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record CreatePaymentRequest(
    @NotBlank String orderId,
    @NotNull @DecimalMin("0.01") BigDecimal amount,
    @NotBlank @Size(min=3, max=3) String currency,
    @NotBlank String method
) {}
