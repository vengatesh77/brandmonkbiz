'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Company } from '@/data/companies';
import styles from './companies.module.css';

interface CompanyInfoPanelProps {
  company: Company & {
    tags?: string[];
    profileHref?: string;
    websiteHref?: string;
  };
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
  );
}

export default function CompanyInfoPanel({ company }: CompanyInfoPanelProps) {
  const websiteHref = company.websiteHref || company.websiteUrl || '#contact';

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={company.name}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={styles.panel}
      >
        <span className={styles.bar} />

        <div className={styles.image}>
          <Image
            src={company.image}
            alt={company.name}
            fill
            sizes="(min-width:1024px) 40vw, 100vw"
            className="object-cover object-center"
            priority
            quality={100}
          />
        </div>

        <div className={styles.meta}>
          <span className={styles.category}>{company.category}</span>
          <span className={styles.location}>
            <PinIcon className="h-4 w-4 text-[#a31621]" />
            {company.location}
          </span>
        </div>

        <h3 className={styles.name}>{company.name}</h3>

        <p className={styles.desc}>{company.description}</p>

        <div className={styles.actions}>
          <a
            href={websiteHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primary}
          >
            Official Website
            <ArrowUpRightIcon className="h-4 w-4 ml-1" />
          </a>
        </div>
      </motion.article>
    </AnimatePresence>
  );
}
