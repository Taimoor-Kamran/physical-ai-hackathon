# Physical AI & Humanoid Robotics Textbook

This project contains a comprehensive textbook on Physical AI and Humanoid Robotics with advanced UI features and RAG chatbot integration.

## Features

### Book Reading UI
- **Personalization Controls**: Adjust text size, font style, and background color
- **Translation Support**: Multi-language content support
- **Theme Options**: Light, dark, and high-contrast themes
- **Responsive Design**: Works on all device sizes
- **Accessibility**: WCAG 2.1 AA compliant

### Technical Implementation
- Docusaurus-based documentation site
- React hooks for state management
- CSS custom properties for theming
- localStorage for preference persistence
- RAG chatbot for interactive learning

## Quick Start

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start development server:
   ```bash
   npm start
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Serve production build:
   ```bash
   npm run serve
   ```

## Project Structure

- `frontend/` - Docusaurus documentation site with book UI
- `backend/` - FastAPI backend with RAG chatbot
- `specs/` - Feature specifications and implementation plans
- `history/` - Prompt History Records (PHRs) for all development

## Features Implemented

1. **Book UI with Personalization** - Complete UI with text size, font style, background color controls
2. **Translation Support** - Multi-language content capability
3. **Theme System** - Light, dark, and high-contrast themes
4. **Hero/Footer Consistency** - Visual design consistency across sections
5. **RAG Chatbot** - Interactive AI assistant for the textbook content

## Documentation

All development work is documented with Prompt History Records (PHRs) in the `history/prompts/` directory, following Spec-Driven Development (SDD) methodology.

## Deployment

The site is configured for GitHub Pages deployment at `/physical-ai-hackathon/` base path.