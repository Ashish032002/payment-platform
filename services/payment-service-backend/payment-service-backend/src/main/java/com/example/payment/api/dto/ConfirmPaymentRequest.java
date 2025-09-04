package com.example.payment.api.dto;

import jakarta.validation.constraints.NotBlank;

public record ConfirmPaymentRequest(@NotBlank String transactionRef) {}


