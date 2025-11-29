# Data Model: Physical AI & Humanoid Robotics Book Creation

This document outlines the key entities and their attributes relevant to the "Physical AI & Humanoid Robotics Book Creation" feature, based on the `spec.md`.

## Entities

### Book Content
- Represents: Chapters, modules, and lessons comprising the educational material.
- Attributes:
    - `id`: Unique identifier for each piece of content (e.g., chapter, section, paragraph).
    - `text`: The actual markdown/MDX content.
    - `metadata`: Structural information (e.g., chapter title, module name, week number, source file path).
    - `embedding`: Vector representation of the content for RAG (generated and stored in RAG Index).

### RAG Chatbot
- Represents: AI-powered conversational agent embedded in the book for interactive learning.
- Attributes:
    - `query`: User's selected text or question.
    - `response`: Chatbot's answer based on the RAG index.
    - `context_source`: Reference to the specific Book Content used to generate the response.

### RAG Index (Qdrant)
- Represents: A vector database storing embeddings of book content.
- Attributes:
    - `vector`: High-dimensional vector embedding of a piece of `Book Content`.
    - `payload`: Associated metadata for the vector (e.g., `content_id`, `chapter_title`, `source_url`).

### GitHub Repository
- Represents: Source code management for the book content and project infrastructure.
- Attributes:
    - `url`: URL of the GitHub repository.
    - `branch`: Current working branch (e.g., `main`, `001-book-creation`).
    - `commit_hash`: Identifier for specific versions of the content.

### GitHub Pages
- Represents: Web hosting platform for the live, publicly accessible book.
- Attributes:
    - `deployment_url`: URL where the Docusaurus book is hosted.
    - `last_deployment_timestamp`: Timestamp of the most recent successful deployment.

### GitHub Actions
- Represents: Automation platform for CI/CD, including RAG index updates.
- Attributes:
    - `workflow_id`: Unique identifier for the RAG index update workflow.
    - `run_status`: Status of the last workflow run (e.g., `success`, `failure`).
    - `last_run_timestamp`: Timestamp of the last workflow execution.
