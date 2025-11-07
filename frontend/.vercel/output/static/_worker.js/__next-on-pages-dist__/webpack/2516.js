var d = {},
  g = (h, u, p) => (
    (d.__chunk_2516 = (f, i, r) => {
      'use strict';
      r.d(i, { m: () => o });
      var e = r(3408),
        m = r(1261),
        n = r(164);
      let x = ({ items: l, className: a }) =>
          l?.length
            ? (0, e.jsx)('nav', {
                'aria-label': 'Breadcrumb',
                className: (0, n.cn)('text-muted-foreground text-xs uppercase tracking-wide', a),
                children: (0, e.jsx)('ol', {
                  className: 'flex flex-wrap items-center gap-1',
                  children: l.map((s, c) => {
                    let t = c === l.length - 1;
                    return (0, e.jsxs)(
                      'li',
                      {
                        className: 'flex items-center gap-1',
                        children: [
                          s.href && !t
                            ? (0, e.jsx)(m.Z, {
                                href: s.href,
                                className: 'hover:text-foreground',
                                children: s.label,
                              })
                            : (0, e.jsx)('span', {
                                className: t ? 'text-foreground' : void 0,
                                children: s.label,
                              }),
                          t ? null : (0, e.jsx)('span', { className: 'opacity-60', children: '/' }),
                        ],
                      },
                      s.label,
                    );
                  }),
                }),
              })
            : null,
        o = ({ title: l, description: a, breadcrumbs: s, actions: c, className: t }) =>
          (0, e.jsxs)('div', {
            className: (0, n.cn)(
              'flex flex-col gap-4 border-b border-border bg-card px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between',
              t,
            ),
            children: [
              (0, e.jsxs)('div', {
                className: 'space-y-2',
                children: [
                  s ? (0, e.jsx)(x, { items: s }) : null,
                  (0, e.jsxs)('div', {
                    children: [
                      (0, e.jsx)('h1', {
                        className: 'text-2xl font-semibold tracking-tight text-foreground',
                        children: l,
                      }),
                      a
                        ? (0, e.jsx)('p', {
                            className: 'text-muted-foreground mt-1 text-sm',
                            children: a,
                          })
                        : null,
                    ],
                  }),
                ],
              }),
              c ? (0, e.jsx)('div', { className: 'flex items-center gap-2', children: c }) : null,
            ],
          });
    }),
    d
  );
export { g as __getNamedExports };
