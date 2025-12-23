---
name: panaversity-hackathon-api
description: Complete API documentation and usage guide for the Physical AI & Humanoid Robotics RAG system. Use when working with API endpoints, request/response formats, authentication, or integrating with the backend services.
---

# Panaversity Hackathon API Endpoints

This skill provides comprehensive documentation for all API endpoints in the Physical AI & Humanoid Robotics RAG system.

## Base URLs

### Development
- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000/physical-ai-hackathon/`

## API Endpoints

### 1. RAG Chat Endpoint
**Endpoint**: `POST /api/chat`
**Description**: Main RAG chat functionality with document retrieval

#### Request Format
```json
{
  "query": "Your question here",
  "context": "Selected text context or additional context"
}
```

#### Response Format
```json
{
  "answer": "Generated answer based on retrieved content",
  "source_context": [
    {
      "title": "Document title",
      "sidebar_label": "Sidebar label if present",
      "source_path": "relative/path/to/doc.mdx",
      "chunk_index": 0,
      "total_chunks": 4
    }
  ]
}
```

#### Example Request
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Explain kinematics in robotics",
    "context": "Kinematics, Dynamics & Control"
  }'
```

### 2. Embedding Pipeline
**Endpoint**: `POST /embed/embed`
**Description**: Run the complete embedding pipeline to load documents into Qdrant

#### Request Format
```json
{
  "docs_dir": "/path/to/docs/directory"  // Optional, defaults to frontend/docs
}
```

#### Response Format
```json
{
  "message": "Successfully embedded documents. X vectors stored in collection 'book_content'.",
  "vectors_stored": 62,
  "collection_name": "book_content"
}
```

#### Example Request
```bash
curl -X POST http://localhost:8000/embed/embed \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 3. Embedding Status
**Endpoint**: `GET /embed/status`
**Description**: Check the status of the embedding collection

#### Response Format
```json
{
  "status": "ready|missing|error",
  "collection_name": "book_content",
  "vector_count": 62,
  "message": "Collection 'book_content' exists with 62 vectors"
}
```

#### Example Request
```bash
curl -X GET http://localhost:8000/embed/status
```

### 4. Legacy RAG Endpoint
**Endpoint**: `POST /rag/query`
**Description**: Legacy RAG endpoint (maintained for compatibility)

#### Request Format
```json
{
  "selected_text": "Text selected by user",
  "query": "Optional follow-up question"
}
```

#### Response Format
```json
{
  "answer": "Generated answer",
  "source_context": ["source information"]
}
```

### 5. Health Check
**Endpoint**: `GET /health`
**Description**: Health check for the backend service

#### Response Format
```json
{
  "status": "ok"
}
```

#### Example Request
```bash
curl -X GET http://localhost:8000/health
```

## Error Handling

### Common HTTP Status Codes
- `200 OK`: Successful request
- `400 Bad Request`: Invalid request format
- `404 Not Found`: Endpoint doesn't exist
- `500 Internal Server Error`: Server-side error

### Error Response Format
```json
{
  "detail": "Error message describing the issue"
}
```

## Request Headers
All POST requests should include:
```
Content-Type: application/json
```

## Authentication
Currently no authentication required for development environment.

## Rate Limiting
No rate limiting implemented in development version.

## API Best Practices

### 1. For RAG Queries
- Always provide meaningful context to improve retrieval quality
- Use specific queries for better results
- Handle empty source_context responses appropriately

### 2. For Embedding Pipeline
- Run once after initial setup or when documents are updated
- Monitor response time for large document sets
- Verify collection status after running

### 3. For Production Considerations
- Implement proper error handling in client applications
- Consider caching for frequently asked questions
- Monitor vector count and collection size
- Plan for API key quota management

## Client Integration Examples

### JavaScript/Fetch
```javascript
async function getRagResponse(query, context) {
  try {
    const response = await fetch('http://localhost:8000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        context: context
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error calling RAG API:', error);
    throw error;
  }
}
```

### Python/requests
```python
import requests

def get_rag_response(query, context):
    url = "http://localhost:8000/api/chat"
    payload = {
        "query": query,
        "context": context
    }
    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    return response.json()
```

## Testing Endpoints

### 1. Health Check
```bash
curl -X GET http://localhost:8000/health
```

### 2. RAG Query
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is Physical AI?",
    "context": "Physical AI combines intelligence with physical bodies"
  }'
```

### 3. Embedding Pipeline
```bash
curl -X POST http://localhost:8000/embed/embed \
  -H "Content-Type: application/json" \
  -d '{}'
```

These endpoints form the core of the RAG system, enabling document retrieval and AI-powered responses based on indexed content.