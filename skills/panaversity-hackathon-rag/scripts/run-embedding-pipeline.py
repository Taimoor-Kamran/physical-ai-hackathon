#!/usr/bin/env python3
"""
Script to run the RAG embedding pipeline for the Physical AI & Humanoid Robotics project.
This script loads Docusaurus docs, chunks them, generates embeddings, and stores in Qdrant.
"""

import sys
import os
from pathlib import Path

# Add backend src to path
backend_path = Path(__file__).parent.parent.parent.parent / "backend" / "src"
sys.path.insert(0, str(backend_path))

def run_embedding_pipeline(docs_dir=None):
    """
    Run the complete embedding pipeline.

    Args:
        docs_dir (str): Path to docs directory. Defaults to frontend/docs
    """
    if docs_dir is None:
        docs_dir = str(Path(__file__).parent.parent.parent.parent / "frontend" / "docs")

    try:
        from services.embedding_pipeline import EmbeddingPipeline
        print(f"Starting embedding pipeline for directory: {docs_dir}")

        pipeline = EmbeddingPipeline()
        vector_count = pipeline.run_pipeline(docs_dir=docs_dir)

        print(f"✅ Successfully embedded documents.")
        print(f"📊 {vector_count} vectors stored in collection 'book_content'.")
        print(f"📁 Processed documents from: {docs_dir}")

        return vector_count

    except ImportError as e:
        print(f"❌ Import error: {e}")
        print("Make sure you're running from the project root with the virtual environment activated")
        return None
    except Exception as e:
        print(f"❌ Error running embedding pipeline: {e}")
        import traceback
        traceback.print_exc()
        return None

def check_collection_status():
    """Check the status of the Qdrant collection."""
    try:
        from data.qdrant_client import get_qdrant_client, COLLECTION_NAME

        client = get_qdrant_client()

        try:
            collection_info = client.get_collection(COLLECTION_NAME)
            vector_count = collection_info.points_count
            print(f"✅ Collection '{COLLECTION_NAME}' exists with {vector_count} vectors")
            return {"status": "ready", "vector_count": vector_count}
        except Exception as e:
            print(f"❌ Collection '{COLLECTION_NAME}' does not exist: {e}")
            return {"status": "missing", "vector_count": 0}

    except Exception as e:
        print(f"❌ Error checking collection status: {e}")
        return {"status": "error", "vector_count": 0}

def main():
    """Main function to run the embedding pipeline."""
    import argparse

    parser = argparse.ArgumentParser(description='Run RAG Embedding Pipeline')
    parser.add_argument('--docs-dir', type=str, help='Path to docs directory')
    parser.add_argument('--check-status', action='store_true', help='Check collection status only')

    args = parser.parse_args()

    if args.check_status:
        check_collection_status()
    else:
        run_embedding_pipeline(args.docs_dir)

if __name__ == "__main__":
    main()