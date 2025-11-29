install-backend:
	cd backend && source .venv/bin/activate && pip install -r requirements.txt

install-frontend:
	cd frontend && npm install

build-frontend:
	cd frontend && npm run build

start-frontend:
	cd frontend && npm start

start-backend:
	cd backend && source .venv/bin/activate && uvicorn src.main:app --reload

.PHONY: install-backend install-frontend build-frontend start-frontend start-backend