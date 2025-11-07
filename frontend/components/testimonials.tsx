import { Quote } from 'lucide-react';

export type TestimonialItem = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

type TestimonialsProps = {
  title: string;
  subtitle: string;
  items: TestimonialItem[];
};

export const Testimonials = ({ title, subtitle, items }: TestimonialsProps) => {
  return (
    <section id="testimonials" className="space-y-10 rounded-[32px] border border-border/60 bg-white/85 p-10 shadow-subtle">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-primary">{subtitle}</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.author} className="flex h-full flex-col rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/70 p-8">
            <Quote className="h-10 w-10 text-primary" />
            <p className="mt-6 flex-1 text-lg text-slate-700">{item.quote}</p>
            <div className="mt-6">
              <p className="text-base font-semibold text-slate-900">{item.author}</p>
              <p className="text-sm text-slate-500">
                {item.role} - {item.company}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
