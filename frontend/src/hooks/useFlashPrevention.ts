import { useEffect, useState } from 'react';

export const useFlashPrevention = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Most effective flash prevention strategy
    const preventFlash = () => {
      // 1. Set theme immediately
      document.documentElement.style.backgroundColor = '#000000';
      document.documentElement.style.color = '#ffffff';
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#ffffff';

      // 2. Prevent any white elements during load
      const preventWhiteElements = () => {
        const style = document.createElement('style');
        style.id = 'flash-prevention';
        style.textContent = `
          * {
            background-color: #000000 !important;
            color: #ffffff !important;
          }
          html, body, #root {
            background-color: #000000 !important;
            color: #ffffff !important;
            opacity: 1 !important;
            visibility: visible !important;
          }
          /* Specific for animated elements */
          [class*="animate-"], [class*="bg-"], section, div {
            background-color: #000000 !important;
            color: #ffffff !important;
          }
        `;
        document.head.appendChild(style);

        // Remove after React is ready
        setTimeout(() => {
          const flashStyle = document.getElementById('flash-prevention');
          if (flashStyle) {
            flashStyle.remove();
          }
        }, 4000);
      };

      preventWhiteElements();

      // 3. Wait for React to be ready
      const checkReactReady = () => {
        const root = document.getElementById('root');
        if (root && root.children.length > 0) {
          setIsReady(true);
        } else {
          setTimeout(checkReactReady, 100);
        }
      };

      // Start checking after a delay
      setTimeout(checkReactReady, 1000);
    };

    preventFlash();
  }, []);

  return { isReady };
};
