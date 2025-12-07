# Tasks: Complete Docusaurus UI for Physical AI & Humanoid Robotics Book

**Input**: Design documents from `/specs/001-book-ui/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: The feature specification does not explicitly request test tasks, so they are omitted for now.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- Paths shown below assume Docusaurus frontend structure.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic Docusaurus configuration for UI components

- [ ] T001 Configure Docusaurus to enable Theme Shadowing in `frontend/docusaurus.config.ts`
- [ ] T002 Install Google Translate API client-side library (if applicable) in `frontend/package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core UI components that MUST be complete before ANY user story UI can be fully implemented

**⚠️ CRITICAL**: No user story UI work can begin until this phase is complete

- [ ] T003 Create `ChapterHeader.jsx` component in `frontend/src/theme/TOC/ChapterHeader.jsx` (swizzled)

**Checkpoint**: Foundation ready - user story UI implementation can now begin in parallel

---

## Phase 3: User Story 1 - Navigate Book Chapters (Priority: P1) 🎯 MVP

**Goal**: Readers can easily navigate through book chapters using a structured sidebar and in-chapter navigation.

**Independent Test**: Verify that clicking sidebar links and using in-chapter navigation loads corresponding chapters with correct content display.

### Implementation for User Story 1

- [ ] T004 Ensure Docusaurus sidebar configuration (`sidebars.js` or similar) correctly lists all book chapters in `docs/`
- [ ] T005 Verify default chapter content rendering (headings, code samples, images) in `frontend/src/theme/DocItem/Content/index.js` (swizzled if needed)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Personalize Chapter Content (Priority: P1)

**Goal**: Readers can personalize chapter content based on their background.

**Independent Test**: Simulate different user backgrounds and verify that chapter content dynamically adjusts when the "Personalize Content" button is toggled.

### Implementation for User Story 2

- [ ] T006 [P] [US2] Implement `PersonalizeButton.jsx` component in `frontend/src/components/PersonalizeButton.jsx`
- [ ] T007 [US2] Implement client-side logic to fetch user background from a backend API (e.g., `src/utils/personalizationApi.js`)
- [ ] T008 [US2] Implement client-side logic to dynamically modify chapter content based on user background data within chapter rendering (e.g., modifying `frontend/src/theme/DocItem/Content/index.js` or a custom markdown renderer)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Translate Chapter to Urdu (Priority: P1)

**Goal**: Urdu-speaking readers can translate individual chapters to Urdu.

**Independent Test**: Activate the Urdu toggle on a chapter, verify content translates, navigate away, and return to confirm state persistence.

### Implementation for User Story 3

- [ ] T009 [P] [US3] Implement `UrduToggle.jsx` component in `frontend/src/components/UrduToggle.jsx`
- [ ] T010 [US3] Integrate Google Translate API for dynamic per-chapter translation in `frontend/src/utils/translationApi.js`
- [ ] T011 [US3] Implement `localStorage` for persisting Urdu translation state across sessions and navigation in `frontend/src/hooks/useUrduToggle.js`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Consistent and Branded UI (Priority: P2)

**Goal**: Consistent and visually appealing UI experience throughout the book, without breaking existing content.

**Independent Test**: Visually confirm that navbar, footer, and overall styling adhere to branding guidelines across various pages (chapters, home, blog), and that existing content layout/functionality is undisturbed.

### Implementation for User Story 4

- [ ] T012 Apply Docusaurus theme shadowing overrides for the navbar in `frontend/src/theme/Navbar/`
- [ ] T013 Apply Docusaurus theme shadowing overrides for the footer in `frontend/src/theme/Footer/`
- [ ] T014 Apply Docusaurus theme shadowing overrides for global colors/styles in `frontend/src/css/custom.css` (if not done already, or refining existing)
- [ ] T015 Verify existing Docusaurus content (e.g., blog posts, existing docs) layout and functionality are not broken after UI changes.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T016 Review and refine UI/UX across all new components and Docusaurus overrides
- [ ] T017 Code cleanup and refactoring for new React components and logic
- [ ] T018 Ensure all new UI components and logic have appropriate tests (unit, integration, E2E)
- [ ] T019 Conduct performance optimization for dynamic content personalization and translation.

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
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Integrates with global Docusaurus theme; should be independently testable for its scope.

### Within Each User Story

- Models/Components before services/logic
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, User Stories 1, 2, and 3 can start in parallel (if team capacity allows)
- Implementation tasks within a story marked [P] can run in parallel (e.g., creating components)
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 2 (Personalization) & User Story 3 (Translation)

```bash
# Launch PersonalizeButton and UrduToggle component creation together:
Task: "Implement PersonalizeButton.jsx component in frontend/src/components/PersonalizeButton.jsx"
Task: "Implement UrduToggle.jsx component in frontend/src/components/UrduToggle.jsx"

# Launch client-side logic for both in parallel (if independent parts of the same developer):
Task: "Implement client-side logic to fetch user background from a backend API (e.g., src/utils/personalizationApi.js)"
Task: "Integrate Google Translate API for dynamic per-chapter translation in frontend/src/utils/translationApi.js"
```

---

## Implementation Strategy

### MVP First (User Stories 1, 2, 3 - all P1)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. Complete Phase 4: User Story 2
5. Complete Phase 5: User Story 3
6. **STOP and VALIDATE**: Test all P1 user stories independently and together.
7. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Navigation)
   - Developer B: User Story 2 (Personalization)
   - Developer C: User Story 3 (Translation)
   - Developer D: User Story 4 (Branding/Consistency)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (if applicable, currently omitted)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
