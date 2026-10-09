'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  Search,
  Globe,
  Menu,
  X,
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Building2,
  Cpu,
  Sparkles,
  Award,
  Users
} from 'lucide-react';

interface HeaderProps {
  onReplayIntro?: () => void;
}

export default function Header({ onReplayIntro }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const businesses = [
    {
      icon: <GraduationCap className="w-5 h-5 text-red-600" />,
      title: 'Brand Monk Academy',
      desc: 'Industry-leading technology finishing school and full-stack accelerator.',
      link: '#businesses'
    },
    {
      icon: <Building2 className="w-5 h-5 text-red-600" />,
      title: 'Enterprise Solutions',
      desc: 'Digital transformation, cloud architecture & bespoke enterprise consulting.',
      link: '#businesses'
    },
    {
      icon: <Cpu className="w-5 h-5 text-red-600" />,
      title: 'AI & Data Labs',
      desc: 'Applied machine intelligence, computer vision and automated workflow systems.',
      link: '#businesses'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-red-600" />,
      title: 'Brand Monk Ventures',
      desc: 'Seed-stage strategic investments in high-growth digital startups.',
      link: '#businesses'
    }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.35s ease',
        backgroundColor: isScrolled ? 'rgba(9, 10, 15, 0.96)' : 'rgba(9, 10, 15, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(255, 255, 255, 0.04)',
      }}
    >
      {/* Top Utility Bar (Aditya Birla Style) */}
      <div
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          fontSize: '0.75rem',
          color: '#94a3b8',
          padding: '6px 0',
          display: isScrolled ? 'none' : 'block',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#cbd5e1' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
              Brand Monk Corporate Group
            </span>
            <span style={{ color: '#64748b' }}>|</span>
            <a href="#about" style={{ transition: 'color 0.2s' }} className="hover-red">Group Legacy</a>
            <a href="#presence" style={{ transition: 'color 0.2s' }} className="hover-red">Global Footprint</a>
            <a href="#sustainability" style={{ transition: 'color 0.2s' }} className="hover-red">ESG & Impact</a>
          </div>

          <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                style={{
                  color: '#e2e8f0',
                  fontSize: '0.72rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
                title="Replay Brand Monk Intro Animation"
              >
                ▶ Replay Intro
              </button>
            )}
            <a href="#media" style={{ transition: 'color 0.2s' }} className="hover-red">Media Room</a>
            <a href="#careers" style={{ transition: 'color 0.2s' }} className="hover-red">Careers</a>
            <a href="#contact" style={{ transition: 'color 0.2s' }} className="hover-red">Contact Us</a>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#cbd5e1' }}>
              <Globe style={{ width: '13px', height: '13px' }} /> Global (EN)
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container" style={{ padding: isScrolled ? '12px 24px' : '16px 24px', transition: 'padding 0.3s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Brand Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative', width: '160px', height: '42px' }}>
              <Image
                src="/images/brandmonk-logo.png"
                alt="Brand Monk Group"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left' }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '28px' }} className="desktop-nav">
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  padding: '8px 0',
                }}
              >
                About Group <ChevronDown style={{ width: '14px', height: '14px', opacity: 0.7 }} />
              </button>
              {activeDropdown === 'about' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-20px',
                    width: '260px',
                    backgroundColor: '#10131d',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 20px 30px rgba(0, 0, 0, 0.5)',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <a href="#about" className="dropdown-link" onClick={() => setActiveDropdown(null)}>Overview & Vision</a>
                  <a href="#leadership" className="dropdown-link" onClick={() => setActiveDropdown(null)}>Leadership & Board</a>
                  <a href="#stats" className="dropdown-link" onClick={() => setActiveDropdown(null)}>Group Milestones</a>
                  <a href="#presence" className="dropdown-link" onClick={() => setActiveDropdown(null)}>Global Operations</a>
                </div>
              )}
            </div>

            {/* Businesses Mega Menu Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveDropdown('businesses')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  padding: '8px 0',
                }}
              >
                Our Businesses <ChevronDown style={{ width: '14px', height: '14px', opacity: 0.7 }} />
              </button>
              {activeDropdown === 'businesses' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-140px',
                    width: '560px',
                    backgroundColor: '#10131d',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 25px 40px rgba(0, 0, 0, 0.6)',
                    padding: '20px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '16px',
                  }}
                >
                  {businesses.map((biz, idx) => (
                    <a
                      key={idx}
                      href={biz.link}
                      onClick={() => setActiveDropdown(null)}
                      style={{
                        padding: '12px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        transition: 'all 0.2s',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start',
                      }}
                      className="biz-card-hover"
                    >
                      <div style={{ padding: '6px', background: 'rgba(158, 27, 35, 0.15)', borderRadius: '6px' }}>
                        {biz.icon}
                      </div>
                      <div>
                        <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.9rem', marginBottom: '2px' }}>
                          {biz.title}
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '0.75rem', lineHeight: 1.4 }}>
                          {biz.desc}
                        </div>
                      </div>
                    </a>
                  ))}
                  <div
                    style={{
                      gridColumn: 'span 2',
                      paddingTop: '10px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Over 12+ subsidiaries and enterprise ventures</span>
                    <a href="#businesses" style={{ color: '#c8963e', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      All Sectors <ArrowRight style={{ width: '13px', height: '13px' }} />
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href="#impact-story" style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: 500 }} className="hover-red">
              Academy & Talent
            </a>

            <a href="#sustainability" style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: 500 }} className="hover-red">
              Sustainability (ESG)
            </a>

            <a href="#media" style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: 500 }} className="hover-red">
              Stories & News
            </a>

            <a href="#contact" style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: 500 }} className="hover-red">
              Contact
            </a>
          </nav>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{
                color: '#cbd5e1',
                padding: '8px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              aria-label="Search site"
            >
              <Search style={{ width: '17px', height: '17px' }} />
            </button>

            <a
              href="#businesses"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#9e1b23',
                color: '#ffffff',
                padding: '9px 18px',
                borderRadius: '4px',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                boxShadow: '0 4px 12px rgba(158, 27, 35, 0.35)',
              }}
              className="desktop-cta"
            >
              Explore Group
              <ArrowRight style={{ width: '14px', height: '14px' }} />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                padding: '6px',
              }}
              className="mobile-menu-btn"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X style={{ width: '24px', height: '24px' }} /> : <Menu style={{ width: '24px', height: '24px' }} />}
            </button>
          </div>

        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div
          style={{
            backgroundColor: '#121520',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '16px 0',
          }}
        >
          <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Search style={{ width: '20px', height: '20px', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search Brand Monk businesses, reports, academy programs, press releases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontSize: '0.95rem',
              }}
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              style={{ color: '#94a3b8', fontSize: '0.8rem', padding: '4px 10px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px' }}
            >
              ESC
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#0c0e14',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '24px 20px',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, padding: '8px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}
            >
              About Brand Monk Group
            </a>
            <a
              href="#businesses"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, padding: '8px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}
            >
              Our Businesses & Verticals
            </a>
            <a
              href="#impact-story"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, padding: '8px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}
            >
              Academy Convocation & Talent
            </a>
            <a
              href="#sustainability"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, padding: '8px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}
            >
              Sustainability & ESG
            </a>
            <a
              href="#media"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, padding: '8px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}
            >
              News & Stories
            </a>
            <a
              href="#presence"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, padding: '8px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}
            >
              Global Presence
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, padding: '8px 0' }}
            >
              Contact Group
            </a>

            {onReplayIntro && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReplayIntro();
                }}
                style={{
                  marginTop: '10px',
                  backgroundColor: 'rgba(158, 27, 35, 0.2)',
                  color: '#ffffff',
                  border: '1px solid #9e1b23',
                  padding: '12px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                ▶ Replay Brand Monk Intro Animation
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-cta {
            display: inline-flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        .hover-red:hover {
          color: #c8963e !important;
        }
        .dropdown-link {
          color: #cbd5e1;
          font-size: 0.85rem;
          padding: 8px 12px;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .dropdown-link:hover {
          color: #ffffff;
          background-color: rgba(158, 27, 35, 0.2);
        }
        .biz-card-hover:hover {
          background-color: rgba(255, 255, 255, 0.07) !important;
          border-color: rgba(158, 27, 35, 0.4) !important;
        }
      `}</style>
    </header>
  );
}
