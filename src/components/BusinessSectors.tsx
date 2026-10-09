'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  GraduationCap,
  Building2,
  Cpu,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Layers,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

export default function BusinessSectors() {
  const [activeTab, setActiveTab] = useState<'all' | 'academy' | 'enterprise' | 'ventures'>('all');

  const businesses = [
    {
      id: 'academy',
      category: 'academy',
      tag: 'Academy & Talent Engineering',
      title: 'Brand Monk Academy',
      headline: 'The Finishing School for High-Impact Full-Stack & AI Engineers',
      desc: 'Transforming aspiring talent into enterprise-ready technology leaders with hands-on intensive residencies, live product deployments, and direct corporate placement pipelines.',
      metrics: ['50,000+ Alumni', '100% Placement Record', '120+ Hiring Alliances'],
      image: '/images/brandmonk-hero.jpg',
      features: ['Full Stack Web & Mobile', 'Applied Generative AI', 'Cloud & DevOps Architecture', 'Corporate Executive Mentorship'],
      badge: 'Flagship Division',
    },
    {
      id: 'enterprise',
      category: 'enterprise',
      tag: 'Digital Transformation',
      title: 'Brand Monk Enterprise Solutions',
      headline: 'Next-Gen Cloud Architecture & Bespoke Software Systems',
      desc: 'Architecting resilient digital platforms, microservices ecosystems, and data pipelines for Fortune 500 enterprises and hyper-growth scaleups worldwide.',
      metrics: ['99.99% Uptime SLAs', '18+ Global Markets', '$50M+ Value Delivered'],
      image: '/images/corp-hq.jpg',
      features: ['Enterprise Cloud Migration', 'Cybersecurity & Compliance', 'Microservices & API Gateways', 'Legacy Modernization'],
      badge: 'Enterprise Core',
    },
    {
      id: 'ventures',
      category: 'ventures',
      tag: 'Strategic Ventures & Incubator',
      title: 'Brand Monk Ventures & Labs',
      headline: 'Catalyzing High-Growth Technology & AI Startups',
      desc: 'Backing world-class founders and building proprietary AI tools that redefine modern brand engineering, automated marketing intelligence, and corporate workflow.',
      metrics: ['12+ Incubated Ventures', '3x Portfolio Growth', 'Global Syndicate Network'],
      image: '/images/corp-sustainability.jpg',
      features: ['Early-Stage Seed Capital', 'Technical Due Diligence', 'Go-To-Market Acceleration', 'AI Tooling Incubator'],
      badge: 'Innovation Arm',
    },
  ];

  const filtered = activeTab === 'all' ? businesses : businesses.filter((b) => b.category === activeTab);

  return (
    <section id="businesses" style={{ backgroundColor: '#f8fafc', padding: '100px 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        
        {/* Section Heading (Aditya Birla Style) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '50px' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            Conglomerate Portfolio
          </div>
          <h2 className="section-title">
            Our Core Businesses & Verticals
          </h2>
          <p className="section-subtitle">
            Spanning industry-acclaimed tech academies, mission-critical enterprise engineering, and venture incubation, our businesses drive compounding global value.
          </p>

          {/* Filter Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              backgroundColor: '#ffffff',
              padding: '6px',
              borderRadius: '30px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e2e8f0',
              marginTop: '32px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {[
              { id: 'all', label: 'All Businesses' },
              { id: 'academy', label: 'Academy & Talent' },
              { id: 'enterprise', label: 'Enterprise Solutions' },
              { id: 'ventures', label: 'Ventures & Labs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '24px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  transition: 'all 0.25s ease',
                  backgroundColor: activeTab === tab.id ? '#9e1b23' : 'transparent',
                  color: activeTab === tab.id ? '#ffffff' : '#64748b',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Business Cards Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {filtered.map((biz, idx) => (
            <div
              key={biz.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                transition: 'all 0.3s ease',
              }}
              className="business-card"
            >
              
              {/* Media Side */}
              <div style={{ position: 'relative', minHeight: '340px' }}>
                <Image
                  src={biz.image}
                  alt={biz.title}
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: biz.id === 'academy' ? 'center 35%' : 'center center',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: 'rgba(9, 10, 15, 0.85)',
                    color: '#c8963e',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid rgba(200, 150, 62, 0.4)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {biz.badge}
                </div>
              </div>

              {/* Details Side */}
              <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9e1b23', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                    {biz.tag}
                  </div>
                  <h3 style={{
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: '12px',
                    overflow: 'visible',
                    whiteSpace: 'normal',
                    wordBreak: 'normal',
                    overflowWrap: 'break-word',
                    lineHeight: 1.2,
                  }}>
                    {biz.title}
                  </h3>
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '14px',
                    lineHeight: 1.4,
                    overflow: 'visible',
                    whiteSpace: 'normal',
                    wordBreak: 'normal',
                    overflowWrap: 'break-word',
                  }}>
                    {biz.headline}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>
                    {biz.desc}
                  </p>

                  {/* Capabilities List */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '28px' }}>
                    {biz.features.map((feat, fidx) => (
                      <div key={fidx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#475569' }}>
                        <CheckCircle style={{ width: '14px', height: '14px', color: '#9e1b23', flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics & Action */}
                <div
                  style={{
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    {biz.metrics.map((m, midx) => (
                      <span
                        key={midx}
                        style={{
                          backgroundColor: '#f1f5f9',
                          color: '#0f172a',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: '4px',
                        }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#9e1b23',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      transition: 'transform 0.2s',
                    }}
                    className="biz-link"
                  >
                    Explore Division <ArrowRight style={{ width: '16px', height: '16px' }} />
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      <style>{`
        .business-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          border-color: #cbd5e1;
        }
        .biz-link:hover {
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
}
