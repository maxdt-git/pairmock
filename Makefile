COMPOSE ?= podman-compose
CONTAINER_CLI ?= podman

NODE_IMAGE = docker.io/library/node:24-bookworm
GOINFRE_DIR = /goinfre/$(USER)/transcendence
BACKEND_EDITOR_DIR = $(GOINFRE_DIR)/backend-editor

.PHONY: up down build logs ps editor-deps editor-deps-frontend editor-deps-backend editor-deps-local start updateslot

up:
	$(COMPOSE) up --build -d

down:
	$(COMPOSE) down

migrate:
	$(COMPOSE) exec backend ./node_modules/.bin/prisma migrate deploy

build:
	$(COMPOSE) build

logs:
	$(COMPOSE) logs -f

backlogs:
	$(COMPOSE) logs -f backend

ps:
	$(COMPOSE) ps

opendb:
	$(COMPOSE) exec db sh -c 'exec psql -U "$$POSTGRES_USER" -d "$$POSTGRES_DB"'


updateslot:
	@printf '%s\n' \
		'UPDATE "Slot"' \
		"SET \"scheduledAt\" = NOW() + INTERVAL '5 seconds'" \
		'WHERE id = 1' \
		'RETURNING id, "scheduledAt";' \
		| $(COMPOSE) exec -T db sh -c 'exec psql -U "$$POSTGRES_USER" -d "$$POSTGRES_DB"'

start:
	$(MAKE) up
	$(MAKE) migrate

# Prepare host-side dependencies for VS Code / TypeScript in both projects.
editor-deps: editor-deps-frontend editor-deps-backend
	@echo "Editor dependencies ready for frontend and backend!"

editor-deps-frontend:
	@test -d "/goinfre/$(USER)" || \
		(echo "Goinfre unavailable"; exit 1)
	@if [ -e frontend/node_modules ] && \
		[ ! -L frontend/node_modules ]; then \
		echo "A real frontend/node_modules directory already exists"; \
		exit 1; \
	fi
	@mkdir -p "$(GOINFRE_DIR)"
	@cp frontend/package.json frontend/package-lock.json "$(GOINFRE_DIR)/"
	@$(CONTAINER_CLI) run --rm \
		--userns=keep-id \
		-e HOME=/tmp \
		-e npm_config_cache=/tmp/npm-cache \
		-v "$(GOINFRE_DIR):/app:Z" \
		-w /app \
		$(NODE_IMAGE) npm ci
	@ln -sfn "$(GOINFRE_DIR)/node_modules" frontend/node_modules
	@echo "Frontend editor dependencies ready!"

editor-deps-backend:
	@test -d "/goinfre/$(USER)" || \
		(echo "Goinfre unavailable"; exit 1)
	@if [ -e backend/node_modules ] && \
		[ ! -L backend/node_modules ]; then \
		echo "A real backend/node_modules directory already exists"; \
		exit 1; \
	fi
	@mkdir -p "$(BACKEND_EDITOR_DIR)"
	@cp backend/package.json backend/package-lock.json "$(BACKEND_EDITOR_DIR)/"
	@$(CONTAINER_CLI) run --rm \
		--userns=keep-id \
		-e HOME=/tmp \
		-e npm_config_cache=/tmp/npm-cache \
		-v "$(BACKEND_EDITOR_DIR):/app:Z" \
		-w /app \
		$(NODE_IMAGE) npm ci
	@ln -sfn "$(BACKEND_EDITOR_DIR)/node_modules" backend/node_modules
	@echo "Backend editor dependencies ready!"

# Original frontend-only local installation target, unchanged.
editor-deps-local:
	@if [ -L frontend/node_modules ]; then \
		echo "Error: frontend/node_modules is a symlink."; \
		echo "Remove the symlink first: rm frontend/node_modules"; \
		exit 1; \
	fi
	@$(CONTAINER_CLI) run --rm \
		--user "$(shell id -u):$(shell id -g)" \
		-e HOME=/tmp \
		-e npm_config_cache=/tmp/npm-cache \
		-v "$(CURDIR)/frontend:/app:Z" \
		-w /app \
		$(NODE_IMAGE) npm ci
	@echo "Local editor dependencies ready!"
