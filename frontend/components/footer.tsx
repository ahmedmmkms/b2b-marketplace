import Link from 'next/link';

export type FooterLink = {
  label: string;
  href: string;
  description?: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type FooterContact = {
  title: string;
  description: string;
  email: string;
  phone: string;
};

type FooterProps = {
  brandPrimary: string;
  brandSecondary: string;
  tagline: string;
  columns: FooterColumn[];
  contact: FooterContact;
};

export const Footer = ({
  brandPrimary,
  brandSecondary,
  tagline,
  columns,
  contact,
}: FooterProps) => {
  return (
    <footer id="contact" className="border-t border-border/60 bg-slate-950 text-slate-100">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr,repeat(3,minmax(0,1fr))]">
          <div className="space-y-4">
            <div className="flex flex-col gap-1 text-2xl font-semibold">
              <span>{brandPrimary}</span>
              <span className="text-primary">{brandSecondary}</span>
            </div>
            <p className="text-sm text-slate-300">{tagline}</p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">{contact.title}</p>
              <p className="mt-2 text-sm text-slate-300">{contact.description}</p>
              <div className="mt-4 space-y-1 text-sm">
                <Link href={`mailto:${contact.email}`} className="text-primary hover:underline">
                  {contact.email}
                </Link>
                <p className="font-semibold text-white">{contact.phone}</p>
              </div>
            </div>
          </div>
          {columns.map((column) => (
            <div key={column.title} className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                {column.title}
              </p>
              <ul className="space-y-3 text-sm text-slate-200">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-primary/80">
                      <span className="block font-medium">{link.label}</span>
                      {link.description ? (
                        <span className="text-xs text-slate-400">{link.description}</span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-400">
          (c) {new Date().getFullYear()} {brandPrimary}. {tagline}
        </div>
      </div>
    </footer>
  );
};
