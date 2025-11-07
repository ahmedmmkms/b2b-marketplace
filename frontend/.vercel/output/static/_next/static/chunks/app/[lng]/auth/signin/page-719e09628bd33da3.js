(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [632],
  {
    1044: function (e, r, t) {
      (Promise.resolve().then(t.bind(t, 7627)), Promise.resolve().then(t.bind(t, 7914)));
    },
    7627: function (e, r, t) {
      'use strict';
      t.d(r, {
        SignInForm: function () {
          return y;
        },
      });
      var a = t(6501),
        s = t(8422),
        n = t(9939),
        l = t(1894),
        i = t(9056),
        o = t(9376),
        d = t(8336),
        c = t(9681),
        u = t(56),
        f = t(560),
        m = t(5611),
        b = t(8957),
        g = t(4734),
        x = t(7077),
        h = t(9964),
        p = t(4722);
      let v = d.Ry({ email: d.Z_().email(), password: d.Z_().min(6) }),
        y = () => {
          let e = (0, l.T_)('auth.signin'),
            r = (0, l.T_)('common.actions'),
            t = (0, n.useRouter)(),
            d = (0, n.useSearchParams)(),
            y = (0, i.bU)(),
            j = (0, h.t)((e) => e.setCredentials),
            N = (0, h.t)((e) => e.setUser),
            [, w] = (0, s.useTransition)(),
            C = (0, x.Pi)({ query: { enabled: !1 } }),
            k = (0, o.cI)({ resolver: (0, c.F)(v), defaultValues: { email: '', password: '' } }),
            q = (0, x.f0)({
              mutation: {
                onSuccess: async (e) => {
                  var r;
                  (j(e), u.Am.success('Signed in successfully'));
                  try {
                    let e = await C.refetch();
                    e.data && N(e.data);
                  } catch (e) {
                    (0, p.Hv)(e);
                  }
                  let a = null !== (r = d.get('next')) && void 0 !== r ? r : '/'.concat(y);
                  w(() => t.push(a));
                },
                onError: (e) => (0, p.Hv)(e),
              },
            }),
            S = k.handleSubmit((e) => {
              q.mutate({ data: e });
            });
          return (0, a.jsx)('div', {
            className: 'flex min-h-[80vh] items-center justify-center bg-background px-6 py-10',
            children: (0, a.jsxs)(f.Card, {
              className: 'border-border/70 w-full max-w-md',
              children: [
                (0, a.jsxs)(f.Ol, {
                  className: 'space-y-1',
                  children: [
                    (0, a.jsx)(f.ll, { className: 'text-2xl font-semibold', children: e('title') }),
                    (0, a.jsx)(f.SZ, { children: e('subtitle') }),
                  ],
                }),
                (0, a.jsxs)(f.CardContent, {
                  children: [
                    (0, a.jsxs)('form', {
                      onSubmit: S,
                      className: 'space-y-4',
                      children: [
                        (0, a.jsxs)('div', {
                          className: 'space-y-2',
                          children: [
                            (0, a.jsx)(g._, { htmlFor: 'email', children: e('email') }),
                            (0, a.jsx)(b.I, {
                              id: 'email',
                              type: 'email',
                              autoComplete: 'email',
                              ...k.register('email'),
                            }),
                            k.formState.errors.email
                              ? (0, a.jsx)('p', {
                                  className: 'text-xs text-danger',
                                  children: k.formState.errors.email.message,
                                })
                              : null,
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          className: 'space-y-2',
                          children: [
                            (0, a.jsx)(g._, { htmlFor: 'password', children: e('password') }),
                            (0, a.jsx)(b.I, {
                              id: 'password',
                              type: 'password',
                              autoComplete: 'current-password',
                              ...k.register('password'),
                            }),
                            k.formState.errors.password
                              ? (0, a.jsx)('p', {
                                  className: 'text-xs text-danger',
                                  children: k.formState.errors.password.message,
                                })
                              : null,
                          ],
                        }),
                        (0, a.jsx)(m.Button, {
                          type: 'submit',
                          className: 'w-full',
                          disabled: q.isPending,
                          children: q.isPending ? 'Signing in...' : e('cta'),
                        }),
                      ],
                    }),
                    (0, a.jsxs)('p', {
                      className: 'text-muted-foreground mt-4 text-center text-xs',
                      children: [
                        r('register'),
                        '?',
                        ' ',
                        (0, a.jsx)('button', {
                          type: 'button',
                          className: 'text-primary underline',
                          onClick: () => t.push('/'.concat(y, '/auth/register')),
                          children: r('register'),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          });
        };
    },
    7914: function (e, r, t) {
      'use strict';
      t.d(r, {
        AppShell: function () {
          return k;
        },
      });
      var a = t(6501),
        s = t(1894),
        n = t(8422),
        l = t(8090),
        i = t(7210);
      let {
        Link: o,
        redirect: d,
        useRouter: c,
        usePathname: u,
      } = (0, l.Z)({
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
            r = c(),
            t = u(),
            [, s] = (0, n.useTransition)(),
            l = (a) => {
              a !== e &&
                s(() => {
                  r.replace(t, { locale: a });
                });
            };
          return (0, a.jsx)('select', {
            className:
              'rounded-md border border-input bg-background px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            value: e,
            onChange: (e) => l(e.target.value),
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
          s = a(),
          l = (0, p.Pi)({ query: { enabled: s } });
        return (
          (0, n.useEffect)(() => {
            s || t();
          }, [s, t]),
          (0, n.useEffect)(() => {
            l.data && r(l.data);
          }, [l.data, r]),
          (0, n.useEffect)(() => {
            l.isError && t();
          }, [l.isError, t]),
          {
            user: null != e ? e : l.data,
            isAuthenticated: s,
            isLoading: l.isLoading,
            refetch: l.refetch,
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
        C = (e, r, t) => {
          var a;
          return (
            (null === (a = e.roles) ||
              void 0 === a ||
              !a.length ||
              !!e.roles.some((e) => r.includes(e))) &&
            (!e.featureFlag || !!t(e.featureFlag))
          );
        },
        k = (e) => {
          let { children: r, sidebar: t = !0 } = e,
            l = (0, s.T_)(),
            i = u(),
            { user: d, isAuthenticated: c } = v(),
            f = (0, h.t)((e) => e.clear),
            [m, p] = (0, n.useState)(!1),
            k = (null == d ? void 0 : d.role) ? [d.role] : [],
            q = [
              ...j,
              ...N,
              ...w,
              ...(c
                ? []
                : [
                    { href: '/auth/signin', labelKey: 'nav.signin' },
                    { href: '/auth/register', labelKey: 'nav.register' },
                  ]),
            ];
          return (
            (0, n.useEffect)(() => {
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
                            (0, a.jsx)(o, {
                              href: '/',
                              className: 'text-lg font-semibold text-primary',
                              children: l('common.brand'),
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
                            .filter((e) => C(e, k, (e) => !e || (0, y.c)(e, !0)))
                            .map((e) => {
                              let r = i === e.href || i.endsWith(e.href);
                              return (0, a.jsx)(
                                o,
                                {
                                  href: e.href,
                                  className: (0, x.cn)(
                                    'hover:bg-primary/10 block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    r ? 'bg-primary text-primary-foreground' : 'text-foreground',
                                  ),
                                  children: l(e.labelKey),
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
                              children: l('common.brand'),
                            }),
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          className: 'flex items-center gap-4',
                          children: [
                            (0, a.jsx)(b, {}),
                            c
                              ? (0, a.jsx)(g.Button, {
                                  variant: 'outline',
                                  size: 'sm',
                                  onClick: () => f(),
                                  children: l('common.actions.signOut'),
                                })
                              : (0, a.jsx)(o, {
                                  href: '/auth/signin',
                                  children: (0, a.jsx)(g.Button, {
                                    size: 'sm',
                                    children: l('common.actions.signIn'),
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
    5611: function (e, r, t) {
      'use strict';
      t.d(r, {
        Button: function () {
          return d;
        },
      });
      var a = t(6501),
        s = t(8422),
        n = t(2619),
        l = t(7561),
        i = t(2120);
      let o = (0, l.j)(
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
        d = s.forwardRef((e, r) => {
          let { className: t, variant: s, size: l, asChild: d = !1, ...c } = e,
            u = d ? n.g7 : 'button';
          return (0, a.jsx)(u, {
            className: (0, i.cn)(o({ variant: s, size: l, className: t })),
            ref: r,
            ...c,
          });
        });
      d.displayName = 'Button';
    },
    560: function (e, r, t) {
      'use strict';
      t.d(r, {
        Card: function () {
          return l;
        },
        CardContent: function () {
          return c;
        },
        Ol: function () {
          return i;
        },
        SZ: function () {
          return d;
        },
        ll: function () {
          return o;
        },
      });
      var a = t(6501),
        s = t(8422),
        n = t(2120);
      let l = s.forwardRef((e, r) => {
        let { className: t, ...s } = e;
        return (0, a.jsx)('div', {
          ref: r,
          className: (0, n.cn)(
            'rounded-lg border border-border bg-card text-card-foreground shadow-sm',
            t,
          ),
          ...s,
        });
      });
      l.displayName = 'Card';
      let i = s.forwardRef((e, r) => {
        let { className: t, ...s } = e;
        return (0, a.jsx)('div', {
          ref: r,
          className: (0, n.cn)('flex flex-col gap-1.5 p-6', t),
          ...s,
        });
      });
      i.displayName = 'CardHeader';
      let o = s.forwardRef((e, r) => {
        let { className: t, ...s } = e;
        return (0, a.jsx)('h3', {
          ref: r,
          className: (0, n.cn)('text-lg font-semibold leading-none tracking-tight', t),
          ...s,
        });
      });
      o.displayName = 'CardTitle';
      let d = s.forwardRef((e, r) => {
        let { className: t, ...s } = e;
        return (0, a.jsx)('p', {
          ref: r,
          className: (0, n.cn)('text-muted-foreground text-sm', t),
          ...s,
        });
      });
      d.displayName = 'CardDescription';
      let c = s.forwardRef((e, r) => {
        let { className: t, ...s } = e;
        return (0, a.jsx)('div', { ref: r, className: (0, n.cn)('p-6 pt-0', t), ...s });
      });
      ((c.displayName = 'CardContent'),
        (s.forwardRef((e, r) => {
          let { className: t, ...s } = e;
          return (0, a.jsx)('div', {
            ref: r,
            className: (0, n.cn)('flex items-center p-6 pt-0', t),
            ...s,
          });
        }).displayName = 'CardFooter'));
    },
    8957: function (e, r, t) {
      'use strict';
      t.d(r, {
        I: function () {
          return l;
        },
      });
      var a = t(6501),
        s = t(8422),
        n = t(2120);
      let l = s.forwardRef((e, r) => {
        let { className: t, type: s = 'text', ...l } = e;
        return (0, a.jsx)('input', {
          type: s,
          className: (0, n.cn)(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            t,
          ),
          ref: r,
          ...l,
        });
      });
      l.displayName = 'Input';
    },
    4734: function (e, r, t) {
      'use strict';
      t.d(r, {
        _: function () {
          return i;
        },
      });
      var a = t(6501),
        s = t(8422),
        n = t(3361),
        l = t(2120);
      let i = s.forwardRef((e, r) => {
        let { className: t, ...s } = e;
        return (0, a.jsx)(n.f, {
          ref: r,
          className: (0, l.cn)(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            t,
          ),
          ...s,
        });
      });
      i.displayName = n.f.displayName;
    },
    2120: function (e, r, t) {
      'use strict';
      t.d(r, {
        cn: function () {
          return n;
        },
      });
      var a = t(9007),
        s = t(2786);
      let n = function () {
        for (var e = arguments.length, r = Array(e), t = 0; t < e; t++) r[t] = arguments[t];
        return (0, s.m6)((0, a.W)(r));
      };
    },
  },
  function (e) {
    (e.O(0, [655, 43, 805, 855, 85, 496, 744], function () {
      return e((e.s = 1044));
    }),
      (_N_E = e.O()));
  },
]);
