// libs/providers/A11yProvider.tsx
'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';

interface A11yContextType {
  reduceMotion: boolean;
  setReduceMotion: (value: boolean) => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  fontSize: 'normal' | 'large' | 'larger';
  setFontSize: (value: 'normal' | 'large' | 'larger') => void;
}

const A11yContext = createContext<A11yContextType | undefined>(undefined);

export function A11yProvider({ children }: { children: ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');

  // Check for user preferences on initial load
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleReducedMotionChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  // Apply high contrast class to body
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Apply font size class to body
  useEffect(() => {
    // Remove all font size classes first
    document.body.classList.remove('font-size-normal', 'font-size-large', 'font-size-larger');
    // Add the current font size class
    document.body.classList.add(`font-size-${fontSize}`);
  }, [fontSize]);

  return (
    <A11yContext.Provider 
      value={{ 
        reduceMotion, 
        setReduceMotion,
        highContrast,
        setHighContrast,
        fontSize,
        setFontSize
      }}
    >
      {children}
    </A11yContext.Provider>
  );
}

export function useA11y() {
  const context = useContext(A11yContext);
  if (context === undefined) {
    throw new Error('useA11y must be used within an A11yProvider');
  }
  return context;
}