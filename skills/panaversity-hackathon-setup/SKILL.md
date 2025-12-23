---
name: panaversity-hackathon-setup
description: Complete setup and deployment guide for the Physical AI & Humanoid Robotics hackathon project. Use when initializing the development environment, setting up backend/frontend servers, configuring vector databases, or deploying the RAG system.
---

# Panaversity Hackathon Setup & Deployment

This skill provides comprehensive guidance for setting up, configuring, and deploying the Physical AI & Humanoid Robotics hackathon project with its RAG system.

## Project Structure

### Backend (`/backend/`)
- **FastAPI** server (`src/main.py`)
- **API routes** (`src/api/`)
- **Services** (`src/services/`) - RAG, embedding pipeline
- **Data access** (`src/data/`) - Qdrant client, PostgreSQL client
- **Utilities** (`src/utils/`) - logging, content parsing
- **Requirements** (`requirements.txt`)

### Frontend (`/frontend/`)
- **Docusaurus** documentation site
- **RAG Chatbot** component (`src/components/RAGChatbot.js`)
- **Configuration** (`docusaurus.config.ts`)
- **Styles** (`src/css/`, `src/components/*.css`)

## Environment Setup

### 1. Backend Setup
```bash
cd backend/

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# or
.venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Install additional dependencies if needed
pip install 'openai>=1.0.0' 'httpx>=0.27.0' --force-reinstall

# Create .env file
touch .env
```

### 2. Environment Variables (.env)
```
OPENAI_API_KEY=your_openai_api_key_here
QDRANT_HOST=your_qdrant_cloud_host_or_localhost
QDRANT_PORT=6333
QDRANT_API_KEY=your_qdrant_api_key_if_using_cloud
POSTGRES_DSN=postgresql://user:password@localhost:5432/book_db
```

### 3. Frontend Setup
```bash
cd frontend/

# Install dependencies
npm install

# Verify configuration
npm run build
```

## Running the Application

### 1. Start Backend Server
```bash
cd backend/
source .venv/bin/activate
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Start Frontend Server
```bash
cd frontend/
npm run start
```

## RAG System Initialization

### 1. Run Embedding Pipeline
After both servers are running:

```bash
# Run embedding pipeline to populate Qdrant
curl -X POST http://localhost:8000/embed/embed -H "Content-Type: application/json" -d '{}'

# Check collection status
curl -X GET http://localhost:8000/embed/status
```

### 2. Verify RAG Functionality
```bash
# Test chat functionality
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "What is Physical AI?", "context": "Physical AI combines intelligence with physical bodies"}'
```

## Configuration Files

### Docusaurus Configuration (`frontend/docusaurus.config.ts`)
```typescript
// Proxy configuration for development
customFields: {
  devServer: {
    proxy: {
      '/rag': { target: 'http://localhost:8000', changeOrigin: true },
      '/api': { target: 'http://localhost:8000', changeOrigin: true },
      '/health': { target: 'http://localhost:8000', changeOrigin: true },
    },
  },
},
```

### CORS Configuration (`backend/src/main.py`)
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://0.0.0.0:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Common Setup Issues

### 1. Dependency Issues
```bash
# If encountering httpx/OpenAI compatibility issues
pip install 'openai>=1.0.0' 'httpx>=0.27.0' --force-reinstall
```

### 2. Qdrant Connection Issues
- Verify QDRANT_HOST, QDRANT_PORT, QDRANT_API_KEY in .env
- Check network connectivity to Qdrant Cloud or local instance
- Ensure collection `book_content` exists after embedding pipeline

### 3. Frontend Proxy Issues
- Ensure backend is running before starting frontend
- Verify proxy configuration in docusaurus.config.ts
- Check that CORS is properly configured in backend

## Deployment Configuration

### GitHub Pages Deployment
- Frontend is configured for GitHub Pages deployment
- Base URL: `/physical-ai-hackathon/`
- Ensure proxy paths account for base URL in production

### Environment-Specific Configurations
- Development: `http://localhost:8000` backend, `http://localhost:3000` frontend
- Production: Adjust endpoints as needed for deployed environments

## Troubleshooting

### Backend Not Starting
1. Verify virtual environment is activated
2. Check all dependencies are installed
3. Confirm .env file has correct values

### Frontend Not Connecting to Backend
1. Check if backend server is running
2. Verify proxy configuration in docusaurus.config.ts
3. Confirm CORS settings allow frontend origin

### Embedding Pipeline Failing
1. Verify Qdrant connection and credentials
2. Check if OpenAI API key is valid and has sufficient quota
3. Confirm document paths are correct

This setup enables the complete RAG system with document retrieval, embedding, and generation capabilities.