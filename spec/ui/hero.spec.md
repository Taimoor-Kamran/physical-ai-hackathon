### Requirement
- The blog hero section should display a main title "Physical AI & Humanoid Robotics Blog".
- A subtitle "Latest updates from the frontier of embodied AI" should be present.
- A descriptive paragraph "Building the Future of Embodied Intelligence" should be present.
- An additional paragraph should describe the book: "Join us as we explore cutting-edge humanoid robotics, ROS 2, Gazebo simulations, and real-world deployment. From theory to hardware — everything you need to master Physical AI."
- A call-to-action link "Start Your Physical AI Journey →" pointing to `/docs/introduction` should be visible.
- A pre-order message "Pre-order "The Definitive Guide to Physical AI & Humanoid Robotics" coming 2026." should be displayed below the button.
- The hero section should be responsive and display correctly in both light and dark themes.

### Implementation Code
**frontend/src/components/BlogHeroHeader.js**
```javascript
<div className="text-center py-16">
  <h1 className="blog-title">
    Physical AI & Humanoid Robotics Blog
  </h1>
  <p className="blog-subtitle text-lg">
    Latest updates from the frontier of embodied AI
  </p>
  <p className="text-center text-lg mt-4 font-medium text-gray-700">
    Building the Future of Embodied Intelligence
  </p>
  <p className="text-center text-base mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
    Join us as we explore cutting-edge humanoid robotics, ROS 2, Gazebo simulations, and real-world deployment. From theory to hardware — everything you need to master Physical AI.
  </p>
  <a href="/docs/introduction" className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
    Start Your Physical AI Journey →
  </a>
  <p className="text-center text-sm mt-4 text-gray-500 dark:text-gray-400">
    Pre-order "The Definitive Guide to Physical AI & Humanoid Robotics" coming 2026.
  </p>
</div>
```

### Test Steps
1. Navigate to the blog page (`/blog`).
2. Verify all specified text content (title, subtitles, paragraphs, book pre-order message) is present and correctly formatted in the hero section.
3. Verify the "Start Your Physical AI Journey →" button is visible and links to `/docs/introduction`.
4. Resize the browser window and switch between light/dark themes to verify the hero section content remains responsive and correctly themed.