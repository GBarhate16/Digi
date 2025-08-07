// ✨ Drop-in optimized GlowCard.tsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLenisContext } from "../../hooks/lenis.tsx";

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
  yellow: { base: 60, spread: 150 },
};

const sizeMap = {
  sm: "w-56 h-64",
  md: "w-72 h-80",
  lg: "w-96 h-96",
  xl: "w-[400px] h-[400px]",
};

interface Props {
  children: React.ReactNode;
  className?: string;
  glowColor?: keyof typeof glowColorMap;
  size?: keyof typeof sizeMap;
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const GlowCard: React.FC<Props> = ({
  children,
  className = "",
  glowColor = "blue",
  size = "md",
  width,
  height,
  customSize = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [scrollingFast, setScrollingFast] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lenis = useLenisContext();
  const pointerTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Check if it's mobile
  useEffect(() => {
    const update = () =>
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Throttled pointer move handler
  const syncPointer = useCallback((e: PointerEvent) => {
    if (isMobile || scrollingFast || !cardRef.current) return;

    // Clear existing timeout
    if (pointerTimeoutRef.current) {
      clearTimeout(pointerTimeoutRef.current);
    }

    // Throttle pointer updates
    pointerTimeoutRef.current = setTimeout(() => {
      const { clientX: x, clientY: y } = e;
      if (cardRef.current) {
        cardRef.current.style.setProperty("--x", x.toFixed(2));
        cardRef.current.style.setProperty(
          "--xp",
          (x / window.innerWidth).toFixed(2)
        );
        cardRef.current.style.setProperty("--y", y.toFixed(2));
        cardRef.current.style.setProperty(
          "--yp",
          (y / window.innerHeight).toFixed(2)
        );
      }
    }, 16); // ~60fps
  }, [isMobile, scrollingFast]);

  // Update pointer position for glow (optimized)
  useEffect(() => {
    if (isMobile || scrollingFast) return;

    document.addEventListener("pointermove", syncPointer, { passive: true });
    return () => {
      document.removeEventListener("pointermove", syncPointer);
      if (pointerTimeoutRef.current) {
        clearTimeout(pointerTimeoutRef.current);
      }
    };
  }, [syncPointer, isMobile, scrollingFast]);

  // Listen to Lenis scroll events for fast scroll detection
  useEffect(() => {
    if (!lenis) return;

    const handleScroll = (e: { velocity: number }) => {
      const velocity = Math.abs(e.velocity);
      setScrollingFast(velocity > 0.5); // Adjust threshold as needed
    };

    lenis.on('scroll', handleScroll);
    return () => lenis.off('scroll', handleScroll);
  }, [lenis]);

  const { base, spread } = glowColorMap[glowColor];
  const sizeClasses = customSize ? "" : sizeMap[size];

  const style = {
    "--base": base,
    "--spread": spread,
    "--radius": "14",
    "--border": "2",
    "--size": "160",
    "--outer": "1",
    "--border-size": "calc(var(--border) * 1px)",
    "--spotlight-size": "calc(var(--size) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread)))",
    ...(width && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height && {
      height: typeof height === "number" ? `${height}px` : height,
    }),
    backgroundColor: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "transform 0.3s ease",
    willChange: "transform",
    ...(isMobile || scrollingFast
      ? {}
      : {
          backgroundImage: `radial-gradient(
            var(--spotlight-size) var(--spotlight-size) at
            calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
            hsl(var(--hue) 100% 70% / 0.1), transparent
          )`,
        }),
  } as React.CSSProperties & Record<string, string | number>;

  return (
    <div
      ref={cardRef}
      className={`relative rounded-2xl p-4 shadow-xl ${sizeClasses} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default GlowCard;
