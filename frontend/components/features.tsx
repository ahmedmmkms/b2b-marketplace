import type { ComponentType, SVGProps } from 'react';
import { Building2, HandshakeIcon } from 'lucide-react';

export type FeatureItem = {
  id: string;
  badge: string;
  title: string;
  description: string;
  bullets: string[];
};

type FeaturesProps = {
  title: string;
  subtitle: string;
  items: FeatureItem[];
};

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  buyers: Building2,
  suppliers: HandshakeIcon,
};

export const Features = ({ title, subtitle, items }: FeaturesProps) => {
  return (
    <section id="features" className="space-y-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">{subtitle}</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        {items.map((item) => {
          const Icon = iconMap[item.id] ?? Building2;
          return (
            <article
              key={item.id}
              id={item.id}
              className="rounded-3xl border border-border/70 bg-white/90 p-8 shadow-[0_15px_40px_-25px_rgba(42,123,228,0.5)]"
            >
              <div className="flex items-center gap-3 text-primary">
                <Icon className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-widest">{item.badge}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-slate-600">{item.description}</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 rounded-2xl border border-dashed border-slate-200/80 bg-slate-50/70 px-4 py-3"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
};
