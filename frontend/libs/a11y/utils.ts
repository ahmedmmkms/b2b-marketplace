// libs/a11y/utils.ts
import { FocusEvent } from 'react';

/**
 * Utility functions for accessibility features
 */

// Focus trap utility for modal dialogs and dropdowns
export function trapFocus(element: HTMLElement, returnFocusTo?: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return;
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };
  
  element.addEventListener('keydown', handleKeyDown);
  
  // Focus first element initially
  firstElement.focus();
  
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
    if (returnFocusTo) {
      returnFocusTo.focus();
    }
  };
}

// Focus visible utility to show focus only for keyboard users
export function handleFocusVisible() {
  let keyboardNavigation = false;
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      keyboardNavigation = true;
      document.body.classList.add('keyboard-nav');
    }
  };
  
  const handleMouseDown = () => {
    keyboardNavigation = false;
    document.body.classList.remove('keyboard-nav');
  };
  
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('mousedown', handleMouseDown);
  
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('mousedown', handleMouseDown);
  };
}

// ARIA live region for announcing dynamic content changes to screen readers
export function announceToScreenReader(message: string) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Clean up after announcing
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Check color contrast ratio (WCAG AA/AAA compliance)
export function checkContrastRatio(background: string, foreground: string): number {
  // Convert hex to RGB if needed
  const bg = hexToRgb(background) || parseRgb(background);
  const fg = hexToRgb(foreground) || parseRgb(foreground);
  
  if (!bg || !fg) return 0;
  
  // Calculate luminance
  const bgLum = calculateLuminance(bg.r, bg.g, bg.b);
  const fgLum = calculateLuminance(fg.r, fg.g, fg.b);
  
  // Calculate contrast ratio
  const brightest = Math.max(bgLum, fgLum);
  const darkest = Math.min(bgLum, fgLum);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function parseRgb(rgb: string): { r: number; g: number; b: number } | null {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) return null;
  
  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
  };
}

function calculateLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Custom hook for managing focus in components
export function useA11yFocus() {
  const focusRef = (element: HTMLElement | null) => {
    if (element) {
      element.focus();
    }
  };
  
  return { focusRef };
}