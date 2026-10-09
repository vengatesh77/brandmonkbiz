'use client';

import React from 'react';
import Image from 'next/image';
import { Leaf, HeartHandshake, ShieldAlert, Users2, ArrowRight } from 'lucide-react';

export default function SustainabilitySection() {
  const pillars = [
    {
      icon: <Leaf style={{ width: '24px', height: '24px', color: '#16a34a' }} />,
      title: 'Green Digital Infrastructure',
      desc: 'Optimizing cloud workloads and data centers to achieve net-zero carbon operations across all tech subsidiaries by 2030.',
    },
    {
      icon: <HeartHandshake style={{ width: '24px', height: '24px', color: '#16a34a' }} />,
      title: 'Grassroots Talent Skilling',
      desc: 'Granting over 10,000+ full-ride engineering scholarships to underprivileged and rural youth through Brand Monk Foundation.',
    },
    {
      icon: <Users2 style={{ width: '24px', height: '24px', color: '#16a34a' }} />,
      title: 'Diversity & Equal Opportunity',
      desc: 'Achieving a 45% women representation across engineering cohorts, research fellowships, and corporate leadership.',
    },
  ];

  return (
    <section id="sustainability" style={{ backgroundColor: '#090a0f', color: '#ffffff', padding: '100px 0', position: 'relative' }}>
      <div className="container">
        
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          {/* Left Column Text */}
          <div>
            <div className="section-tag" style={{ color: '#22c55e' }}>
              ESG & Sustainability
            </div>
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.2,
                marginBottom: '20px',
              }}
            >
              Responsible Leadership. Sustainable Impact.
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#94a3b8', marginBottom: '32px' }}>
              True enterprise value is measured by how responsibly we uplift society. Guided by our corporate ESG charter, Brand Monk Group integrates ethical AI, clean computation, and social empowerment into our daily operations.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
              {pillars.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    borderRadius: '8px',
                    padding: '20px',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      padding: '10px',
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(34, 197, 94, 0.2)',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 600, marginBottom: '6px' }}>
                      {item.title}
                    </h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#22c55e',
                fontSize: '0.9rem',
                fontWeight: 700,
              }}
            >
              Download Annual ESG Impact Report <ArrowRight style={{ width: '16px', height: '16px' }} />
            </a>
          </div>

          {/* Right Column Image */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
              }}
            >
              <Image
                src="/images/corp-sustainability.jpg"
                alt="Brand Monk Sustainability & ESG Initiatives"
                fill
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 50%, rgba(9, 10, 15, 0.95) 100%)',
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
                <div style={{ color: '#22c55e', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  Brand Monk Foundation
                </div>
                <div style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 700 }}>
                  Nurturing Human Capital For a Greener, Equitable World
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
