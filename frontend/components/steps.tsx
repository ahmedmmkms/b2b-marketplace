export type StepItem = {
  title: string;
  description: string;
  badge: string;
};

type StepsProps = {
  title: string;
  subtitle: string;
  items: StepItem[];
};

export const Steps = ({ title, subtitle, items }: StepsProps) => {
  return (
    <section id="steps" className="space-y-10 rounded-[32px] border border-border/60 bg-white/80 p-10 shadow-subtle">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">{subtitle}</p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, index) => (
          <div key={item.title} className="group rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 transition hover:-translate-y-1 hover:border-primary/50 hover:bg-white">
            <div className="mb-4 flex items-center gap-3 text-sm font-semibold text-primary">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                {index + 1}
              </span>
              {item.badge}
            </div>
            <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
