// src/hooks/useLenis.ts
import { useEffect } from "react";
import Lenis from "lenis";

export const useLenis = (onFastScroll?: (isFast: boolean) => void) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let lastY = window.scrollY;
    let ticking = false;
    let isFast = false;

    const handleFastScroll = () => {
      const deltaY = Math.abs(window.scrollY - lastY);

      const isNowFast = deltaY > 40; // adjust this threshold
      if (isFast !== isNowFast) {
        isFast = isNowFast;
        onFastScroll?.(isFast); // notify if provided
      }

      lastY = window.scrollY;
    };

    const raf = (time: number) => {
      lenis.raf(time);

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

    return () => {
      lenis.destroy();
    };
  }, [onFastScroll]);
};
