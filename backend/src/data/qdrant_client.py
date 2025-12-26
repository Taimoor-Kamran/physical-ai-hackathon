import os
from dotenv import load_dotenv
load_dotenv()  # Load environment variables from .env file

from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams

QDRANT_HOST = os.getenv("QDRANT_HOST", "localhost")
QDRANT_PORT = int(os.getenv("QDRANT_PORT", 6333))
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY", None)
QDRANT_COLLECTION_NAME = os.getenv("QDRANT_COLLECTION_NAME", "book_content")
COLLECTION_NAME = QDRANT_COLLECTION_NAME

def get_qdrant_client():
    # Check if we're using a cloud instance (contains '.cloud.qdrant.io')
    if 'cloud.qdrant.io' in QDRANT_HOST:
        # For cloud instances, use URL with API key
        client = QdrantClient(
            url=f"https://{QDRANT_HOST}",
            api_key=QDRANT_API_KEY,
            port=443  # Cloud instances use HTTPS on port 443
        )
    else:
        # For local instances, use host/port
        client = QdrantClient(
            host=QDRANT_HOST,
            port=QDRANT_PORT,
            api_key=QDRANT_API_KEY,
        )
    return client

def initialize_qdrant_collection(client: QdrantClient, vector_size: int):
    # Create collection if it does not exist
    try:
        client.get_collection(collection_name=QDRANT_COLLECTION_NAME)
    except Exception:
        client.create_collection(
            collection_name=QDRANT_COLLECTION_NAME,
            vectors_config=VectorParams(size=vector_size, distance=Distance.COSINE),
        )
