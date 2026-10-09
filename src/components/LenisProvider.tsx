'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Respect prefers-reduced-motion — skip smooth scrolling entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      // ease-out expo curve
      easing: (t: number) => 1 - Math.pow(1 - t, 5),
    } as ConstructorParameters<typeof Lenis>[0]);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
