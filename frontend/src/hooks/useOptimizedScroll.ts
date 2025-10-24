import { useEffect, useRef } from 'react';

/**
 * Custom hook for optimized scroll handling
 * Uses requestAnimationFrame for better performance
 */
export const useOptimizedScroll = (callback: () => void, deps: any[] = []) => {
  const callbackRef = useRef<() => void>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      callbackRef.current();
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, deps);
};