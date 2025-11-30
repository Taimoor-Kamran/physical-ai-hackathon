---

description: "Task list template for feature implementation"
---

# Tasks: Physical AI & Humanoid Robotics Book Creation

**Input**: Design documents from `/specs/001-book-creation/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create root project directories: `backend/` and `frontend/` (root)
- [X] T002 Initialize Python environment and dependencies for backend in `backend/` (root)
- [X] T003 Initialize Node.js environment and dependencies for frontend in `frontend/` (root)
- [X] T004 Create initial FastAPI application structure in `backend/src/api/` (backend/src/api)
- [X] T005 Create initial Docusaurus site structure in `frontend/src/` (frontend/src)
- [X] T006 Add `requirements.txt` to backend with core FastAPI, uvicorn, qdrant-client, psycopg2-binary, openai (backend/requirements.txt)
- [X] T007 Add `package.json` to frontend with Docusaurus, react, react-dom (frontend/package.json)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T008 [P] Configure shared `Makefile` or `justfile` for common commands (build, test, run) (root)
- [X] T009 [P] Implement basic logging configuration for backend application in `backend/src/utils/logging.py` (backend/src/utils/logging.py)
- [ ] T010 [P] Configure `.env` handling for environment variables in `backend/.env.example` and `frontend/.env.example` (backend/.env.example, frontend/.env.example)
- [ ] T011 [P] Setup Git ignore files for `backend/` and `frontend/` (backend/.gitignore, frontend/.gitignore)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Read Comprehensive Book Content (Priority: P1) 🎯 MVP

**Goal**: The book can be fully accessed and navigated on GitHub Pages, displaying all chapters as per the 13-week curriculum, and delivers the primary educational content.

**Independent Test**: The book can be fully accessed and navigated on GitHub Pages, displaying all chapters as per the 13-week curriculum, and delivers the primary educational content.

### Implementation for User Story 1

- [ ] T012 [US1] Configure Docusaurus `docusaurus.config.js` with site metadata and theme (frontend/docusaurus.config.js)
- [ ] T013 [US1] Create Docusaurus `sidebars.js` for 13-week curriculum navigation (frontend/sidebars.js)
- [ ] T014 [US1] Create initial `index.md` or `_index.mdx` for the book's homepage (frontend/src/pages/index.mdx)
- [ ] T015 [US1] Create placeholder Markdown/MDX files for all 13 weeks in `frontend/docs/` (frontend/docs/week1.mdx, frontend/docs/week2.mdx, ...)
- [ ] T016 [P] [US1] Implement a basic Docusaurus component to display content with Theory, Code, Screenshot, Real robot mapping structure (frontend/src/components/ContentBlock.js)
- [ ] T017 [US1] Update one chapter's content (e.g., `week1.mdx`) to use the new `ContentBlock` component and include a "Lab Exercise" section with hardware requirements (frontend/docs/week1.mdx)
- [ ] T018 [US1] Configure GitHub Actions for Docusaurus deployment to GitHub Pages (root/.github/workflows/deploy-docs.yml)
- [ ] T019 [US1] Verify Docusaurus deployment to GitHub Pages works correctly (GitHub Pages URL)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Interact with RAG Chatbot (Priority: P1)

**Goal**: A user can select text in any chapter, activate the RAG chatbot, and receive an accurate answer derived solely from the selected text, demonstrating the chatbot's core functionality.

**Independent Test**: A user can select text in any chapter, activate the RAG chatbot, and receive an accurate answer derived solely from the selected text, demonstrating the chatbot's core functionality.

### Implementation for User Story 2

- [ ] T020 [US2] Define FastAPI model for `/query` request (selected_text, query) in `backend/src/api/models.py` (backend/src/api/models.py)
- [ ] T021 [US2] Define FastAPI model for `/query` response (answer, source_context) in `backend/src/api/models.py` (backend/src/api/models.py)
- [ ] T022 [P] [US2] Implement Qdrant client initialization and connection in `backend/src/data/qdrant_client.py` (backend/src/data/qdrant_client.py)
- [ ] T023 [P] [US2] Implement Postgres connection and basic content retrieval in `backend/src/data/postgres_client.py` (backend/src/data/postgres_client.py)
- [ ] T024 [P] [US2] Implement OpenAI Agents SDK / ChatKit integration for RAG processing in `backend/src/services/rag_service.py` (backend/src/services/rag_service.py)
- [ ] T025 [US2] Implement `/query` FastAPI endpoint that uses `rag_service` to process selected text (backend/src/api/routes.py)
- [ ] T026 [P] [US2] Create a Docusaurus client-side component to allow text selection and display chatbot UI (frontend/src/components/RAGChatbot.js)
- [ ] T027 [US2] Integrate `RAGChatbot` component into Docusaurus content pages (frontend/src/theme/DocItem/Content/index.js)
- [ ] T028 [US2] Implement client-side logic to send selected text to `/query` API endpoint and display response (frontend/src/components/RAGChatbot.js)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Access Open Source Code (Priority: P2)

**Goal**: The entire book's repository is publicly accessible on GitHub, contains all necessary source code and documentation, and clearly states an MIT license, verifiable by cloning the repository.

**Independent Test**: The entire book's repository is publicly accessible on GitHub, contains all necessary source code and documentation, and clearly states an MIT license, verifiable by cloning the repository.

### Implementation for User Story 3

- [ ] T029 [US3] Create or verify `LICENSE.md` file with MIT License in repository root (root/LICENSE.md)
- [ ] T030 [US3] Ensure all generated code includes proper Claude authorship comments/metadata where applicable (all code files)
- [ ] T031 [US3] Verify GitHub repository settings for public visibility (GitHub Repository Settings)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Automated RAG Index Management (Priority: P2)

**Goal**: After a new commit is pushed to the main branch, a GitHub Actions workflow is triggered, successfully re-indexes the book content, and updates the Qdrant instance, verifiable by checking the action logs and the chatbot's response to new content.

**Independent Test**: After a new commit is pushed to the main branch, a GitHub Actions workflow is triggered, successfully re-indexes the book content, and updates the Qdrant instance, verifiable by checking the action logs and the chatbot's response to new content.

### Implementation for User Story 4

- [ ] T032 [US4] Implement a Python script to parse Docusaurus Markdown/MDX content and extract text (backend/src/utils/content_parser.py)
- [ ] T033 [US4] Implement a Python script to generate embeddings for parsed content using OpenAI Embeddings API (backend/src/utils/embedding_generator.py)
- [ ] T034 [US4] Implement a Python script to upsert content embeddings into Qdrant (backend/src/utils/qdrant_indexer.py)
- [ ] T035 [US4] Create a main Python script to orchestrate the RAG index update process (parse -> embed -> index) (backend/src/rag_index_updater.py)
- [ ] T036 [US4] Configure GitHub Actions workflow `rag-index-update.yml` to trigger on push to `main` branch (root/.github/workflows/rag-index-update.yml)
- [ ] T037 [US4] Add steps to `rag-index-update.yml` to install Python dependencies, run `rag_index_updater.py` (root/.github/workflows/rag-index-update.yml)
- [ ] T038 [US4] Configure GitHub Actions to use necessary secrets for Qdrant and OpenAI API keys (GitHub Repository Secrets)
- [ ] T039 [US4] Verify RAG index update workflow runs successfully on push (GitHub Actions)

---

## Phase 7: User Story 5 - Language Mix Support (Priority: P3)

**Goal**: The book content includes examples of Roman Urdu + English mixed explanations in at least one chapter, demonstrating adherence to the linguistic style guide, verifiable by content review.

**Independent Test**: The book content includes examples of Roman Urdu + English mixed explanations in at least one chapter, demonstrating adherence to the linguistic style guide, verifiable by content review.

### Implementation for User Story 5

- [ ] T040 [US5] Update Docusaurus documentation/guidelines on content creation to include examples of Roman Urdu + English mix (frontend/docs/content-guidelines.md)
- [ ] T041 [US5] Add a section to an existing chapter (e.g., `week1.mdx`) demonstrating Roman Urdu + English mixed explanations (frontend/docs/week1.mdx)

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T042 [P] Implement unit tests for backend `content_parser` in `backend/tests/unit/test_content_parser.py` (backend/tests/unit/test_content_parser.py)
- [ ] T043 [P] Implement unit tests for backend `embedding_generator` in `backend/tests/unit/test_embedding_generator.py` (backend/tests/unit/test_embedding_generator.py)
- [ ] T044 [P] Implement unit tests for backend `qdrant_indexer` in `backend/tests/unit/test_qdrant_indexer.py` (backend/tests/unit/test_qdrant_indexer.py)
- [ ] T045 [P] Implement integration tests for backend `/query` endpoint using `TestClient` in `backend/tests/integration/test_rag_api.py` (backend/tests/integration/test_rag_api.py)
- [ ] T046 [P] Implement E2E tests for Docusaurus navigation and content display using Cypress/Playwright in `frontend/tests/e2e/book_navigation.spec.js` (frontend/tests/e2e/book_navigation.spec.js)
- [ ] T047 [P] Implement E2E tests for RAG chatbot interaction using Cypress/Playwright in `frontend/tests/e2e/rag_chatbot.spec.js` (frontend/tests/e2e/rag_chatbot.spec.js)
- [ ] T048 Implement error handling for RAG chatbot (e.g., selected text too short/long, Qdrant/OpenAI API errors) in `backend/src/services/rag_service.py` (backend/src/services/rag_service.py)
- [ ] T049 Implement graceful degradation/error messages for frontend RAG chatbot UI (frontend/src/components/RAGChatbot.js)
- [ ] T050 Update `CLAUDE.md` with project-specific instructions and conventions (root/CLAUDE.md)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models/components within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all Docusaurus component/config tasks for User Story 1 together:
Task: "Configure Docusaurus `docusaurus.config.js` with site metadata and theme (frontend/docusaurus.config.js)"
Task: "Create Docusaurus `sidebars.js` for 13-week curriculum navigation (frontend/sidebars.js)"
Task: "Create initial `index.md` or `_index.mdx` for the book's homepage (frontend/src/pages/index.mdx)"
Task: "Create placeholder Markdown/MDX files for all 13 weeks in `frontend/docs/` (frontend/docs/week1.mdx, frontend/docs/week2.mdx, ...)"
Task: "Implement a basic Docusaurus component to display content with Theory, Code, Screenshot, Real robot mapping structure (frontend/src/components/ContentBlock.js)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
