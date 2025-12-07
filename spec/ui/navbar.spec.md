### Requirement
- The navbar should display "Physical AI & Humanoid Robotics".
- The robot emoji must be removed from the navbar.
- The navbar background should be white in light mode and dark in dark mode.

### Implementation Code
**frontend/docusaurus.config.ts**
```typescript
navbar: {
  title: 'Physical AI & Humanoid Robotics',
  // Removed logo object
  items: [
    // ... existing items
  ],
},
```

**frontend/src/css/custom.css**
```css
/* Navbar Light Mode */
html[data-theme='light'] .navbar {
  background-color: #ffffff !important;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

/* Navbar Dark Mode */
html[data-theme='dark'] .navbar {
  background-color: #1a1a2e !important;
}
```

### Test Steps
1. Navigate to any page on the Docusaurus site.
2. Verify the navbar displays "Physical AI & Humanoid Robotics" and no robot emoji.
3. Switch to light mode and verify the navbar has a white background.
4. Switch to dark mode and verify the navbar has a dark background.