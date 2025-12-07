### Requirement
- The blog page content must be fully visible in light mode.
- In light mode, all blog text (including headings, paragraphs, lists, etc.) must be forced to a dark color against a solid white background using `!important` CSS rules.
- Force dark text on white background.
- CSS with `!important` should be used to ensure overrides.
- Blog text color should be light in dark mode.
- Blog background should be white in light mode.
- Blog background should be dark in dark mode.

### Implementation Code
**frontend/src/css/custom.css**
```css
/* LIGHT MODE */
html[data-theme='light'] .navbar { background: #ffffff !important; }
html[data-theme='light'] .blog-wrapper { background: #f8f9fa !important; }
html[data-theme='light'] .blog-wrapper * { color: #1e293b !important; }
html[data-theme='light'] .blog-card { background: #ffffff !important; border: 1px solid #e2e8f0; }

/* DARK MODE */
html[data-theme='dark'] .navbar { background: #1a1a2e !important; }
html[data-theme='dark'] .blog-wrapper { background: #0f0f23 !important; }
html[data-theme='dark'] .blog-wrapper * { color: #e0e7ff !important; }

/* === FORCE LIGHT MODE BLOG TEXT === */
html[data-theme='light'] .blog-wrapper,
html[data-theme='light'] .blog-wrapper *,
html[data-theme='light'] .blog-card,
html[data-theme='light'] .blog-card * {
  color: #0f172a !important;
  background-color: #ffffff !important;
}
html[data-theme='light'] .blog-card {
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
}
html[data-theme='light'] .blog-wrapper {
  background: #f8f9fa !important;
}
```

### Test Steps
1. Navigate to the blog page (`/blog`).
2. Switch to light mode.
3. Verify that all blog post content (headings, paragraphs, links, etc.) is clearly visible and has a dark color against a white background.
4. Switch to dark mode.
5. Verify that all blog post content (headings, paragraphs, links, etc.) is clearly visible and has a light color against a dark background.