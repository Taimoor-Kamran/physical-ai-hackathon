import React from 'react';
import styles from './PersonalizeButton.module.css';
import usePersonalization from '../../hooks/usePersonalization';

function PersonalizeButton() {
  const [isPersonalized, togglePersonalization] = usePersonalization();

  const handleClick = () => {
    togglePersonalization();
    // Here you would trigger the actual content personalization logic
    // For now, it's just a toggle.
    console.log('Personalization toggled:', !isPersonalized);
  };

  return (
    <button
      className={styles.personalizeButton}
      onClick={handleClick}
    >
      {isPersonalized ? 'Disable Personalization' : 'Enable Personalization'}
    </button>
  );
}

export default PersonalizeButton;
