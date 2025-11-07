import type { ComponentType, SVGProps } from 'react';
import { Cpu, Factory, FlaskConical, ShieldCheck, Stethoscope, Truck } from 'lucide-react';

export type CategoryItem = {
  name: string;
  description: string;
  stat: string;
};

type CategoriesProps = {
  title: string;
  subtitle: string;
  description: string;
  items: CategoryItem[];
};

const icons: ComponentType<SVGProps<SVGSVGElement>>[] = [
  Factory,
  ShieldCheck,
  Truck,
  Stethoscope,
  Cpu,
  FlaskConical,
];

export const Categories = ({ title, subtitle, description, items }: CategoriesProps) => {
  return (
    <section id="categories" className="space-y-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">{subtitle}</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">{title}</h2>
        </div>
        <p className="max-w-xl text-sm text-slate-600">{description}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <article
              key={item.name}
              className="rounded-3xl border border-border/70 bg-white/90 p-6 shadow-[0_18px_40px_-24px_rgba(34,197,94,0.5)]"
            >
              <Icon className="h-10 w-10 text-primary" />
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{item.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              <p className="mt-4 text-sm font-semibold text-accent">{item.stat}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};
