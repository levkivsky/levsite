import { useEffect, useState } from 'react';

interface DeviceCapabilities {
  /** True below the 768px breakpoint (matches Tailwind's `md`). */
  isMobile: boolean;
  /** True on touch-primary devices, including hybrid laptops/tablets. */
  isCoarsePointer: boolean;
  /** True when the OS-level "reduce motion" accessibility setting is on. */
  prefersReducedMotion: boolean;
  /**
   * Convenience flag: only true when none of the above apply.
   * Gate expensive GPU-bound effects (large blur, continuous animation
   * loops, pointer tracking) behind this instead of checking each flag
   * individually.
   */
  enableHeavyEffects: boolean;
}

/**
 * Central place to decide whether the current device can safely sustain
 * expensive visual effects (backdrop blur, continuous Framer Motion loops,
 * cursor tracking, etc). All values start `false` on the server/first paint
 * and are corrected on mount — this is intentional: it means the initial
 * render never assumes heavy-effect capability, which is the safe default
 * for mobile stability and avoids SSR/hydration mismatches.
 */
export function useDeviceCapabilities(): DeviceCapabilities {
  const [isMobile, setIsMobile] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const pointerQuery = window.matchMedia('(pointer: coarse)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setIsMobile(mobileQuery.matches);
      setIsCoarsePointer(pointerQuery.matches);
      setPrefersReducedMotion(motionQuery.matches);
    };

    update();

    // addEventListener('change', ...) is supported in all current mobile
    // browsers; no need for the legacy addListener fallback here.
    mobileQuery.addEventListener('change', update);
    pointerQuery.addEventListener('change', update);
    motionQuery.addEventListener('change', update);

    return () => {
      mobileQuery.removeEventListener('change', update);
      pointerQuery.removeEventListener('change', update);
      motionQuery.removeEventListener('change', update);
    };
  }, []);

  return {
    isMobile,
    isCoarsePointer,
    prefersReducedMotion,
    enableHeavyEffects: !isMobile && !isCoarsePointer && !prefersReducedMotion,
  };
}
