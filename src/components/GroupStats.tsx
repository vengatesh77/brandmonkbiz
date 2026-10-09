'use client';

import React from 'react';
import { Award, Users, Globe2, Building2 } from 'lucide-react';

export default function GroupStats() {
  const stats = [
    {
      icon: <Award style={{ width: '28px', height: '28px', color: '#9e1b23' }} />,
      number: '24',
      title: 'Years of Experience',
      desc: 'Two decades of building, advising and growing businesses with consistency and trust.',
    },
    {
      icon: <Building2 style={{ width: '28px', height: '28px', color: '#9e1b23' }} />,
      number: '9',
      title: 'Industries',
      desc: 'A diversified group spanning consulting, AI, food & beverages, education and more.',
    },
    {
      icon: <Users style={{ width: '28px', height: '28px', color: '#9e1b23' }} />,
      number: '100+',
      title: 'Team Members',
      desc: 'A growing team of engineers, strategists and creators working across every vertical.',
    },
    {
      icon: <Globe2 style={{ width: '28px', height: '28px', color: '#9e1b23' }} />,
      number: '10+',
      title: 'Countries',
      desc: 'Clients, partners and operations reaching markets across the world.',
    },
  ];

  return (
    <section id="stats" style={{ backgroundColor: '#ffffff', padding: '90px 0', borderBottom: '1px solid #eef2f6' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px auto' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            Group at a Glance
          </div>
          <h2 className="section-title">
            Scale, Precision &amp; Uncompromising Excellence
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            As a multidisciplinary conglomerate, Brand Monk Group powers high-growth enterprises and cultivates next-generation digital leadership on a global scale.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
          }}
        >
          {stats.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '36px 28px',
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden',
              }}
              className="stat-card"
            >
              {/* Top accent line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: '#9e1b23',
                  opacity: 0.8,
                }}
              />

              <div
                style={{
                  backgroundColor: '#ffffff',
                  width: '56px',
                  height: '56px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #edf2f7',
                }}
              >
                {item.icon}
              </div>

              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  lineHeight: 1,
                  marginBottom: '10px',
                  letterSpacing: '-0.03em',
                }}
              >
                {item.number}
              </div>

              <div
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: '#9e1b23',
                  marginBottom: '8px',
                }}
              >
                {item.title}
              </div>

              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.55 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 35px -10px rgba(158, 27, 35, 0.12);
          border-color: rgba(158, 27, 35, 0.3);
        }
      `}</style>
    </section>
  );
}
