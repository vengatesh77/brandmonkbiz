'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, ArrowRight, ExternalLink, Newspaper, FileText } from 'lucide-react';

export default function MediaSection() {
  const news = [
    {
      date: 'October 2026',
      category: 'Academy & Talent',
      title: 'Brand Monk Academy Celebrates Milestone Convocation of 1,000+ AI & Cloud Engineers',
      excerpt: 'Graduates receive globally accredited certifications with direct placements across Fortune 500 tech partners.',
      image: '/images/brandmonk-hero.jpg',
      tag: 'Press Release',
    },
    {
      date: 'September 2026',
      category: 'Enterprise Growth',
      title: 'Brand Monk Enterprise Expands Cloud Modernization Practice Across Singapore & EMEA',
      excerpt: 'Accelerating mission-critical enterprise engineering with high-frequency microservice frameworks.',
      image: '/images/corp-hq.jpg',
      tag: 'Corporate Announcement',
    },
    {
      date: 'August 2026',
      category: 'ESG & Foundation',
      title: 'Brand Monk Foundation Expands Tech Scholarships for Grassroots Innovators',
      excerpt: 'Committing $5M in grants and mentorship to bridge the digital opportunity divide globally.',
      image: '/images/corp-sustainability.jpg',
      tag: 'Foundation Impact',
    },
  ];

  return (
    <section id="media" style={{ backgroundColor: '#f8fafc', padding: '100px 0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="section-tag">
              Media Room & Stories
            </div>
            <h2 className="section-title" style={{ marginBottom: '10px' }}>
              Latest News & Conglomerate Insights
            </h2>
            <p className="section-subtitle">
              Stay updated with strategic developments, academy convocations, executive thought leadership, and corporate announcements.
            </p>
          </div>

          <a href="#contact" className="btn-secondary-light">
            <FileText style={{ width: '15px', height: '15px' }} />
            View All Press Releases
          </a>
        </div>

        {/* News Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
          }}
        >
          {news.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
              }}
              className="news-card"
            >
              <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: idx === 0 ? 'center 35%' : 'center center',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    backgroundColor: 'rgba(9, 10, 15, 0.85)',
                    color: '#c8963e',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '4px',
                    letterSpacing: '0.5px',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {item.tag}
                </span>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '10px' }}>
                    <Calendar style={{ width: '13px', height: '13px', color: '#9e1b23' }} />
                    <span>{item.date}</span>
                    <span>•</span>
                    <span style={{ color: '#9e1b23', fontWeight: 600 }}>{item.category}</span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.4, marginBottom: '12px' }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, marginBottom: '20px' }}>
                    {item.excerpt}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#9e1b23', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Read Article <ArrowRight style={{ width: '14px', height: '14px' }} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .news-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 35px rgba(0, 0, 0, 0.08);
          border-color: #cbd5e1;
        }
      `}</style>
    </section>
  );
}
