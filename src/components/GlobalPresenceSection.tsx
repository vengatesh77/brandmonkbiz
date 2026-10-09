'use client';

import React from 'react';
import { MapPin, Globe, Building, ArrowUpRight } from 'lucide-react';

export default function GlobalPresenceSection() {
  const locations = [
    { city: 'Bengaluru', country: 'India', role: 'Global Headquarters & Tech Campus', code: 'HQ' },
    { city: 'Mumbai', country: 'India', role: 'Financial & Enterprise Operations', code: 'FIN' },
    { city: 'Hyderabad', country: 'India', role: 'AI & Cloud Engineering Center', code: 'ENG' },
    { city: 'Singapore', country: 'Singapore', role: 'Southeast Asia Regional Hub', code: 'APAC' },
    { city: 'Dubai', country: 'UAE', role: 'MENA Strategic Operations & Ventures', code: 'MENA' },
    { city: 'London', country: 'United Kingdom', role: 'European Enterprise Office', code: 'EMEA' },
    { city: 'San Francisco', country: 'United States', role: 'Ventures & AI Incubator Hub', code: 'USA' },
    { city: 'New York', country: 'United States', role: 'Corporate Client Solutions', code: 'NYC' },
  ];

  return (
    <section id="presence" style={{ backgroundColor: '#ffffff', padding: '100px 0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px auto' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            Global Reach
          </div>
          <h2 className="section-title">
            Operating Across 18+ International Markets
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Headquartered in Bengaluru with regional headquarters and innovation nodes across Asia, the Middle East, Europe, and North America.
          </p>
        </div>

        {/* Global Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
          }}
        >
          {locations.map((loc, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '24px',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              className="location-card"
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span
                    style={{
                      backgroundColor: '#0f172a',
                      color: '#c8963e',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {loc.code}
                  </span>
                  <MapPin style={{ width: '16px', height: '16px', color: '#9e1b23' }} />
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                  {loc.city}
                </h3>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#9e1b23', marginBottom: '10px' }}>
                  {loc.country}
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.45 }}>
                  {loc.role}
                </p>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #edf2f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>Active Hub</span>
                <ArrowUpRight style={{ width: '14px', height: '14px', color: '#64748b' }} />
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .location-card:hover {
          background-color: #ffffff;
          border-color: #9e1b23;
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(158, 27, 35, 0.08);
        }
      `}</style>
    </section>
  );
}
