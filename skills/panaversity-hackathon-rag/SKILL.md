---
name: panaversity-hackathon-rag
description: Comprehensive RAG system implementation with Docusaurus frontend, FastAPI backend, Qdrant vector store, and OpenAI integration. Use when working with document retrieval, embedding pipelines, chat functionality, or RAG system components for the Physical AI & Humanoid Robotics project.
---

# Panaversity Hackathon RAG Implementation

This skill provides comprehensive guidance for the Retrieval-Augmented Generation (RAG) system implemented in the Physical AI & Humanoid Robotics hackathon project.

## Core Components

### Backend Architecture
- **FastAPI** server with uvicorn
- **Qdrant** vector database for document embeddings
- **OpenAI** integration for embeddings and completions
- **Docusaurus** frontend with embedded chatbot

### Key Endpoints
- `/api/chat` - Main RAG chat endpoint
- `/embed/embed` - Document embedding pipeline
- `/embed/status` - Collection status checking
- `/rag/query` - Legacy RAG endpoint (maintained for compatibility)

## Embedding Pipeline

### Document Ingestion
```python
from src.services.embedding_pipeline import EmbeddingPipeline

pipeline = EmbeddingPipeline()
vector_count = pipeline.run_pipeline(docs_dir="/path/to/docs")
```

### Processing Steps
1. Load Docusaurus markdown documents
2. Chunk content (500-800 tokens worth of characters)
3. Generate OpenAI embeddings (text-embedding-ada-002)
4. Store vectors in Qdrant collection `book_content`
5. Preserve metadata linking to source documents

### Qdrant Collection Setup
```python
# Collection schema
collection_name: "book_content"
vector_size: 1536 (OpenAI embedding dimension)
distance: COSINE
payload: {text, metadata, chunk_id}
```

## RAG Query Process

### API Usage
```python
# POST to /api/chat
{
  "query": "Your question here",
  "context": "Selected text context"
}
```

### Response Format
```python
{
  "answer": "Generated answer based on retrieved content",
  "source_context": [
    {
      "title": "Document title",
      "source_path": "relative/path/to/doc.mdx",
      "chunk_index": 0,
      "total_chunks": 4
    }
  ]
}
```

## Frontend Integration

### RAG Chatbot Component
- Located at `frontend/src/components/RAGChatbot.js`
- Fixed height (500px) with "CHAT" toggle button
- Text selection triggers automatic chatbot opening
- Proper source context rendering with object metadata handling

### Proxy Configuration
- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000/physical-ai-hackathon/`
- API calls proxied from `/api/chat` to backend

## Environment Configuration

### Required Variables (.env)
```
OPENAI_API_KEY=your_openai_api_key
QDRANT_HOST=your_qdrant_host
QDRANT_PORT=6333
QDRANT_API_KEY=your_qdrant_api_key
```

## Common Workflows

### 1. Initialize RAG System
1. Start backend: `uvicorn src.main:app --reload --host 0.0.0.0 --port 8000`
2. Start frontend: `npm run start` in frontend directory
3. Run embedding pipeline: `POST /embed/embed`
4. Verify collection: `GET /embed/status`

### 2. Troubleshooting
- Check Qdrant connection and credentials
- Verify OpenAI API key configuration
- Confirm collection exists with vectors
- Check CORS configuration for cross-origin requests

### 3. Document Updates
- Add new markdown files to `/frontend/docs/`
- Re-run embedding pipeline to update vector store
- Verify new content is retrievable through chat

## Error Handling

### Common Issues
- **Qdrant connection timeout**: Check network and API key
- **Collection missing**: Run embedding pipeline first
- **No vectors found**: Ensure documents were properly processed
- **Frontend crashes**: Verify source context object handling

## Development Notes

### Code Organization
- Backend services: `/backend/src/services/`
- API routes: `/backend/src/api/`
- Data access: `/backend/src/data/`
- Frontend components: `/frontend/src/components/`
- Configuration: `/frontend/docusaurus.config.ts`

### Dependencies
- FastAPI, uvicorn (backend server)
- qdrant-client (vector database)
- openai (embeddings and completions)
- Docusaurus (frontend documentation site)

This RAG system enables true retrieval-augmented generation where answers are grounded in the indexed book content, with proper source attribution returned to users.