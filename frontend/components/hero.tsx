'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Search, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export type HeroStat = {
  value: string;
  label: string;
};

export type HeroContent = {
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  search: string;
  searchLabel: string;
  searchButton: string;
  badge: string;
  highlights: string[];
  stats: HeroStat[];
  mockup: {
    latestLabel: string;
    latestValue: string;
    statusLabel: string;
    statusValue: string;
    activationTitle: string;
    activationSubtitle: string;
    activationMetric: string;
    compliance: string;
  };
};

type HeroProps = {
  content: HeroContent;
};

export const Hero = ({ content }: HeroProps) => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-white via-sky-50 to-emerald-50 px-6 py-16 shadow-subtle"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-8">
          <span className="text-sm font-semibold uppercase tracking-[0.4em] text-primary">
            {content.badge}
          </span>
          <div className="space-y-4">
            <h1 className="font-heading text-4xl leading-tight text-slate-900 sm:text-5xl">
              {content.title}
            </h1>
            <p className="text-lg text-slate-600 sm:text-xl">{content.subtitle}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="#pricing">
                {content.primaryCta}
                <ArrowUpRight className="ms-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#buyers">{content.secondaryCta}</Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur">
            <p className="mb-3 text-sm font-semibold text-slate-600">{content.searchLabel}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute inset-y-0 start-3 my-auto h-4 w-4 text-slate-400" />
                <Input
                  placeholder={content.search}
                  className="h-12 rounded-full border-slate-200 bg-white/90 ps-9 text-base"
                />
              </div>
              <Button className="h-12 rounded-full px-6">{content.searchButton}</Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
              {content.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-slate-500"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -top-6 end-8 rounded-2xl bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 shadow-lg backdrop-blur">
            <ShieldCheck className="me-2 inline-flex h-4 w-4 text-accent" />
            {content.mockup.compliance}
          </div>
          <div className="rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-[0_22px_60px_-20px_rgba(42,123,228,0.25)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">{content.mockup.latestLabel}</p>
                <p className="text-lg font-semibold text-slate-900">{content.mockup.latestValue}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">{content.mockup.statusLabel}</p>
                <span className="mt-1 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-accent">
                  {content.mockup.statusValue}
                </span>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {content.stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl border border-slate-100 bg-gradient-to-r from-white to-slate-50/70 p-4"
                >
                  <p className="text-xs uppercase tracking-widest text-slate-400">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-8 start-0 hidden rounded-2xl border border-white/50 bg-white/70 p-4 text-sm text-slate-600 shadow-lg backdrop-blur md:flex">
            <div>
              <p className="font-semibold text-slate-900">{content.mockup.activationTitle}</p>
              <p className="text-xs text-slate-500">{content.mockup.activationSubtitle}</p>
            </div>
            <span className="ms-6 text-4xl font-bold text-primary">{content.mockup.activationMetric}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
