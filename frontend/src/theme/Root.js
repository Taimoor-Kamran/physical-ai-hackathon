import React from 'react';
import { useLocation } from '@docusaurus/router';
import clsx from 'clsx';
import BlogHeroHeader from '@site/src/components/BlogHeroHeader';

export default function Root({ children }) {
  const location = useLocation();
  const isBlogPage = location.pathname.startsWith('/blog');

  return (
    <>
      {isBlogPage && <BlogHeroHeader />}
      <div className={clsx({'blog-wrapper': isBlogPage})}>
        {children}
      </div>
    </>
  );
}