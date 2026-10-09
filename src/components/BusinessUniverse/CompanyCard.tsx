'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Company } from '@/data/companies';

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const prevIdRef = useRef<string>(company.id);
  prevIdRef.current = company.id;

  return (
    <div className="w-full max-w-[580px] min-w-0 text-[#0f1424] flex flex-col">
      {/* 64px x 3px Accent Line matching reference */}
      <div className="w-16 h-[3px] bg-[#9e1b23] mb-4 rounded-full" />

      {/* IMAGE: Fixed-size container with overlapping crossfade layers */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.08)] bg-slate-100">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={company.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={company.image}
              alt={company.name}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-center"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* TEXT CONTENT: Smooth crossfade/slide */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={company.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col w-full mt-5"
        >
          {/* Category & Location Row */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <span className="text-[13px] font-bold tracking-[0.2em] uppercase text-[#9e1b23]">
              {company.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[14px] text-slate-500 font-medium">
              <MapPin className="w-4 h-4 text-[#9e1b23]" />
              {company.location}
            </span>
          </div>

          {/* Company Title */}
          <h3 className="text-[32px] md:text-[38px] font-bold text-[#0f1424] leading-[1.18] tracking-[-0.02em] mt-2 mb-0">
            {company.name}
          </h3>

          {/* Description */}
          <p className="text-[15px] md:text-[16px] text-slate-500 leading-[1.65] font-normal mt-3 mb-0 min-h-[4.8em]">
            {company.description}
          </p>

          {/* Action Button */}
          <div className="flex items-center gap-7 mt-7 flex-wrap">
            <a
              href={company.websiteUrl || '#contact'}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ffffff' }}
              className="inline-flex items-center justify-center px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.08em] bg-[#9e1b23] hover:bg-[#83141b] rounded-[8px] transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 no-underline cursor-pointer"
            >
              OFFICIAL WEBSITE <ArrowUpRight className="w-4 h-4 ml-1 text-white" />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
