# Payment Platform — Fullstack Project

This repository contains a **modular payment platform** designed as a real-world, production-ready monorepo.  
It demonstrates modern DevOps practices, microservice architecture, ETL pipelines, and cloud-native deployment.

---

## 📂 Repository Structure

```
.
├─ backend/              # your existing backend services (payment, order, etc.)
├─ frontend/             # your existing frontend (Next.js / React)
├─ auth_service/         # NEW: standalone JWT-based authentication service
├─ etl/                  # Python ETL jobs (bronze → silver → gold)
├─ helm/                 # Helm charts (auth-service provided here)
├─ terraform/            # Infrastructure-as-Code (Google Cloud bootstrap)
├─ .github/workflows/    # GitHub Actions CI/CD
├─ docker-compose.yml    # Local development stack
└─ README.md             # You are here
```

---

## ✨ Features

- **Authentication Service**  
  - Node.js Express + JWT (`auth_service/`)  
  - Endpoints:  
    - `POST /auth/login` → issues token  
    - `GET /auth/validate` → validates token  

- **Backend Microservices**  
  - Payment and others (already present in `backend/`).  
  - Integrates with the Auth service for secure operations.

- **ETL Pipeline**  
  - Python + MySQL-based pipeline (`etl/run_etl.py`).  
  - Reads from CSV → Loads Bronze → Cleans to Silver → Aggregates to Gold.

- **Infrastructure**  
  - Helm charts (`helm/auth-service/`) for Kubernetes deployment.  
  - Terraform (`terraform/`) for Artifact Registry & cluster bootstrapping.  
  - GitHub Actions (`.github/workflows/ci.yml`) for CI builds.

- **Local Development**  
  - `docker-compose.yml` runs:  
    - MySQL  
    - Auth service  
    - ETL (on-demand job)  
    - Your backend & frontend (if you link them in)  

---

## 🚀 Quick Start (Local)

### 1. Start MySQL + Auth
```bash
docker compose up -d mysql auth-service
```

### 2. Run ETL (load sample CSV)
```bash
docker compose run --rm etl
```

### 3. Test Auth API
```bash
# Login
curl -X POST http://localhost:8081/auth/login   -H "Content-Type: application/json"   -d '{"userId": 42, "roles":["USER"]}'

# Validate
curl http://localhost:8081/auth/validate   -H "Authorization: Bearer <JWT>"
```

---

## 🛠️ Deployment

### Kubernetes (Helm + ArgoCD)
1. Package charts:
   ```bash
   helm dependency update ./helm
   helm install auth-service ./helm/auth-service -n auth
   ```
2. If using ArgoCD, sync the application manifests under `argocd/`.

### Terraform (GCP Example)
```bash
cd terraform
terraform init
terraform apply -var="project_id=your-gcp-project"
```

This provisions an **Artifact Registry** for Docker images.

---

## ⚙️ CI/CD

- GitHub Actions workflow:
  - Lints YAML files.
  - Builds `auth_service` Docker image.
  - (Extendable to backend/frontend builds and Helm lint).

---

## 📊 Data Pipeline (ETL)

- `etl/input/payments.csv` → Bronze table in MySQL.
- Silver: copy/cleaned version.
- Gold: aggregated per-user totals.
- Extendable to include real transactional datasets.

---

## 🔒 Security

- Auth service issues JWT tokens signed with `JWT_SECRET`.
- Backend services validate tokens before performing sensitive actions.
- Helm values allow secure secret injection in Kubernetes.

---

## 🧩 Next Steps

- Integrate the new `auth_service` with your existing **payment service**.
- Extend ETL jobs to cover **orders, invoices, refunds**.
- Add more Helm charts for your other backend services.
- Expand Terraform to provision GKE cluster, networking, and secrets manager.

---

✅ With this setup, you now have:  
- A **working local dev stack**,  
- **Deployable Kubernetes artifacts**,  
- **CI/CD pipeline**,  
- **Extendable ETL** for data flows,  
- and a clear roadmap to production.
