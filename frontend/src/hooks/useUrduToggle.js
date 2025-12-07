import { useState, useEffect } from 'react';

function useUrduToggle() {
  const [isUrdu, setIsUrdu] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem('isUrdu');
      return storedValue === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isUrdu', isUrdu.toString());
    }
  }, [isUrdu]);

  const toggleUrdu = () => {
    setIsUrdu((prev) => !prev);
  };

  return [isUrdu, toggleUrdu];
}

export default useUrduToggle;
