'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import IntroAnimation from '@/components/IntroAnimation';
import Hero from '@/components/Hero';
import Founder from '@/components/Founder';
import GroupStats from '@/components/GroupStats';
import BusinessUniverse from '@/components/BusinessUniverse/BusinessUniverse';
import SocialBitesSection from '@/components/SocialBitesSection';
import OurStory from '@/components/OurStory';
import ContactSection from '@/components/ContactSection';
import ScrollStage from '@/components/ScrollStage';

export default function HomePage() {
  const [introFinished, setIntroFinished] = useState(false);
  const [replayIntroKey, setReplayIntroKey] = useState(0);

  const handleIntroComplete = useCallback(() => {
    setIntroFinished(true);
  }, []);

  const handleReplayIntro = useCallback(() => {
    setIntroFinished(false);
    setReplayIntroKey((prev) => prev + 1);
  }, []);

  return (
    /*
      IMPORTANT: This <main> must NOT have overflow:hidden or overflow:auto,
      and must NOT have a CSS transform — both break position:sticky inside
      ScrollStage. Use overflow-x:clip (set on html/body in globals.css).
    */
    <main
      className="relative w-full"
      style={{ backgroundColor: '#050608' }}
    >
      {/* Intro animation — fixed overlay, plays once per session */}
      <IntroAnimation
        key={`intro-${replayIntroKey}`}
        forceShow={replayIntroKey > 0}
        onComplete={handleIntroComplete}
      />

      {/* All page content fades in after the intro finishes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introFinished ? 1 : 0 }}
        transition={{ duration: 0 }}
        className="w-full"
      >
        <ScrollStage
          hero={
            /* Home opens with a "boom" — expands from the centre once the intro ends */
            <motion.div
              initial={{ clipPath: 'circle(0% at 50% 50%)', scale: 1.18 }}
              animate={
                introFinished
                  ? { clipPath: 'circle(80% at 50% 50%)', scale: 1 }
                  : { clipPath: 'circle(0% at 50% 50%)', scale: 1.18 }
              }
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              style={{ width: '100%', height: '100svh' }}
            >
              <Hero onReplayIntro={handleReplayIntro} />
            </motion.div>
          }
        >
          {/* Founder slides up over the pinned Hero like a curtain */}
          <Founder />

          {/* Remaining sections scroll normally after the Founder */}
          <GroupStats />
          <BusinessUniverse />
          <OurStory />
          <SocialBitesSection />
          <ContactSection />
        </ScrollStage>
      </motion.div>
    </main>
  );
}
