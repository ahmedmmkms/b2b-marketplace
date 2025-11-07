'use strict';
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [18],
  {
    7914: function (e, r, t) {
      t.d(r, {
        AppShell: function () {
          return q;
        },
      });
      var a = t(6501),
        n = t(1894),
        l = t(8422),
        s = t(8090),
        o = t(7210);
      let {
        Link: i,
        redirect: d,
        useRouter: u,
        usePathname: c,
      } = (0, s.Z)({
        locales: o.k1,
        localePrefix: 'as-needed',
        defaultLocale: o.al,
        pathnames: {
          '/': '/',
          '/catalog': '/catalog',
          '/product/[id]': '/product/[id]',
          '/rfq': '/rfq',
          '/rfq/new': '/rfq/new',
          '/quotes': '/quotes',
          '/orders': '/orders',
          '/orders/[orderId]': '/orders/[orderId]',
          '/supplier/quotes/inbox': '/supplier/quotes/inbox',
          '/wallet': '/wallet',
          '/admin/dashboard': '/admin/dashboard',
          '/admin/users': '/admin/users',
          '/admin/feature-flags': '/admin/feature-flags',
          '/auth/signin': '/auth/signin',
          '/auth/register': '/auth/register',
        },
      });
      var f = t(9056);
      let m = { en: 'English', ar: 'العربية' },
        b = () => {
          let e = (0, f.bU)(),
            r = u(),
            t = c(),
            [, n] = (0, l.useTransition)(),
            s = (a) => {
              a !== e &&
                n(() => {
                  r.replace(t, { locale: a });
                });
            };
          return (0, a.jsx)('select', {
            className:
              'rounded-md border border-input bg-background px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            value: e,
            onChange: (e) => s(e.target.value),
            'aria-label': 'Change language',
            children: Object.entries(m).map((e) => {
              let [r, t] = e;
              return (0, a.jsx)('option', { value: r, children: t }, r);
            }),
          });
        };
      var x = t(5611),
        g = t(2120),
        h = t(9964),
        p = t(7077);
      let v = () => {
        let { user: e, setUser: r, clear: t, isAuthenticated: a } = (0, h.t)(),
          n = a(),
          s = (0, p.Pi)({ query: { enabled: n } });
        return (
          (0, l.useEffect)(() => {
            n || t();
          }, [n, t]),
          (0, l.useEffect)(() => {
            s.data && r(s.data);
          }, [s.data, r]),
          (0, l.useEffect)(() => {
            s.isError && t();
          }, [s.isError, t]),
          {
            user: null != e ? e : s.data,
            isAuthenticated: n,
            isLoading: s.isLoading,
            refetch: s.refetch,
          }
        );
      };
      var y = t(2253);
      let j = [
          { href: '/catalog', labelKey: 'nav.catalog', featureFlag: 'catalog.publicBrowse' },
          { href: '/rfq', labelKey: 'nav.rfq', featureFlag: 'rfq.enabled' },
          { href: '/quotes', labelKey: 'nav.quotes' },
          { href: '/orders', labelKey: 'nav.orders' },
          { href: '/wallet', labelKey: 'nav.wallet', featureFlag: 'wallet.basic' },
        ],
        N = [
          { href: '/supplier/quotes/inbox', labelKey: 'nav.supplierInbox', roles: ['supplier'] },
        ],
        w = [
          { href: '/admin/dashboard', labelKey: 'nav.dashboard', roles: ['admin'] },
          { href: '/admin/users', labelKey: 'nav.users', roles: ['admin'] },
          { href: '/admin/feature-flags', labelKey: 'nav.featureFlags', roles: ['admin'] },
        ],
        k = (e, r, t) => {
          var a;
          return (
            (null === (a = e.roles) ||
              void 0 === a ||
              !a.length ||
              !!e.roles.some((e) => r.includes(e))) &&
            (!e.featureFlag || !!t(e.featureFlag))
          );
        },
        q = (e) => {
          let { children: r, sidebar: t = !0 } = e,
            s = (0, n.T_)(),
            o = c(),
            { user: d, isAuthenticated: u } = v(),
            f = (0, h.t)((e) => e.clear),
            [m, p] = (0, l.useState)(!1),
            q = (null == d ? void 0 : d.role) ? [d.role] : [],
            K = [
              ...j,
              ...N,
              ...w,
              ...(u
                ? []
                : [
                    { href: '/auth/signin', labelKey: 'nav.signin' },
                    { href: '/auth/register', labelKey: 'nav.register' },
                  ]),
            ];
          return (
            (0, l.useEffect)(() => {
              p(!1);
            }, [o]),
            (0, a.jsxs)('div', {
              className: 'flex min-h-screen bg-background text-foreground',
              children: [
                t
                  ? (0, a.jsxs)('aside', {
                      className: (0, g.cn)(
                        'fixed inset-y-0 z-40 w-64 border-e border-border bg-card px-4 py-6 shadow-lg transition-transform md:static md:translate-x-0',
                        m ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
                      ),
                      children: [
                        (0, a.jsxs)('div', {
                          className: 'flex items-center justify-between',
                          children: [
                            (0, a.jsx)(i, {
                              href: '/',
                              className: 'text-lg font-semibold text-primary',
                              children: s('common.brand'),
                            }),
                            (0, a.jsx)('button', {
                              type: 'button',
                              className:
                                'rounded-md border border-border px-2 py-1 text-sm md:hidden',
                              onClick: () => p(!1),
                              'aria-label': 'Close navigation',
                              children: 'X',
                            }),
                          ],
                        }),
                        (0, a.jsx)('nav', {
                          className: 'mt-6 flex flex-col gap-1',
                          children: K.filter((e) => k(e, q, (e) => !e || (0, y.c)(e, !0))).map(
                            (e) => {
                              let r = o === e.href || o.endsWith(e.href);
                              return (0, a.jsx)(
                                i,
                                {
                                  href: e.href,
                                  className: (0, g.cn)(
                                    'hover:bg-primary/10 block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    r ? 'bg-primary text-primary-foreground' : 'text-foreground',
                                  ),
                                  children: s(e.labelKey),
                                },
                                e.href,
                              );
                            },
                          ),
                        }),
                      ],
                    })
                  : null,
                (0, a.jsxs)('div', {
                  className: 'flex flex-1 flex-col',
                  children: [
                    (0, a.jsxs)('header', {
                      className:
                        'flex h-16 items-center justify-between border-b border-border bg-card px-6 shadow-sm',
                      children: [
                        (0, a.jsxs)('div', {
                          className: 'flex items-center gap-3',
                          children: [
                            t
                              ? (0, a.jsx)('button', {
                                  type: 'button',
                                  className:
                                    'rounded-md border border-border px-2 py-1 text-sm md:hidden',
                                  onClick: () => p((e) => !e),
                                  'aria-label': 'Toggle navigation',
                                  children: 'Menu',
                                })
                              : null,
                            (0, a.jsx)('span', {
                              className: 'text-lg font-semibold text-primary',
                              children: s('common.brand'),
                            }),
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          className: 'flex items-center gap-4',
                          children: [
                            (0, a.jsx)(b, {}),
                            u
                              ? (0, a.jsx)(x.Button, {
                                  variant: 'outline',
                                  size: 'sm',
                                  onClick: () => f(),
                                  children: s('common.actions.signOut'),
                                })
                              : (0, a.jsx)(i, {
                                  href: '/auth/signin',
                                  children: (0, a.jsx)(x.Button, {
                                    size: 'sm',
                                    children: s('common.actions.signIn'),
                                  }),
                                }),
                          ],
                        }),
                      ],
                    }),
                    (0, a.jsx)('main', { className: 'flex-1 bg-background', children: r }),
                  ],
                }),
              ],
            })
          );
        };
    },
    9683: function (e, r, t) {
      t.d(r, {
        m: function () {
          return o;
        },
      });
      var a = t(6501),
        n = t(5105),
        l = t(2120);
      let s = (e) => {
          let { items: r, className: t } = e;
          return (null == r ? void 0 : r.length)
            ? (0, a.jsx)('nav', {
                'aria-label': 'Breadcrumb',
                className: (0, l.cn)('text-muted-foreground text-xs uppercase tracking-wide', t),
                children: (0, a.jsx)('ol', {
                  className: 'flex flex-wrap items-center gap-1',
                  children: r.map((e, t) => {
                    let l = t === r.length - 1;
                    return (0, a.jsxs)(
                      'li',
                      {
                        className: 'flex items-center gap-1',
                        children: [
                          e.href && !l
                            ? (0, a.jsx)(n.default, {
                                href: e.href,
                                className: 'hover:text-foreground',
                                children: e.label,
                              })
                            : (0, a.jsx)('span', {
                                className: l ? 'text-foreground' : void 0,
                                children: e.label,
                              }),
                          l ? null : (0, a.jsx)('span', { className: 'opacity-60', children: '/' }),
                        ],
                      },
                      e.label,
                    );
                  }),
                }),
              })
            : null;
        },
        o = (e) => {
          let { title: r, description: t, breadcrumbs: n, actions: o, className: i } = e;
          return (0, a.jsxs)('div', {
            className: (0, l.cn)(
              'flex flex-col gap-4 border-b border-border bg-card px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between',
              i,
            ),
            children: [
              (0, a.jsxs)('div', {
                className: 'space-y-2',
                children: [
                  n ? (0, a.jsx)(s, { items: n }) : null,
                  (0, a.jsxs)('div', {
                    children: [
                      (0, a.jsx)('h1', {
                        className: 'text-2xl font-semibold tracking-tight text-foreground',
                        children: r,
                      }),
                      t
                        ? (0, a.jsx)('p', {
                            className: 'text-muted-foreground mt-1 text-sm',
                            children: t,
                          })
                        : null,
                    ],
                  }),
                ],
              }),
              o ? (0, a.jsx)('div', { className: 'flex items-center gap-2', children: o }) : null,
            ],
          });
        };
    },
    5611: function (e, r, t) {
      t.d(r, {
        Button: function () {
          return d;
        },
      });
      var a = t(6501),
        n = t(8422),
        l = t(2619),
        s = t(7561),
        o = t(2120);
      let i = (0, s.j)(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background',
          {
            variants: {
              variant: {
                default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
                secondary: 'bg-accent text-accent-foreground hover:bg-accent/90',
                ghost: 'hover:bg-muted hover:text-foreground',
                destructive: 'bg-danger text-white hover:bg-danger/90',
                outline: 'border border-input bg-background hover:bg-muted hover:text-foreground',
                subtle: 'bg-card text-card-foreground hover:bg-muted',
              },
              size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
              },
            },
            defaultVariants: { variant: 'default', size: 'default' },
          },
        ),
        d = n.forwardRef((e, r) => {
          let { className: t, variant: n, size: s, asChild: d = !1, ...u } = e,
            c = d ? l.g7 : 'button';
          return (0, a.jsx)(c, {
            className: (0, o.cn)(i({ variant: n, size: s, className: t })),
            ref: r,
            ...u,
          });
        });
      d.displayName = 'Button';
    },
    8957: function (e, r, t) {
      t.d(r, {
        I: function () {
          return s;
        },
      });
      var a = t(6501),
        n = t(8422),
        l = t(2120);
      let s = n.forwardRef((e, r) => {
        let { className: t, type: n = 'text', ...s } = e;
        return (0, a.jsx)('input', {
          type: n,
          className: (0, l.cn)(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            t,
          ),
          ref: r,
          ...s,
        });
      });
      s.displayName = 'Input';
    },
    6771: function (e, r, t) {
      t.d(r, {
        RM: function () {
          return i;
        },
        SC: function () {
          return d;
        },
        iA: function () {
          return s;
        },
        pj: function () {
          return c;
        },
        ss: function () {
          return u;
        },
        xD: function () {
          return o;
        },
      });
      var a = t(6501),
        n = t(8422),
        l = t(2120);
      let s = n.forwardRef((e, r) => {
        let { className: t, ...n } = e;
        return (0, a.jsx)('div', {
          className: 'relative w-full overflow-auto',
          children: (0, a.jsx)('table', {
            ref: r,
            className: (0, l.cn)('w-full caption-bottom text-sm', t),
            ...n,
          }),
        });
      });
      s.displayName = 'Table';
      let o = n.forwardRef((e, r) => {
        let { className: t, ...n } = e;
        return (0, a.jsx)('thead', { ref: r, className: (0, l.cn)('[&_tr]:border-b', t), ...n });
      });
      o.displayName = 'TableHeader';
      let i = n.forwardRef((e, r) => {
        let { className: t, ...n } = e;
        return (0, a.jsx)('tbody', {
          ref: r,
          className: (0, l.cn)('[&_tr:last-child]:border-0', t),
          ...n,
        });
      });
      ((i.displayName = 'TableBody'),
        (n.forwardRef((e, r) => {
          let { className: t, ...n } = e;
          return (0, a.jsx)('tfoot', {
            ref: r,
            className: (0, l.cn)('bg-muted/50 font-medium text-foreground', t),
            ...n,
          });
        }).displayName = 'TableFooter'));
      let d = n.forwardRef((e, r) => {
        let { className: t, ...n } = e;
        return (0, a.jsx)('tr', {
          ref: r,
          className: (0, l.cn)(
            'hover:bg-muted/50 border-b transition-colors data-[state=selected]:bg-muted',
            t,
          ),
          ...n,
        });
      });
      d.displayName = 'TableRow';
      let u = n.forwardRef((e, r) => {
        let { className: t, ...n } = e;
        return (0, a.jsx)('th', {
          ref: r,
          className: (0, l.cn)(
            'text-muted-foreground h-12 px-4 text-left align-middle text-xs font-medium uppercase tracking-wide [&:has([role=checkbox])]:pr-0',
            t,
          ),
          ...n,
        });
      });
      u.displayName = 'TableHead';
      let c = n.forwardRef((e, r) => {
        let { className: t, ...n } = e;
        return (0, a.jsx)('td', {
          ref: r,
          className: (0, l.cn)('p-4 align-middle [&:has([role=checkbox])]:pr-0', t),
          ...n,
        });
      });
      ((c.displayName = 'TableCell'),
        (n.forwardRef((e, r) => {
          let { className: t, ...n } = e;
          return (0, a.jsx)('caption', {
            ref: r,
            className: (0, l.cn)('text-muted-foreground mt-4 text-sm', t),
            ...n,
          });
        }).displayName = 'TableCaption'));
    },
    2120: function (e, r, t) {
      t.d(r, {
        cn: function () {
          return l;
        },
      });
      var a = t(9007),
        n = t(2786);
      let l = function () {
        for (var e = arguments.length, r = Array(e), t = 0; t < e; t++) r[t] = arguments[t];
        return (0, n.m6)((0, a.W)(r));
      };
    },
  },
]);
