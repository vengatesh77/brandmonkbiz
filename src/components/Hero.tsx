"use client";

import Navbar from "./Navbar";
import HeroSlides from "./HeroSlides";

interface HeroProps {
  onReplayIntro?: () => void;
}

/**
 * Hero — full-viewport section.
 *
 * Responsibilities:
 *   • Provides the positioned <section> shell.
 *   • Mounts <Navbar> (z-50, above everything).
 *   • Mounts <HeroSlides> which owns:
 *       - all background images + crossfade timer
 *       - the black overlay stack
 *       - the "BRAND MONK GROUP | <rotating word>" heading
 *
 * DO NOT add a second timer or a second image list here.
 */
export default function Hero({ onReplayIntro }: HeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden bg-black select-none"
      style={{ height: "100svh" }}
    >
      {/* Navbar — z-50, sits above slides and overlays */}
      <Navbar onReplayIntro={onReplayIntro} />

      {/* All images, overlays, and heading live here */}
      <HeroSlides />
    </section>
  );
}
