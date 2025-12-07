import { useState, useEffect } from 'react';

function usePersonalization() {
  const [isPersonalized, setIsPersonalized] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem('isPersonalized');
      return storedValue === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isPersonalized', isPersonalized.toString());
    }
  }, [isPersonalized]);

  const togglePersonalization = () => {
    setIsPersonalized((prev) => !prev);
  };

  return [isPersonalized, togglePersonalization];
}

export default usePersonalization;
