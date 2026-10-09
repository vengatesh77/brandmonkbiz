'use client';

import React from 'react';
import Image from 'next/image';
import { Quote, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ChairmanMessage() {
  return (
    <section id="about" style={{ backgroundColor: '#0b0d13', color: '#ffffff', padding: '100px 0', position: 'relative' }}>
      <div className="container">
        
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          
          {/* Left Column: Visual & Conglomerate Badge */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
                aspectRatio: '4/3',
              }}
            >
              <Image
                src="/images/corp-hq.jpg"
                alt="Brand Monk Global Headquarters"
                fill
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(11, 13, 19, 0.9) 100%)',
                }}
              />
              
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                }}
              >
                <div style={{ fontSize: '0.8rem', color: '#c8963e', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700 }}>
                  Brand Monk World Headquarters
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff' }}>
                  Center for Global Innovation & Talent Engineering
                </div>
              </div>
            </div>

            {/* Floating Glass Pill */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-15px',
                backgroundColor: 'rgba(158, 27, 35, 0.95)',
                color: '#ffffff',
                padding: '14px 20px',
                borderRadius: '6px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <Quote style={{ width: '20px', height: '20px', color: '#dfb260' }} />
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.1 }}>Values-Led</div>
                <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>Performance Driven</div>
              </div>
            </div>
          </div>

          {/* Right Column: Leadership Philosophy Text */}
          <div>
            <div className="section-tag" style={{ color: '#c8963e' }}>
              Leadership & Purpose
            </div>

            <h2
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.2,
                marginBottom: '24px',
                letterSpacing: '-0.02em',
              }}
            >
              &ldquo;Transforming human capability into sustainable economic value.&rdquo;
            </h2>

            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#94a3b8', marginBottom: '24px' }}>
              At Brand Monk Group, our core mission transcends traditional enterprise services. We believe true corporate resilience is built at the intersection of elite talent skilling, mission-critical engineering, and visionary brand building.
            </p>

            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#cbd5e1', marginBottom: '32px' }}>
              Every program we launch, every enterprise architecture we deploy, and every convocation we celebrate is dedicated to a singular benchmark: delivering enduring impact for our global partners and communities.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 style={{ width: '18px', height: '18px', color: '#22c55e' }} />
                <span style={{ fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 500 }}>Meritocratic Culture</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 style={{ width: '18px', height: '18px', color: '#22c55e' }} />
                <span style={{ fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 500 }}>Zero-Compromise Quality</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 style={{ width: '18px', height: '18px', color: '#22c55e' }} />
                <span style={{ fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 500 }}>Global Scalability</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 style={{ width: '18px', height: '18px', color: '#22c55e' }} />
                <span style={{ fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 500 }}>Ethical Governance</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '24px' }}>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>Executive Board & Leadership</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Brand Monk Group of Companies</div>
              </div>
              <a
                href="#businesses"
                style={{
                  marginLeft: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#c8963e',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                }}
              >
                Explore Divisions <ArrowRight style={{ width: '15px', height: '15px' }} />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
