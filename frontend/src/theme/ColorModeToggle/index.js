import React from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {translate} from '@docusaurus/Translate';
// import IconLightMode from '@theme/Icon/LightMode'; // No longer needed
// import IconDarkMode from '@theme/Icon/DarkMode'; // No longer needed
// import IconSystemColorMode from '@theme/Icon/SystemColorMode'; // No longer needed
import Icon from 'feather-icons-react'; // Import Feather Icons
import styles from './styles.module.css';

// The order of color modes is defined here, and can be customized with swizzle
// Simplified to a 2-value transition (light/dark) as per user request for sun/moon icons
function getNextColorMode(colorMode, _respectPrefersColorScheme) {
  return colorMode === 'dark' ? 'light' : 'dark';
}

function getColorModeLabel(colorMode) {
  switch (colorMode) {
    case 'light':
      return translate({
        message: 'light mode',
        id: 'theme.colorToggle.ariaLabel.mode.light',
        description: 'The name for the light color mode',
      });
    case 'dark':
      return translate({
        message: 'dark mode',
        id: 'theme.colorToggle.ariaLabel.mode.dark',
        description: 'The name for the dark color mode',
      });
    default:
      // Fallback for initial render or unexpected values, defaults to light
      return translate({
        message: 'light mode',
        id: 'theme.colorToggle.ariaLabel.mode.light',
        description: 'The name for the light color mode',
      });
  }
}

function getColorModeAriaLabel(colorMode) {
  return translate(
    {
      message: 'Switch between dark and light mode (currently {mode})',
      id: 'theme.colorToggle.ariaLabel',
      description: 'The ARIA label for the color mode toggle',
    },
    {
      mode: getColorModeLabel(colorMode),
    },
  );
}

function CurrentColorModeIcon({ value }) {
  // Using Feather icons for sun/moon based on current color mode
  return (
    <div className={styles.iconWrapper}>
      {value === 'dark' ? (
        <Icon icon="moon" size={20} className={styles.iconDark} />
      ) : (
        <Icon icon="sun" size={20} className={styles.iconLight} />
      )}
    </div>
  );
}

function ColorModeToggle({
  className,
  buttonClassName,
  // respectPrefersColorScheme, // No longer directly used in simplified logic
  value,
  onChange,
}) {
  const isBrowser = useIsBrowser();

  return (
    <div className={clsx(styles.toggle, className)}>
      <button
        className={clsx(
          'clean-btn',
          styles.toggleButton,
          !isBrowser && styles.toggleButtonDisabled,
          buttonClassName,
        )}
        type="button"
        onClick={() =>
          onChange(getNextColorMode(value, false)) // Pass false for respectPrefersColorScheme as it's simplified
        }
        disabled={!isBrowser}
        title={getColorModeLabel(value)}
        aria-label={getColorModeAriaLabel(value)}>
        <CurrentColorModeIcon value={value} />
      </button>
    </div>
  );
}

export default React.memo(ColorModeToggle);
