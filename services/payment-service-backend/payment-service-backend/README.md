# Payment Service (Spring Boot, Java 21)

### Run in Spring Tool Suite (STS4)
1. **File → Import → Maven → Existing Maven Projects**.
2. Select this folder, finish import.
3. Ensure **Project JDK = 21**. (Right click project → Properties → Java Compiler → 21)
4. Run `PaymentServiceApplication` (Spring Boot App).
5. Default profile uses in-memory H2. For MySQL, set env vars:
   - `SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/paymentdb`
   - `SPRING_DATASOURCE_USERNAME=payuser`
   - `SPRING_DATASOURCE_PASSWORD=paypass`

### API
- `POST /api/payments/intents`
  ```json
  {"orderId":"ORD-1","amount":499.00,"currency":"INR","method":"UPI"}
  ```
- `POST /api/payments/{id}/confirm`
  ```json
  {"transactionRef":"TXN-001"}
  ```
- `GET /api/payments/{id}`
- `GET /api/payments?orderId=ORD-1`

### Notes
- This project relies on STS's embedded Maven; no wrapper is included.
- To build from CLI, ensure Maven is installed and run: `mvn spring-boot:run`.
