# RAG Embedding Patterns

## Chunking Strategies

### 1. Semantic Chunking
- Split by semantic boundaries (paragraphs, sections)
- Maintain context within chunks
- Optimal for document-based retrieval

### 2. Token-Based Chunking
- Fixed token limits (500-800 tokens)
- Consistent vector sizes
- Predictable performance

### 3. Overlap Strategy
- Small overlap between chunks (10-20%)
- Captures cross-chunk relationships
- Improves retrieval accuracy

## Embedding Models

### OpenAI text-embedding-ada-002
- Dimensions: 1536
- Performance: High quality, consistent
- Cost: $0.0001 per 1K tokens

### Alternative Models
- Sentence-Transformers (free alternative)
- Cohere embeddings
- Custom domain-specific models

## Vector Storage Optimization

### Qdrant Configuration
- Distance metric: COSINE
- Vector size: 1536 for OpenAI
- Indexing: HNSW for fast search
- Payload storage: Metadata and content

## Retrieval Strategies

### 1. Similarity Search
- Top-k retrieval (k=3-5)
- Score threshold filtering
- Re-ranking for precision

### 2. Multi-Vector Approach
- Query expansion vectors
- Context-aware vectors
- Hybrid search (sparse + dense)