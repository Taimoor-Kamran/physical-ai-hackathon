.PHONY: all build test run clean install-backend install-frontend build-frontend start-frontend start-backend

all: build-frontend

build:

build-frontend:
	cd frontend && npm run build

test:

run:

clean:

install-backend:
	cd backend && source .venv/bin/activate && pip install -r requirements.txt

install-frontend:
	cd frontend && npm install

start-frontend:
	cd frontend && npm start

start-backend:
	cd backend && source .venv/bin/activate && uvicorn src.main:app --reload
