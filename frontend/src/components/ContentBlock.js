import React from 'react';
import styles from './ContentBlock.module.css';

interface ContentBlockProps {
  type: 'Theory' | 'Code' | 'Screenshot' | 'Real robot mapping';
  title?: string;
  children: React.ReactNode;
}

export default function ContentBlock({ type, title, children }: ContentBlockProps): JSX.Element {
  const blockClass = styles[type.replace(/\s/g, '')] || styles.defaultBlock;

  return (
    <div className={blockClass}>
      {title && <h3 className={styles.blockTitle}>{title}</h3>}
      {children}
    </div>
  );
}
