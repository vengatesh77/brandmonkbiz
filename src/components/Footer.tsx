'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Globe,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Award,
  Play,
  Check,
  Share2
} from 'lucide-react';

interface FooterProps {
  onReplayIntro?: () => void;
}

export default function Footer({ onReplayIntro }: FooterProps) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="contact" style={{ backgroundColor: '#07080c', color: '#cbd5e1', borderTop: '2px solid #9e1b23' }}>
      
      {/* Top Corporate Connect Strip */}
      <div style={{ backgroundColor: '#0e111a', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', padding: '36px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 700, marginBottom: '4px' }}>
              Subscribe to Brand Monk Group Global Insights
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              Receive quarterly executive reports, academy research, and corporate announcements.
            </p>
          </div>

          {subscribed ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e', fontWeight: 600, fontSize: '0.9rem' }}>
              <Check style={{ width: '18px', height: '18px' }} />
              Thank you for subscribing to Brand Monk Group Executive Dispatch.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px', maxWidth: '420px', width: '100%' }}>
              <input
                type="email"
                placeholder="Enter corporate email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '12px 16px',
                  borderRadius: '4px',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#9e1b23',
                  color: '#ffffff',
                  padding: '12px 20px',
                  borderRadius: '4px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  transition: 'background 0.2s',
                }}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Links Columns */}
      <div className="container" style={{ padding: '80px 24px 60px 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          
          {/* Brand Col */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ position: 'relative', width: '180px', height: '50px', marginBottom: '20px' }}>
              <Image
                src="/images/brandmonk-logo.png"
                alt="Brand Monk"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left' }}
              />
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#94a3b8', marginBottom: '24px' }}>
              A global corporate group empowering industry leadership across enterprise digital solutions, advanced software academies, and venture innovation.
            </p>

            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  color: '#e2e8f0',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '8px 14px',
                  borderRadius: '4px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                }}
                className="replay-btn"
              >
                <Play style={{ width: '13px', height: '13px', color: '#c8963e' }} />
                Replay Brand Monk Intro
              </button>
            )}
          </div>

          {/* Col 1: About Group */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
              About Group
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <li><a href="#about" className="footer-link">Chairman&apos;s Message</a></li>
              <li><a href="#about" className="footer-link">Group Vision &amp; Values</a></li>
              <li><a href="#stats" className="footer-link">Leadership &amp; Governance</a></li>
              <li><a href="#presence" className="footer-link">Global Operating Footprint</a></li>
              <li><a href="#about" className="footer-link">Corporate History &amp; Legacy</a></li>
            </ul>
          </div>

          {/* Col 2: Our Businesses */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
              Our Businesses
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <li><a href="#businesses" className="footer-link">Brand Monk Academy</a></li>
              <li><a href="#businesses" className="footer-link">Enterprise Cloud Solutions</a></li>
              <li><a href="#businesses" className="footer-link">AI &amp; Data Engineering Labs</a></li>
              <li><a href="#businesses" className="footer-link">Strategic Ventures &amp; Incubator</a></li>
              <li><a href="#impact-story" className="footer-link">Talent Certification Pipelines</a></li>
            </ul>
          </div>

          {/* Col 3: Sustainability */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
              Sustainability &amp; ESG
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <li><a href="#sustainability" className="footer-link">ESG Strategic Charter</a></li>
              <li><a href="#sustainability" className="footer-link">Brand Monk Foundation</a></li>
              <li><a href="#sustainability" className="footer-link">Green Digital Cloud Roadmap</a></li>
              <li><a href="#sustainability" className="footer-link">Diversity &amp; Inclusion</a></li>
              <li><a href="#sustainability" className="footer-link">Annual ESG Disclosures</a></li>
            </ul>
          </div>

          {/* Col 4: Media & Careers */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
              Media &amp; Connect
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <li><a href="#media" className="footer-link">Press Releases &amp; News</a></li>
              <li><a href="#impact-story" className="footer-link">Convocation Gallery</a></li>
              <li><a href="#contact" className="footer-link">Corporate Brand Assets</a></li>
              <li><a href="#contact" className="footer-link">Global Careers Portal</a></li>
              <li><a href="#contact" className="footer-link">Corporate Headquarters</a></li>
            </ul>
          </div>

        </div>

        {/* Global Addresses & Certifications Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '32px',
            marginBottom: '36px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            fontSize: '0.82rem',
            color: '#94a3b8',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <MapPin style={{ width: '16px', height: '16px', color: '#9e1b23', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: '#ffffff' }}>Global World Headquarters:</strong>
              <div>Brand Monk Tech Tower, Outer Ring Road, Bengaluru, Karnataka 560103, India</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <Phone style={{ width: '16px', height: '16px', color: '#9e1b23', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: '#ffffff' }}>Corporate Secretariat &amp; Inquiries:</strong>
              <div>+91 (080) 4900-MONK • corporate@brandmonk.biz</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'flex-start' }}>
            <span style={{ color: '#ffffff', fontWeight: 600 }}>Connect:</span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#cbd5e1', padding: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', display: 'flex', alignItems: 'center' }} aria-label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#cbd5e1', padding: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', display: 'flex', alignItems: 'center' }} aria-label="X Twitter">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: '#cbd5e1', padding: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', display: 'flex', alignItems: 'center' }} aria-label="YouTube">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#cbd5e1', padding: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', display: 'flex', alignItems: 'center' }} aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.78rem',
            color: '#64748b',
          }}
        >
          <div>
            © 2026 Brand Monk Group of Companies. All Rights Reserved. Inspired by world-class corporate conglomerate architecture.
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" className="legal-link">Privacy Policy</a>
            <a href="#" className="legal-link">Terms of Service</a>
            <a href="#" className="legal-link">Corporate Governance</a>
            <a href="#" className="legal-link">Security Disclosures</a>
          </div>
        </div>

      </div>

      <style>{`
        .footer-link {
          color: #94a3b8;
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: #ffffff;
        }
        .legal-link:hover {
          color: #cbd5e1;
        }
        .replay-btn:hover {
          background-color: rgba(255, 255, 255, 0.12) !important;
          border-color: #c8963e !important;
        }
      `}</style>
    </footer>
  );
}
