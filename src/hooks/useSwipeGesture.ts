import { useRef, useEffect, type RefObject } from 'react';

interface SwipeConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export const useSwipeGesture = (
  elementRef: RefObject<HTMLElement>,
  config: SwipeConfig
) => {
  const touchStartX = useRef<number>(0);
  const touchCurrentX = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);
  const swipeOffset = useRef<number>(0);

  const threshold = config.threshold || 80;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchCurrentX.current = e.touches[0].clientX;
      isSwiping.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwiping.current) return;
      
      touchCurrentX.current = e.touches[0].clientX;
      const diff = touchCurrentX.current - touchStartX.current;
      swipeOffset.current = diff;

      // Apply visual feedback
      element.style.transform = `translateX(${diff}px)`;
      element.style.transition = 'none';

      // Color feedback
      if (diff > 0) {
        // Swipe right (complete) - green tint
        const opacity = Math.min(Math.abs(diff) / threshold, 0.3);
        element.style.backgroundColor = `rgba(34, 197, 94, ${opacity})`;
      } else if (diff < 0) {
        // Swipe left (delete) - red tint
        const opacity = Math.min(Math.abs(diff) / threshold, 0.3);
        element.style.backgroundColor = `rgba(239, 68, 68, ${opacity})`;
      }
    };

    const handleTouchEnd = () => {
      if (!isSwiping.current) return;

      const diff = touchCurrentX.current - touchStartX.current;

      // Reset visual state with animation
      element.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
      element.style.transform = 'translateX(0)';
      element.style.backgroundColor = '';

      // Trigger actions if threshold met
      if (diff > threshold && config.onSwipeRight) {
        config.onSwipeRight();
      } else if (diff < -threshold && config.onSwipeLeft) {
        config.onSwipeLeft();
      }

      // Reset state
      isSwiping.current = false;
      touchStartX.current = 0;
      touchCurrentX.current = 0;
      swipeOffset.current = 0;
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [config.onSwipeLeft, config.onSwipeRight, threshold]);

  return swipeOffset.current;
};
