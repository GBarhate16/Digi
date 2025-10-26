import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCriticalAssets } from '../hooks/usePreloader';
import logo from '../assets/Logo.png';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const { isPreloaded } = useCriticalAssets();

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 3;
      });
    }, 10);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    // Complete after minimum time and when assets are loaded
    const timer = setTimeout(() => {
      if (progress >= 100 && isPreloaded) {
        onComplete();
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [progress, isPreloaded, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        style={{
          // Mobile-specific fixes
          WebkitTransform: 'translate3d(0,0,0)',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
          // Prevent mobile flash
          backgroundColor: '#000000',
          width: '100vw',
          height: '100dvh', // Dynamic viewport height for mobile
          // Ensure scrolling works even during preloader
          pointerEvents: 'none', // Allow clicks/scrolls to pass through
        }}
      >
        <div className="text-center" style={{ pointerEvents: 'auto' }}>
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center justify-center"
          >
            {/* Logo Image */}
            <img
              src={logo}
              alt="Digitos Logo"
              className="h-16 w-auto sm:h-20 md:h-24 object-contain"
              style={{ maxWidth: '200px' }}
            />
          </motion.div>

          {/* Progress Bar */}
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Progress Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-yellow-400 text-sm font-medium"
          >
            {progress}% Complete
          </motion.p>

          {/* Loading Animation */}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
