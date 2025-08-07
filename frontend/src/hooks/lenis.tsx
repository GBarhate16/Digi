// src/hooks/lenis.tsx
import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";

// Create a singleton Lenis instance
let lenisInstance: Lenis | null = null;

// Context for sharing Lenis instance
const LenisContext = createContext<Lenis | null>(null);

export const useLenisContext = () => useContext(LenisContext);

export const useLenis = (onFastScroll?: (isFast: boolean) => void) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    // Only create one Lenis instance
    if (!lenisInstance) {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });
    }

    let lastY = window.scrollY;
    let ticking = false;
    let isFast = false;

    const handleFastScroll = () => {
      const deltaY = Math.abs(window.scrollY - lastY);
      const isNowFast = deltaY > 40;
      
      if (isFast !== isNowFast) {
        isFast = isNowFast;
        onFastScroll?.(isFast);
      }
      
      lastY = window.scrollY;
    };

    const raf = (time: number) => {
      lenisInstance!.raf(time);

      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleFastScroll();
          ticking = false;
        });
        ticking = true;
      }

      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Don't destroy on unmount since it's a singleton
    return () => {
      // Only destroy when the component that created it unmounts
      if (isInitialized.current) {
        lenisInstance?.destroy();
        lenisInstance = null;
      }
    };
  }, [onFastScroll]);

  // Mark as initialized
  if (!isInitialized.current) {
    isInitialized.current = true;
  }

  return lenisInstance;
};

// Provider component for Lenis context
export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenis = useLenis();
  
  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}; 