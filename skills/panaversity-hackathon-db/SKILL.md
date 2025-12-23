---
name: panaversity-hackathon-db
description: Database and vector store configuration for the Physical AI & Humanoid Robotics project. Use when setting up Qdrant vector database, PostgreSQL configuration, embedding pipelines, document indexing, or managing vector collections and retrieval.
---

# Panaversity Hackathon Database & Vector Store

This skill provides comprehensive guidance for configuring and managing the database and vector storage systems in the Physical AI & Humanoid Robotics RAG project.

## Database Architecture

### Vector Database: Qdrant
- **Purpose**: Store document embeddings for RAG retrieval
- **Collection**: `book_content`
- **Vector Size**: 1536 (OpenAI text-embedding-ada-002)
- **Distance Metric**: COSINE

### Relational Database: PostgreSQL
- **Purpose**: Store structured content metadata (fallback/auxiliary)
- **Connection**: via psycopg2-binary
- **DSN**: Configured in environment variables

## Qdrant Configuration

### Connection Settings
```python
# From src/data/qdrant_client.py
QDRANT_HOST = os.getenv("QDRANT_HOST", "localhost")
QDRANT_PORT = int(os.getenv("QDRANT_PORT", 6333))
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY", None)
QDRANT_COLLECTION_NAME = os.getenv("QDRANT_COLLECTION_NAME", "book_content")
COLLECTION_NAME = QDRANT_COLLECTION_NAME
```

### Client Initialization
```python
def get_qdrant_client():
    client = QdrantClient(
        host=QDRANT_HOST,
        port=QDRANT_PORT,
        api_key=QDRANT_API_KEY,
    )
    return client
```

### Collection Schema
```python
# Vector configuration
VectorParams(size=1536, distance=Distance.COSINE)

# Payload structure
{
  "text": "chunked document content",
  "metadata": {
    "title": "Document title",
    "sidebar_label": "Sidebar label",
    "source_path": "relative/path/to/doc.mdx",
    "chunk_index": 0,
    "total_chunks": 4
  },
  "chunk_id": 0
}
```

## PostgreSQL Configuration

### Connection Settings
```python
# From src/data/postgres_client.py
def get_postgres_connection():
    db_dsn = os.getenv("POSTGRES_DSN")
    if not db_dsn:
        raise ValueError("POSTGRES_DSN environment variable is not set")
    return psycopg2.connect(db_dsn)
```

### Environment Variable
```
POSTGRES_DSN=postgresql://user:password@localhost:5432/book_db
```

## Embedding Pipeline

### Document Processing Flow
1. **Load Documents**: Scan `/frontend/docs/` for `.md` and `.mdx` files
2. **Extract Metadata**: Parse YAML frontmatter from documents
3. **Chunk Content**: Split documents into 500-800 token chunks
4. **Generate Embeddings**: Use OpenAI text-embedding-ada-002
5. **Store Vectors**: Upload to Qdrant collection with metadata

### Chunking Strategy
```python
def chunk_content(self, content: str, max_tokens: int = 600) -> List[str]:
    # Simple token estimation (1 token ~ 4 characters)
    max_chars = max_tokens * 4

    # Split by paragraphs first, then by sentences if needed
    paragraphs = content.split('\n\n')
    chunks = []
    current_chunk = ""

    for paragraph in paragraphs:
        if len(current_chunk) + len(paragraph) > max_chars:
            if current_chunk.strip():
                chunks.append(current_chunk.strip())
            current_chunk = paragraph
        else:
            current_chunk += "\n\n" + paragraph

    if current_chunk.strip():
        chunks.append(current_chunk.strip())

    return chunks
```

## Collection Management

### Creating Collections
```python
def initialize_qdrant_collection(client: QdrantClient, vector_size: int):
    try:
        client.get_collection(collection_name=QDRANT_COLLECTION_NAME)
    except Exception:
        client.create_collection(
            collection_name=QDRANT_COLLECTION_NAME,
            vectors_config=VectorParams(size=vector_size, distance=Distance.COSINE),
        )
```

### Uploading Vectors
```python
def store_embeddings(self, chunks: List[str], embeddings: List[List[float]], metadata_list: List[Dict]):
    points = []
    for i, (chunk, embedding, metadata) in enumerate(zip(chunks, embeddings, metadata_list)):
        point = PointStruct(
            id=i,
            vector=embedding,
            payload={
                "text": chunk,
                "metadata": metadata,
                "chunk_id": i
            }
        )
        points.append(point)

    client.upsert(collection_name=COLLECTION_NAME, points=points)
```

## Retrieval Process

### Vector Search
```python
def query_rag(self, selected_text: str, query: str | None = None) -> dict:
    # Generate embedding for query
    query_embedding = self._get_embedding(combined_query)

    # Search Qdrant collection
    search_result = self._qdrant_client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_embedding,
        limit=3,  # Retrieve top 3 relevant chunks
        with_payload=True,
    )

    # Process results
    context = []
    source_context = []
    for hit in search_result:
        context.append(hit.payload["text"])
        source_context.append(hit.payload["metadata"])
```

## Environment Configuration

### Required Variables (.env)
```
# Qdrant Configuration
QDRANT_HOST=5adc6be6-16c6-4171-af03-04dcbe067165.us-east4-0.gcp.cloud.qdrant.io
QDRANT_PORT=6333
QDRANT_API_KEY=your_qdrant_api_key_here
QDRANT_COLLECTION_NAME=book_content

# PostgreSQL Configuration
POSTGRES_DSN=postgresql://user:password@localhost:5432/book_db
```

## Management Tasks

### 1. Initialize Collections
```python
from src.data.qdrant_client import initialize_qdrant_collection
from src.services.rag_service import RAGService

rag_service = RAGService()
initialize_qdrant_collection(rag_service.qdrant_client, 1536)
```

### 2. Check Collection Status
```python
def check_collection_status():
    from src.data.qdrant_client import get_qdrant_client, COLLECTION_NAME
    client = get_qdrant_client()

    try:
        collection_info = client.get_collection(COLLECTION_NAME)
        vector_count = collection_info.points_count
        return {
            "status": "ready",
            "vector_count": vector_count,
            "message": f"Collection '{COLLECTION_NAME}' has {vector_count} vectors"
        }
    except Exception as e:
        return {
            "status": "missing",
            "vector_count": 0,
            "message": f"Collection '{COLLECTION_NAME}' does not exist: {str(e)}"
        }
```

### 3. Count Vectors in Collection
```bash
# Using qdrant-client directly
python -c "
from src.data.qdrant_client import get_qdrant_client, COLLECTION_NAME
client = get_qdrant_client()
info = client.get_collection(COLLECTION_NAME)
print(f'Vectors in {COLLECTION_NAME}: {info.points_count}')
"
```

## Performance Considerations

### Vector Search Optimization
- **Limit**: Retrieve top 3 results for relevance
- **Distance**: COSINE similarity for embedding comparison
- **Payload**: Include metadata for source attribution

### Memory Management
- Process documents in chunks to avoid memory overflow
- Use streaming for large document sets
- Implement proper error handling for connection timeouts

## Troubleshooting

### Common Issues

#### 1. Collection Doesn't Exist
- **Cause**: Embedding pipeline not run
- **Solution**: Execute `POST /embed/embed` endpoint

#### 2. Qdrant Connection Timeout
- **Cause**: Network issues or incorrect credentials
- **Solution**: Verify QDRANT_HOST, QDRANT_PORT, QDRANT_API_KEY

#### 3. Empty Search Results
- **Cause**: No vectors in collection or poor query match
- **Solution**: Check collection status and document ingestion

#### 4. Embedding Generation Failure
- **Cause**: OpenAI API key issues
- **Solution**: Verify OPENAI_API_KEY in environment

### Debugging Queries

#### Check Collection Info
```python
from src.data.qdrant_client import get_qdrant_client, COLLECTION_NAME
client = get_qdrant_client()
collection_info = client.get_collection(COLLECTION_NAME)
print(f"Points: {collection_info.points_count}")
print(f"Vectors: {collection_info.config.params.vectors}")
```

#### Sample Vector Retrieval
```python
from src.data.qdrant_client import get_qdrant_client, COLLECTION_NAME
client = get_qdrant_client()

# Get sample points
sample_points = client.retrieve(
    collection_name=COLLECTION_NAME,
    ids=[0, 1, 2],
    with_payload=True,
    with_vectors=False
)

for point in sample_points:
    print(f"ID: {point.id}")
    print(f"Text: {point.payload['text'][:100]}...")
    print(f"Metadata: {point.payload['metadata']}")
    print("---")
```

## Security Considerations

### API Key Management
- Store API keys in environment variables, not code
- Use appropriate permissions for Qdrant Cloud
- Rotate keys periodically

### Data Privacy
- Metadata includes source paths but not sensitive content
- Embeddings are mathematical representations, not raw text
- Ensure compliance with document licensing terms

This database and vector store configuration enables the RAG system to efficiently store, index, and retrieve document content for AI-powered responses.