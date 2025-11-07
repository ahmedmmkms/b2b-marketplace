'use strict';
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [700],
  {
    7914: function (e, r, t) {
      t.d(r, {
        AppShell: function () {
          return C;
        },
      });
      var a = t(6501),
        n = t(1894),
        l = t(8422),
        s = t(8090),
        i = t(7210);
      let {
        Link: d,
        redirect: o,
        useRouter: u,
        usePathname: c,
      } = (0, s.Z)({
        locales: i.k1,
        localePrefix: 'as-needed',
        defaultLocale: i.al,
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
      var g = t(5611),
        x = t(2120),
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
        C = (e) => {
          let { children: r, sidebar: t = !0 } = e,
            s = (0, n.T_)(),
            i = c(),
            { user: o, isAuthenticated: u } = v(),
            f = (0, h.t)((e) => e.clear),
            [m, p] = (0, l.useState)(!1),
            C = (null == o ? void 0 : o.role) ? [o.role] : [],
            q = [
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
            }, [i]),
            (0, a.jsxs)('div', {
              className: 'flex min-h-screen bg-background text-foreground',
              children: [
                t
                  ? (0, a.jsxs)('aside', {
                      className: (0, x.cn)(
                        'fixed inset-y-0 z-40 w-64 border-e border-border bg-card px-4 py-6 shadow-lg transition-transform md:static md:translate-x-0',
                        m ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
                      ),
                      children: [
                        (0, a.jsxs)('div', {
                          className: 'flex items-center justify-between',
                          children: [
                            (0, a.jsx)(d, {
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
                          children: q
                            .filter((e) => k(e, C, (e) => !e || (0, y.c)(e, !0)))
                            .map((e) => {
                              let r = i === e.href || i.endsWith(e.href);
                              return (0, a.jsx)(
                                d,
                                {
                                  href: e.href,
                                  className: (0, x.cn)(
                                    'hover:bg-primary/10 block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    r ? 'bg-primary text-primary-foreground' : 'text-foreground',
                                  ),
                                  children: s(e.labelKey),
                                },
                                e.href,
                              );
                            }),
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
                              ? (0, a.jsx)(g.Button, {
                                  variant: 'outline',
                                  size: 'sm',
                                  onClick: () => f(),
                                  children: s('common.actions.signOut'),
                                })
                              : (0, a.jsx)(d, {
                                  href: '/auth/signin',
                                  children: (0, a.jsx)(g.Button, {
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
          return i;
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
        i = (e) => {
          let { title: r, description: t, breadcrumbs: n, actions: i, className: d } = e;
          return (0, a.jsxs)('div', {
            className: (0, l.cn)(
              'flex flex-col gap-4 border-b border-border bg-card px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between',
              d,
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
              i ? (0, a.jsx)('div', { className: 'flex items-center gap-2', children: i }) : null,
            ],
          });
        };
    },
    5611: function (e, r, t) {
      t.d(r, {
        Button: function () {
          return o;
        },
      });
      var a = t(6501),
        n = t(8422),
        l = t(2619),
        s = t(7561),
        i = t(2120);
      let d = (0, s.j)(
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
        o = n.forwardRef((e, r) => {
          let { className: t, variant: n, size: s, asChild: o = !1, ...u } = e,
            c = o ? l.g7 : 'button';
          return (0, a.jsx)(c, {
            className: (0, i.cn)(d({ variant: n, size: s, className: t })),
            ref: r,
            ...u,
          });
        });
      o.displayName = 'Button';
    },
    560: function (e, r, t) {
      t.d(r, {
        Card: function () {
          return s;
        },
        CardContent: function () {
          return u;
        },
        Ol: function () {
          return i;
        },
        SZ: function () {
          return o;
        },
        ll: function () {
          return d;
        },
      });
      var a = t(6501),
        n = t(8422),
        l = t(2120);
      let s = n.forwardRef((e, r) => {
        let { className: t, ...n } = e;
        return (0, a.jsx)('div', {
          ref: r,
          className: (0, l.cn)(
            'rounded-lg border border-border bg-card text-card-foreground shadow-sm',
            t,
          ),
          ...n,
        });
      });
      s.displayName = 'Card';
      let i = n.forwardRef((e, r) => {
        let { className: t, ...n } = e;
        return (0, a.jsx)('div', {
          ref: r,
          className: (0, l.cn)('flex flex-col gap-1.5 p-6', t),
          ...n,
        });
      });
      i.displayName = 'CardHeader';
      let d = n.forwardRef((e, r) => {
        let { className: t, ...n } = e;
        return (0, a.jsx)('h3', {
          ref: r,
          className: (0, l.cn)('text-lg font-semibold leading-none tracking-tight', t),
          ...n,
        });
      });
      d.displayName = 'CardTitle';
      let o = n.forwardRef((e, r) => {
        let { className: t, ...n } = e;
        return (0, a.jsx)('p', {
          ref: r,
          className: (0, l.cn)('text-muted-foreground text-sm', t),
          ...n,
        });
      });
      o.displayName = 'CardDescription';
      let u = n.forwardRef((e, r) => {
        let { className: t, ...n } = e;
        return (0, a.jsx)('div', { ref: r, className: (0, l.cn)('p-6 pt-0', t), ...n });
      });
      ((u.displayName = 'CardContent'),
        (n.forwardRef((e, r) => {
          let { className: t, ...n } = e;
          return (0, a.jsx)('div', {
            ref: r,
            className: (0, l.cn)('flex items-center p-6 pt-0', t),
            ...n,
          });
        }).displayName = 'CardFooter'));
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
    4734: function (e, r, t) {
      t.d(r, {
        _: function () {
          return i;
        },
      });
      var a = t(6501),
        n = t(8422),
        l = t(3361),
        s = t(2120);
      let i = n.forwardRef((e, r) => {
        let { className: t, ...n } = e;
        return (0, a.jsx)(l.f, {
          ref: r,
          className: (0, s.cn)(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            t,
          ),
          ...n,
        });
      });
      i.displayName = l.f.displayName;
    },
    7960: function (e, r, t) {
      t.d(r, {
        g: function () {
          return s;
        },
      });
      var a = t(6501),
        n = t(8422),
        l = t(2120);
      let s = n.forwardRef((e, r) => {
        let { className: t, ...n } = e;
        return (0, a.jsx)('textarea', {
          className: (0, l.cn)(
            'flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            t,
          ),
          ref: r,
          ...n,
        });
      });
      s.displayName = 'Textarea';
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
