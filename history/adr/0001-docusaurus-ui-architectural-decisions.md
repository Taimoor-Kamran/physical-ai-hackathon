# [ADR-0001] Docusaurus UI Architectural Decisions

## Date
2025-12-05

## Status
Proposed

## Context
The project requires a complete Docusaurus UI for the Physical AI & Humanoid Robotics Book, including a structured sidebar, chapter layouts, content personalization, and Urdu translation. Several key architectural decisions were made during the planning phase to ensure maintainability, user experience, and accessibility.

## Decisions

### 1. Docusaurus Theming Strategy
*   **Chosen Solution**: Theme Shadowing
*   **Rationale**: Theme shadowing provides a flexible and maintainable way to override Docusaurus components without ejecting them. This allows for custom implementations while preserving upgrade compatibility and simplifying future Docusaurus version upgrades.
*   **Alternatives Considered**:
    *   **Swizzling**: Ejecting components would offer full control but create a maintenance burden for Docusaurus upgrades.
    *   **Custom CSS**: While simple for basic styling, aggressive custom CSS (e.g., with `!important`) can lead to specificity issues and make overrides difficult to manage and debug.

### 2. Content Personalization Mechanism
*   **Chosen Solution**: Client-Side Fetch with Content Modification
*   **Rationale**: This approach allows for dynamic personalization after the page loads, which reduces the complexity of the Docusaurus build process and enables real-time content adaptation based on user profiles. It avoids generating multiple static versions of content for each user background. An API endpoint will fetch user background data from Postgres, and JavaScript will then modify the rendered content on the client side.
*   **Alternatives Considered**:
    *   **Direct API Call (Server-Side Rendering/Static Generation)**: Could pre-render personalized content, but increases build time/server load for each variation and complicates caching.
    *   **Pre-generated Personalized Content (Static Generation)**: Generating different markdown files for each user background during build time would lead to an explosion of static files and high build times.

### 3. Urdu Translation Library/API
*   **Chosen Solution**: Google Translate API
*   **Rationale**: Leveraging a robust, high-quality cloud translation service like Google Translate API ensures accurate and efficient on-the-fly translation for Urdu. This approach avoids the need for manual maintenance of translation files and leverages Google's advanced machine translation capabilities for dynamic content.
*   **Alternatives Considered**:
    *   **i18next**: A powerful client-side internationalization framework. While flexible, it would require manual management of translation keys and values for Urdu, which can be extensive for an entire book.
    *   **Custom JSON Dictionary**: Similar to i18next, this would involve significant manual effort to create and maintain comprehensive Urdu translations for all chapter content.
    *   **Docusaurus i18n Feature**: Docusaurus has built-in i18n, but this typically involves maintaining separate markdown files per language, which might be overkill for a single dynamic translation toggle and requires more extensive content management.

## Consequences
*   **Positive**: Improved maintainability for theming (Theme Shadowing), dynamic and flexible content personalization, high-quality on-demand Urdu translation. Enhanced user experience and accessibility.
*   **Negative**: Dependency on Google Translate API (cost, external service availability). Client-side personalization and translation might introduce slight latency or require robust loading indicators.
*   **Risks**: Potential for theme shadowing to be insufficient for some complex overrides, requiring more advanced customization. Google Translate API usage costs need monitoring. Performance impact on page load times due to client-side content modification.

## References
*   `/home/taimoor/Hackathon/specs/001-book-ui/plan.md`
*   `/home/taimoor/Hackathon/specs/001-book-ui/spec.md`
