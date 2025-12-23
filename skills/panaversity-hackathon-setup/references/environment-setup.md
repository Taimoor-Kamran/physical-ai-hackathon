# Environment Setup Guide

## Backend Environment

### Python Virtual Environment
```bash
# Create virtual environment
python -m venv .venv

# Activate (Linux/Mac)
source .venv/bin/activate

# Activate (Windows)
.venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Required Dependencies
- Python 3.11+
- FastAPI
- uvicorn
- qdrant-client
- openai
- psycopg2-binary

### Environment Variables (.env)
```
OPENAI_API_KEY=your_openai_api_key
QDRANT_HOST=your_qdrant_host
QDRANT_PORT=6333
QDRANT_API_KEY=your_qdrant_api_key
POSTGRES_DSN=postgresql://user:password@localhost:5432/book_db
```

## Frontend Environment

### Node.js Setup
```bash
# Install dependencies
npm install

# Development server
npm run start

# Production build
npm run build
```

### Docusaurus Configuration
- Base URL: `/physical-ai-hackathon/`
- Proxy configuration for API calls
- Theme and styling settings

## Development Server Commands

### Backend Server
```bash
# Start backend
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000

# With virtual environment
source .venv/bin/activate && uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Server
```bash
# Start frontend
cd frontend && npm run start

# Build for production
cd frontend && npm run build
```

## Common Setup Issues

### 1. Dependency Conflicts
```bash
# Force reinstall specific packages
pip install 'openai>=1.0.0' 'httpx>=0.27.0' --force-reinstall
```

### 2. Port Conflicts
- Backend: Default port 8000
- Frontend: Default port 3000
- Check for running processes: `lsof -i :8000` or `lsof -i :3000`

### 3. Environment Variables
- Ensure .env file is in backend root
- Check file permissions
- Verify all required variables are set

## Testing Setup

### 1. Health Check
```bash
curl http://localhost:8000/health
```

### 2. API Endpoint Test
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "test", "context": "test"}'
```

### 3. Frontend Connectivity
- Check browser console for errors
- Verify proxy configuration
- Test API calls from frontend