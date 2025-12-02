import React from 'react';
import Heading from '@theme/Heading';

function BlogHeroHeader() {
  return (
    <header className="hero-banner">
      <div className="container">
        <Heading as="h1" className="hero__title">
          Physical AI & Humanoid Robotics Blog
        </Heading>
        <p className="hero__subtitle">Latest updates from the frontier of embodied AI</p>
      </div>
    </header>
  );
}

export default BlogHeroHeader;