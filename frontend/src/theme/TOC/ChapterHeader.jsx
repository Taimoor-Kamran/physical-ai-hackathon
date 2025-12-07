import React from 'react';

function ChapterHeader({ title, description }) {
  return (
    <div className="chapter-header">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}

export default ChapterHeader;
