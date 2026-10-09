'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import styles from './contact.module.css';

const COMPANY_OPTIONS = [
  'Consulting',
  'Artificial Intelligence',
  'Education',
  'Food & Beverages',
];

function CompanyDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className={`${styles.customSelectWrap} ${open ? styles.customSelectOpen : ''}`}
    >
      {/* Trigger — underline only */}
      <button
        type="button"
        className={styles.customSelectTrigger}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={value ? styles.customSelectValue : styles.customSelectPlaceholder}>
          {value || 'Company'}
        </span>
        <ChevronDown
          className={`${styles.customSelectChevron} ${open ? styles.customSelectChevronOpen : ''}`}
        />
      </button>

      {/* Animated options panel */}
      <ul
        role="listbox"
        className={`${styles.customSelectMenu} ${open ? styles.customSelectMenuOpen : ''}`}
      >
        {COMPANY_OPTIONS.map((opt, i) => (
          <li
            key={opt}
            role="option"
            aria-selected={value === opt}
            className={`${styles.customSelectOption} ${value === opt ? styles.customSelectOptionActive : ''}`}
            style={{ '--i': i } as React.CSSProperties}
            onMouseDown={() => {
              onChange(opt);
              setOpen(false);
            }}
          >
            {opt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    company: '',
    phone: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        {/* Main 2-column Grid */}
        <div className={styles.grid}>
          {/* ════════════════════════════════════════════
              LEFT COLUMN: FORM
          ════════════════════════════════════════════ */}
          <div className={styles.formSide}>
            <span className={styles.tag}>GET IN TOUCH</span>
            <h2 className={styles.mainTitle}>START A CONVERSATION.</h2>

            {submitted ? (
              <div style={{ marginTop: '40px', padding: '32px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#0f1424' }}>
                  Thank you for reaching out!
                </h3>
                <p style={{ margin: '8px 0 0 0', color: '#475569', fontSize: '1rem' }}>
                  Our corporate advisory team will connect with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.fieldsGrid}>
                  {/* First Name */}
                  <div className={styles.inputWrap}>
                    <input
                      type="text"
                      required
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className={styles.input}
                    />
                  </div>

                  {/* Custom animated Company dropdown */}
                  <CompanyDropdown
                    value={formData.company}
                    onChange={(v) => setFormData({ ...formData, company: v })}
                  />

                  {/* Phone */}
                  <div className={styles.inputWrap}>
                    <input
                      type="tel"
                      required
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={styles.input}
                    />
                  </div>

                  {/* Email */}
                  <div className={styles.inputWrap}>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={styles.input}
                    />
                  </div>
                </div>

                {/* Submit Pill Button */}
                <button type="submit" className={styles.chatBtn}>
                  <span>LET&apos;S CHAT</span>
                  <ArrowRight style={{ width: '16px', height: '16px' }} />
                </button>
              </form>
            )}
          </div>

          {/* ════════════════════════════════════════════
              RIGHT COLUMN: OFFICE INFO
          ════════════════════════════════════════════ */}
          <div className={styles.infoSide}>
            <h2 className={styles.infoTitle}>
              LET&apos;S CREATE
              <br />
              NEW FUTURES TOGETHER.
            </h2>

            <div className={styles.divider} />

            <div className={styles.addressBlock}>
              <span className={styles.companyHeading}>BrandMonk Group</span>
              <span>3rd Floor, Door No. 24, East Venkatasamy Road</span>
              <span>R.S. Puram, Coimbatore — 641002</span>
              <span>Tamil Nadu, India</span>
            </div>

            <a href="mailto:hello@brandmonk.in" className={styles.emailLink}>
              hello@brandmonk.in
            </a>

            <div className={styles.hours}>
              Mon–Sat · 9:00 AM – 6:30 PM IST
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            BOTTOM FOOTER STRIP
        ════════════════════════════════════════════ */}
        <div className={styles.footerStrip}>
          <div>
            © {new Date().getFullYear()} BRANDMONK GROUP. ALL RIGHTS RESERVED. MADE IN INDIA.
          </div>
          <div>
            <Link href="/#top" className={styles.backHomeLink}>
              BACK TO HOME
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
