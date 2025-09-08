
# Add-ons 

This package only adds missing, *runnable* pieces:
- `.github/workflows/` (CI that lint + builds auth if present)
- `helm/auth-service` chart
- `etl/` Python ETL (works with MySQL)
- `terraform/` minimal, safe bootstrap
- `docker-compose.yml` to run MySQL + the new auth & ETL locally
- `auth_service/` (standalone Node.js JWT service) — move this inside your repo if you want, or rename to `backend/auth`.

## Quick start
```bash
docker compose up -d mysql
docker compose run --rm etl   # load sample payments
docker compose up -d auth-service
curl -X POST http://localhost:8081/auth/login -H "Content-Type: application/json" -d '{"userId":1}'
```
