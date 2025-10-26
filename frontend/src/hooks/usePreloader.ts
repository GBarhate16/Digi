import { useEffect, useState } from 'react';

interface PreloadOptions {
  images?: string[];
  fonts?: string[];
}

export const usePreloader = (options: PreloadOptions = {}) => {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const preloadAssets = async () => {
      const { images = [], fonts = [] } = options;
      const totalAssets = images.length + fonts.length;
      let loadedAssets = 0;

      if (totalAssets === 0) {
        setIsPreloaded(true);
        return;
      }

      const updateProgress = () => {
        loadedAssets++;
        setProgress(Math.round((loadedAssets / totalAssets) * 100));
        
        if (loadedAssets === totalAssets) {
          setIsPreloaded(true);
        }
      };

      // Preload images
      const imagePromises = images.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            updateProgress();
            resolve();
          };
          img.onerror = () => {
            updateProgress();
            resolve(); // Continue even if image fails
          };
          img.src = src;
        });
      });

      // Preload fonts
      const fontPromises = fonts.map((fontFamily) => {
        return new Promise<void>((resolve) => {
          if ('fonts' in document && document.fonts) {
            document.fonts.load(`16px ${fontFamily}`).then(() => {
              updateProgress();
              resolve();
            }).catch(() => {
              updateProgress();
              resolve();
            });
          } else {
            // Fallback for browsers without font loading API
            updateProgress();
            resolve();
          }
        });
      });

      try {
        await Promise.all([...imagePromises, ...fontPromises]);
      } catch (error) {
        console.warn('Some assets failed to preload:', error);
        setIsPreloaded(true);
      }
    };

    preloadAssets();
  }, [options]);

  return { isPreloaded, progress };
};

// Hook specifically for critical assets
export const useCriticalAssets = () => {
  return usePreloader({
    images: [
      // Add any critical background images here if needed
    ],
    fonts: [
      // Simplified font list to avoid errors
      'system-ui',
    ],
  });
};
