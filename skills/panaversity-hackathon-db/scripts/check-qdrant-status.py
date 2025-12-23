#!/usr/bin/env python3
"""
Script to check the status of Qdrant vector database and collection.
"""

import sys
import os
from pathlib import Path

# Add backend src to path
backend_path = Path(__file__).parent.parent.parent.parent / "backend" / "src"
sys.path.insert(0, str(backend_path))

def check_qdrant_connection():
    """Check if Qdrant is accessible and configured properly."""
    try:
        from data.qdrant_client import get_qdrant_client, COLLECTION_NAME
        import os

        print("🔍 Checking Qdrant connection...")
        print(f"   Host: {os.getenv('QDRANT_HOST', 'localhost')}")
        print(f"   Port: {os.getenv('QDRANT_PORT', '6333')}")
        print(f"   Collection: {COLLECTION_NAME}")

        client = get_qdrant_client()

        # Test connection by getting collections
        collections = client.get_collections()
        print(f"✅ Connected to Qdrant server")
        print(f"📊 Available collections: {[col.name for col in collections.collections]}")

        return True

    except ImportError as e:
        print(f"❌ Import error: {e}")
        return False
    except Exception as e:
        print(f"❌ Error connecting to Qdrant: {e}")
        return False

def check_collection_status():
    """Check the status of the book_content collection."""
    try:
        from data.qdrant_client import get_qdrant_client, COLLECTION_NAME

        client = get_qdrant_client()

        try:
            collection_info = client.get_collection(COLLECTION_NAME)
            print(f"✅ Collection '{COLLECTION_NAME}' exists")
            print(f"📊 Points count: {collection_info.points_count}")
            print(f"📦 Indexed vectors: {collection_info.indexed_vectors_count}")
            print(f"🔍 Vector size: {collection_info.config.params.vectors.size}")
            print(f"📐 Distance: {collection_info.config.params.vectors.distance}")

            # Get sample points to verify content
            if collection_info.points_count > 0:
                sample_points = client.retrieve(
                    collection_name=COLLECTION_NAME,
                    ids=[0],  # Get first point as sample
                    with_payload=True,
                    with_vectors=False
                )
                if sample_points:
                    sample = sample_points[0]
                    print(f"📝 Sample content preview: {sample.payload.get('text', '')[:100]}...")

            return True

        except Exception as e:
            print(f"❌ Collection '{COLLECTION_NAME}' does not exist: {e}")
            return False

    except Exception as e:
        print(f"❌ Error checking collection status: {e}")
        return False

def check_embedding_pipeline():
    """Check if embedding pipeline components are available."""
    try:
        from services.embedding_pipeline import EmbeddingPipeline
        from services.rag_service import RAGService

        print("✅ Embedding pipeline components are available")
        print("✅ RAG service is available")

        # Test if OpenAI client can be initialized
        rag_service = RAGService()
        if rag_service.openai_client is not None:
            print("✅ OpenAI client is configured")
        else:
            print("⚠️  OpenAI client not configured (using mock embeddings)")

        return True

    except ImportError as e:
        print(f"❌ Import error in embedding pipeline: {e}")
        return False
    except Exception as e:
        print(f"❌ Error checking embedding pipeline: {e}")
        return False

def test_vector_search():
    """Test if vector search is working."""
    try:
        from data.qdrant_client import get_qdrant_client, COLLECTION_NAME
        from services.rag_service import RAGService

        client = get_qdrant_client()
        rag_service = RAGService()

        # Try to get collection info
        try:
            collection_info = client.get_collection(COLLECTION_NAME)
            if collection_info.points_count == 0:
                print("⚠️  Collection exists but has no vectors")
                print("💡 Run the embedding pipeline to populate the collection")
                return True

            # Perform a test search
            test_embedding = rag_service._get_embedding("test query")
            search_result = client.search(
                collection_name=COLLECTION_NAME,
                query_vector=test_embedding,
                limit=1,
                with_payload=True
            )

            if search_result:
                print("✅ Vector search is working")
                print(f"🔍 Test search returned {len(search_result)} results")
                if search_result:
                    print(f"📝 Sample result preview: {search_result[0].payload.get('text', '')[:100]}...")
            else:
                print("⚠️  Vector search returned no results (may be expected)")

            return True

        except Exception as e:
            print(f"⚠️  Cannot test search: {e}")
            return False

    except Exception as e:
        print(f"❌ Error testing vector search: {e}")
        return False

def main():
    """Main function to run all checks."""
    print("🔍 Checking Qdrant Vector Database Status")
    print("=" * 50)

    checks = [
        ("Qdrant Connection", check_qdrant_connection),
        ("Collection Status", check_collection_status),
        ("Embedding Pipeline", check_embedding_pipeline),
        ("Vector Search", test_vector_search),
    ]

    results = {}
    for check_name, check_func in checks:
        print(f"\n📋 {check_name}...")
        results[check_name] = check_func()

    print("\n" + "=" * 50)
    print("📋 Qdrant Status Summary:")

    all_passed = True
    for check_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"  {status}: {check_name}")
        if not result:
            all_passed = False

    print("\n" + "=" * 50)
    if all_passed:
        print("🎉 All Qdrant checks passed!")
    else:
        print("⚠️  Some checks failed. Please review the output above.")

if __name__ == "__main__":
    main()