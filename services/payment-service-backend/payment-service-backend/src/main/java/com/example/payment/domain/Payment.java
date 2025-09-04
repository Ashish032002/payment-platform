package com.example.payment.domain;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "payments")
public class Payment {
  @Id
  @Column(length = 36)
  private String id;

  @Column(nullable=false, length=64)
  private String orderId;

  @Column(nullable=false, precision=12, scale=2)
  private BigDecimal amount;

  @Column(nullable=false, length=3)
  private String currency;

  @Column(nullable=false, length=20)
  private String method; // CARD, UPI, NETBANKING

  @Column(nullable=false, length=20)
  private String status; // PENDING, CONFIRMED, FAILED

  private String transactionRef;
  private OffsetDateTime createdAt;
  private OffsetDateTime updatedAt;

  @PrePersist
  void onCreate() {
    if (id == null) id = UUID.randomUUID().toString();
    createdAt = OffsetDateTime.now();
    updatedAt = createdAt;
    if (status == null) status = "PENDING";
  }
  @PreUpdate
  void onUpdate() { updatedAt = OffsetDateTime.now(); }

  // getters & setters
  public String getId(){ return id; }
  public void setId(String id){ this.id = id; }
  public String getOrderId(){ return orderId; }
  public void setOrderId(String orderId){ this.orderId = orderId; }
  public BigDecimal getAmount(){ return amount; }
  public void setAmount(BigDecimal amount){ this.amount = amount; }
  public String getCurrency(){ return currency; }
  public void setCurrency(String currency){ this.currency = currency; }
  public String getMethod(){ return method; }
  public void setMethod(String method){ this.method = method; }
  public String getStatus(){ return status; }
  public void setStatus(String status){ this.status = status; }
  public String getTransactionRef(){ return transactionRef; }
  public void setTransactionRef(String transactionRef){ this.transactionRef = transactionRef; }
  public OffsetDateTime getCreatedAt(){ return createdAt; }
  public void setCreatedAt(OffsetDateTime createdAt){ this.createdAt = createdAt; }
  public OffsetDateTime getUpdatedAt(){ return updatedAt; }
  public void setUpdatedAt(OffsetDateTime updatedAt){ this.updatedAt = updatedAt; }
}
