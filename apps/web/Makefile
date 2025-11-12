# Makefile for withoutbg web applications

.PHONY: help install install-frontend install-backend dev dev-frontend dev-backend build build-frontend build-backend clean docker-build docker-up docker-down docker-logs docker-restart lint lint-frontend test-frontend docker-prod-build docker-prod-run docker-prod-push docker-prod-stop docker-prod-logs

# Default target
help:
	@echo "Available targets for web applications:"
	@echo ""
	@echo "Installation:"
	@echo "  install             Install all web dependencies (frontend + backend)"
	@echo "  install-frontend    Install frontend dependencies"
	@echo "  install-backend     Install backend dependencies"
	@echo ""
	@echo "Development:"
	@echo "  dev                 Run both frontend and backend in development mode"
	@echo "  dev-frontend        Run frontend development server (port 3000)"
	@echo "  dev-backend         Run backend development server (port 8000)"
	@echo ""
	@echo "Build:"
	@echo "  build               Build both frontend and backend"
	@echo "  build-frontend      Build frontend for production"
	@echo "  build-backend       Build backend (prepare for deployment)"
	@echo ""
	@echo "Docker (Development):"
	@echo "  docker-build        Build Docker images for development"
	@echo "  docker-up           Start all services with Docker Compose"
	@echo "  docker-down         Stop all services"
	@echo "  docker-logs         Show logs from all services"
	@echo "  docker-logs-backend Show backend logs"
	@echo "  docker-logs-frontend Show frontend logs"
	@echo "  docker-restart      Restart all services"
	@echo "  docker-clean        Clean Docker resources"
	@echo ""
	@echo "Docker (Production):"
	@echo "  docker-prod-build   Build production Docker image"
	@echo "  docker-prod-run     Run production Docker container (port 80)"
	@echo "  docker-prod-stop    Stop production Docker container"
	@echo "  docker-prod-logs    View production container logs"
	@echo "  docker-prod-push    Push production image to Docker Hub"
	@echo ""
	@echo "Quality:"
	@echo "  lint                Run all linters"
	@echo "  lint-frontend       Run frontend linter"
	@echo "  test-frontend       Run frontend tests"
	@echo ""
	@echo "Maintenance:"
	@echo "  clean               Clean all build artifacts and caches"

# Installation targets
install: install-frontend install-backend
	@echo "✓ All web dependencies installed!"

install-frontend:
	@echo "Installing frontend dependencies..."
	cd frontend && npm install

install-backend:
	@echo "Installing backend dependencies..."
	cd backend && uv sync

# Development targets
dev:
	@echo "Starting development servers..."
	@echo "Note: Run 'make dev-frontend' and 'make dev-backend' in separate terminals"
	@echo "Or use 'make docker-up' to run everything with Docker"

dev-frontend:
	@echo "Starting frontend development server on http://localhost:3000"
	cd frontend && npm run dev

dev-backend:
	@echo "Starting backend development server on http://localhost:8000"
	cd backend && uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Build targets
build: build-frontend build-backend
	@echo "✓ All web applications built!"

build-frontend:
	@echo "Building frontend for production..."
	cd frontend && npm run build

build-backend:
	@echo "Backend build complete (FastAPI doesn't require build step)"
	@echo "Use Docker to deploy backend"

# Docker targets
docker-build:
	@echo "Building Docker images..."
	docker compose build

docker-up:
	@echo "Starting all services with Docker Compose..."
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:8000"
	@echo "API Docs: http://localhost:8000/docs"
	docker compose up

docker-up-detached:
	@echo "Starting all services in background..."
	docker compose up -d
	@echo "✓ Services started!"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:8000"
	@echo "Use 'make docker-logs' to view logs"

docker-down:
	@echo "Stopping all services..."
	docker compose down

docker-logs:
	docker compose logs -f

docker-logs-backend:
	docker compose logs -f backend

docker-logs-frontend:
	docker compose logs -f frontend-dev

docker-restart:
	@echo "Restarting all services..."
	docker compose restart

docker-clean:
	@echo "Cleaning Docker resources..."
	docker compose down -v
	docker system prune -f

# Production Docker targets
DOCKER_IMAGE_NAME ?= withoutbg
DOCKER_IMAGE_TAG ?= latest
DOCKER_CONTAINER_NAME ?= withoutbg-prod
DOCKER_HUB_USERNAME ?=

docker-prod-build:
	@echo "Building production Docker image..."
	@echo "Image: $(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAG)"
	cd ../.. && docker build -f apps/web/Dockerfile -t $(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAG) .
	@echo "✓ Production image built successfully!"
	@echo "Run 'make docker-prod-run' to start the container"

docker-prod-run:
	@echo "Starting production Docker container..."
	@echo "Stopping any existing container..."
	@docker stop $(DOCKER_CONTAINER_NAME) 2>/dev/null || true
	@docker rm $(DOCKER_CONTAINER_NAME) 2>/dev/null || true
	@echo "Starting new container..."
	docker run -d \
		--name $(DOCKER_CONTAINER_NAME) \
		-p 80:80 \
		$(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAG)
	@echo "✓ Production container started!"
	@echo "Application: http://localhost"
	@echo "API Docs: http://localhost/docs"
	@echo "Use 'docker logs -f $(DOCKER_CONTAINER_NAME)' to view logs"

docker-prod-stop:
	@echo "Stopping production Docker container..."
	docker stop $(DOCKER_CONTAINER_NAME)
	docker rm $(DOCKER_CONTAINER_NAME)
	@echo "✓ Production container stopped"

docker-prod-push:
	@echo "Pushing to Docker Hub..."
	@if [ -z "$(DOCKER_HUB_USERNAME)" ]; then \
		echo "Error: DOCKER_HUB_USERNAME not set"; \
		echo "Usage: make docker-prod-push DOCKER_HUB_USERNAME=your-username"; \
		exit 1; \
	fi
	@echo "Tagging image for Docker Hub..."
	docker tag $(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAG) $(DOCKER_HUB_USERNAME)/$(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAG)
	@echo "Pushing to $(DOCKER_HUB_USERNAME)/$(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAG)..."
	docker push $(DOCKER_HUB_USERNAME)/$(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAG)
	@echo "✓ Image pushed successfully!"
	@echo "Pull with: docker pull $(DOCKER_HUB_USERNAME)/$(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAG)"

docker-prod-logs:
	@echo "Showing production container logs..."
	docker logs -f $(DOCKER_CONTAINER_NAME)

# Quality targets
lint: lint-frontend
	@echo "✓ All linting passed!"

lint-frontend:
	@echo "Running frontend linter..."
	cd frontend && npm run lint

test-frontend:
	@echo "Frontend tests not yet implemented"
	@echo "Consider adding: Jest or Vitest"

# Clean targets
clean: clean-frontend clean-backend
	@echo "✓ All web artifacts cleaned!"

clean-frontend:
	@echo "Cleaning frontend artifacts..."
	cd frontend && rm -rf node_modules dist .vite

clean-backend:
	@echo "Cleaning backend artifacts..."
	cd backend && rm -rf .pytest_cache __pycache__ .mypy_cache .ruff_cache
	find backend -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find backend -type f -name "*.pyc" -delete 2>/dev/null || true

# Preview production build
preview-frontend:
	@echo "Starting frontend preview server..."
	cd frontend && npm run preview

# Health checks
health-check:
	@echo "Checking service health..."
	@curl -f http://localhost:8000/health || echo "❌ Backend is not responding"
	@curl -f http://localhost:3000 || echo "❌ Frontend is not responding"

