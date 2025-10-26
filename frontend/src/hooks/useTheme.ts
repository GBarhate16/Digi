import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    // Check if theme is already loaded from the script in HTML head
    const themeLoaded = document.documentElement.classList.contains('theme-loaded');
    
    if (themeLoaded) {
      setIsThemeLoaded(true);
    } else {
      // Fallback: Set theme if not already set
      document.documentElement.style.backgroundColor = '#000000';
      document.documentElement.style.color = '#ffffff';
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#ffffff';
      document.documentElement.classList.add('theme-loaded');
      setIsThemeLoaded(true);
    }

    // Add smooth transition after theme is loaded
    const timer = setTimeout(() => {
      document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
      document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { isThemeLoaded };
};
