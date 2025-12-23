---
name: panaversity-hackathon-frontend
description: Frontend development and UI components for the Physical AI & Humanoid Robotics project. Use when working with Docusaurus documentation, RAG chatbot UI, component development, styling, or frontend integration with the RAG backend.
---

# Panaversity Hackathon Frontend Development

This skill provides comprehensive guidance for developing and maintaining the frontend components of the Physical AI & Humanoid Robotics project, built with Docusaurus.

## Frontend Architecture

### Technology Stack
- **Framework**: Docusaurus v3 (React-based documentation site)
- **Language**: TypeScript/JavaScript
- **Styling**: CSS Modules, custom CSS
- **Proxy**: Development server proxy for backend API calls

### Project Structure
```
frontend/
├── docs/                 # Docusaurus documentation files (.md, .mdx)
├── src/
│   ├── components/      # React components
│   │   ├── RAGChatbot.js
│   │   ├── RAGChatbot.module.css
│   │   └── other components
│   ├── css/             # Custom styles
│   │   └── custom.css
│   └── pages/           # Custom pages
├── docusaurus.config.ts # Docusaurus configuration
├── sidebars.js          # Navigation sidebar configuration
├── package.json         # Dependencies and scripts
└── static/              # Static assets
```

## RAG Chatbot Component

### Location
- **Main Component**: `src/components/RAGChatbot.js`
- **Styles**: `src/components/RAGChatbot.module.css`

### Key Features
- **Text Selection**: Automatically opens when text is selected on page
- **Toggle Button**: "CHAT" button when minimized
- **Fixed Height**: 500px as specified in requirements
- **Source Context**: Displays document sources with proper object handling
- **Responsive Design**: Works across different screen sizes

### Component Properties
```javascript
const [selectedText, setSelectedText] = useState('');
const [query, setQuery] = useState('');
const [answer, setAnswer] = useState('');
const [sourceContext, setSourceContext] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [isMinimized, setIsMinimized] = useState(true);
const [isChatOpen, setIsChatOpen] = useState(false);
```

### API Integration
```javascript
// Uses direct API call to backend
const response = await fetch('http://localhost:8000/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: query, context: selectedText }),
});
```

### Source Context Handling
```javascript
// Properly handles both string and object source contexts
sourceContext.map((source, index) => (
  <li key={index}>
    {typeof source === 'string'
      ? source
      : source.title || source.source_path || JSON.stringify(source)}
  </li>
))
```

## Styling and UI

### CSS Modules
- **File**: `RAGChatbot.module.css`
- **Purpose**: Scoped component styling
- **Features**: Light/dark mode support, responsive design

### Key CSS Classes
- `.chatbotContainer` - Main chatbot container
- `.chatbotClosedButton` - Minimized "CHAT" button
- `.chatbotHeader` - Header with title and close button
- `.chatbotContent` - Main content area
- `.sourceContext` - Source attribution section

### Dark/Light Mode Support
```css
/* Light mode */
[data-theme='light'] .chatbotContainer {
  background-color: #ffffff;
  color: #1f2937;
}

/* Dark mode */
[data-theme='dark'] .chatbotContainer {
  background-color: #0f172a;
  color: #f3f4f6;
}
```

## Docusaurus Configuration

### Proxy Configuration
```typescript
// In docusaurus.config.ts
customFields: {
  devServer: {
    proxy: {
      '/rag': { target: 'http://localhost:8000', changeOrigin: true },
      '/api': { target: 'http://localhost:8000', changeOrigin: true },
      '/health': { target: 'http://localhost:8000', changeOrigin: true },
    },
  },
},
```

### Site Configuration
```typescript
const config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'Learn about Physical AI and Humanoid Robotics with hands-on labs',
  url: 'https://taimoor-kamran.github.io',
  baseUrl: '/physical-ai-hackathon/',
  organizationName: 'Taimoor-Kamran',
  projectName: 'physical-ai-hackathon',
  // ... other configuration
}
```

## Component Integration

### Adding RAG Chatbot to Pages
The RAG Chatbot is typically integrated into documentation pages through Docusaurus' layout system. It automatically appears on all pages when text is selected.

### Text Selection Handling
```javascript
const handleTextSelection = () => {
  const text = window.getSelection().toString().trim();
  if (text.length > 10) {
    setSelectedText(text);
    setIsMinimized(false);
    setIsChatOpen(true);
  }
};
```

## Development Workflow

### 1. Local Development
```bash
cd frontend/
npm run start
```

### 2. Build for Production
```bash
npm run build
```

### 3. Deployment
```bash
npm run deploy  # For GitHub Pages
```

## Common Frontend Tasks

### 1. Adding New Documentation
1. Create new `.md` or `.mdx` file in `/docs/`
2. Add to appropriate sidebar in `sidebars.js`
3. Content will be automatically indexed by embedding pipeline

### 2. Styling Updates
1. Modify CSS in component-specific CSS modules
2. Update global styles in `src/css/custom.css`
3. Test in both light and dark modes

### 3. Component Updates
1. Edit React components in `/src/components/`
2. Update corresponding CSS modules
3. Test functionality and responsiveness

## API Integration

### Backend Communication
- **Endpoint**: `http://localhost:8000/api/chat`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Request**: `{query: string, context: string}`
- **Response**: `{answer: string, source_context: array}`

### Error Handling
```javascript
try {
  const response = await fetch('http://localhost:8000/api/chat', {...});
  if (!response.ok) {
    // Check if response is JSON or HTML error page
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch answer from RAG service');
    } else {
      const errorText = await response.text();
      throw new Error(`Backend error: ${response.status} - ${errorText.substring(0, 200)}...`);
    }
  }
} catch (err) {
  setError(err.message);
}
```

## Responsive Design

### Chatbot Sizing
- **Height**: Fixed at 500px as per requirements
- **Width**: 350px fixed width
- **Position**: Fixed at bottom-right of screen
- **Max Height**: 80vh for very large screens

### Mobile Considerations
- Ensure chatbot doesn't interfere with mobile navigation
- Test text selection behavior on mobile devices
- Verify proper z-index for overlay behavior

## Troubleshooting

### Common Issues

#### 1. Chatbot Not Appearing
- **Check**: Ensure component is properly imported/used
- **Verify**: Text selection length > 10 characters
- **Confirm**: No JavaScript errors in console

#### 2. API Calls Failing
- **Check**: Backend server running on localhost:8000
- **Verify**: CORS configuration in backend
- **Confirm**: Network connectivity

#### 3. Styling Issues
- **Check**: CSS modules properly imported
- **Verify**: No conflicting global styles
- **Confirm**: Light/dark mode compatibility

#### 4. Source Context Rendering Error
- **Issue**: "Objects are not valid as a React child"
- **Solution**: Ensure proper handling of object vs string source context

### Debugging Steps
1. Check browser console for JavaScript errors
2. Verify network requests in Network tab
3. Confirm component state in React Developer Tools
4. Test with simple test data to isolate issues

## Performance Optimization

### Component Loading
- Use React.memo for performance optimization
- Implement proper cleanup for event listeners
- Optimize CSS for rendering performance

### API Call Optimization
- Implement loading states to prevent UI blocking
- Add error boundaries for graceful error handling
- Consider caching for frequently requested data

This frontend configuration provides a robust, scalable interface for the RAG system with proper integration to the backend services.