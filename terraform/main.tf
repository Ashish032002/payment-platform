
terraform {
  required_providers {
    google = { source = "hashicorp/google", version = "~> 5.0" }
  }
  required_version = ">= 1.6.0"
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# Example: Artifact Registry for Docker images (safe to apply)
resource "google_artifact_registry_repository" "apps" {
  location      = var.region
  repository_id = "apps"
  format        = "DOCKER"
}
