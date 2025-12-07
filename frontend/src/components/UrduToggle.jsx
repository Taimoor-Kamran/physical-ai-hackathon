import React from 'react';
import styles from './UrduToggle.module.css';
import useUrduToggle from '../../hooks/useUrduToggle';

function UrduToggle() {
  const [isUrdu, toggleUrdu] = useUrduToggle();

  const handleClick = () => {
    toggleUrdu();
    // Here you would trigger the actual content translation logic
    console.log('Urdu translation toggled:', !isUrdu);
  };

  return (
    <button
      className={styles.urduToggleButton}
      onClick={handleClick}
    >
      {isUrdu ? 'Switch to English' : 'اردو میں ترجمہ کریں'} {/* Translate to Urdu */}
    </button>
  );
}

export default UrduToggle;
