(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [658],
  {
    6886: function (e, t, r) {
      (Promise.resolve().then(r.bind(r, 1399)), Promise.resolve().then(r.bind(r, 7914)));
    },
    1399: function (e, t, r) {
      'use strict';
      r.d(t, {
        RfqDashboard: function () {
          return g;
        },
      });
      var n = r(6501),
        s = r(8422),
        l = r(9939),
        i = r(1894),
        d = r(9056),
        a = r(56),
        c = r(9683),
        o = r(1735),
        u = r(5611),
        f = r(560),
        m = r(8957),
        x = r(6771),
        h = r(7077),
        j = r(8808),
        p = r(4722);
      let g = () => {
        var e;
        let t = (0, i.T_)('rfq'),
          r = (0, i.T_)('common.actions'),
          g = (0, i.T_)('common.status'),
          b = (0, l.useRouter)(),
          v = (0, d.bU)(),
          [N, y] = (0, s.useState)(''),
          [C, w] = (0, s.useState)(''),
          { data: R, isLoading: k, refetch: q } = (0, h.$0)(C, { query: { enabled: !!C } }),
          S = (0, h.YC)({
            mutation: {
              onSuccess: () => {
                (a.Am.success('RFQ issued successfully'), q());
              },
              onError: (e) => (0, p.Hv)(e),
            },
          }),
          D = async () => {
            if (null == R ? void 0 : R.id)
              try {
                await S.mutateAsync({ rfqId: R.id });
              } catch (e) {
                (0, p.Hv)(e);
              }
          };
        return (0, n.jsxs)('div', {
          className: 'space-y-6 p-6',
          children: [
            (0, n.jsx)(c.m, {
              title: t('title'),
              breadcrumbs: [{ label: t('title') }],
              actions: (0, n.jsx)(u.Button, {
                onClick: () => b.push('/'.concat(v, '/rfq/new')),
                children: t('new'),
              }),
            }),
            (0, n.jsxs)(f.Card, {
              children: [
                (0, n.jsx)(f.Ol, { children: (0, n.jsx)(f.ll, { children: t('draftTitle') }) }),
                (0, n.jsxs)(f.CardContent, {
                  className: 'space-y-4',
                  children: [
                    (0, n.jsxs)('div', {
                      className: 'flex flex-wrap items-end gap-3',
                      children: [
                        (0, n.jsxs)('div', {
                          className: 'flex flex-col gap-2',
                          children: [
                            (0, n.jsx)('label', {
                              className: 'text-muted-foreground text-sm font-medium',
                              htmlFor: 'rfqId',
                              children: 'RFQ ID',
                            }),
                            (0, n.jsx)(m.I, {
                              id: 'rfqId',
                              value: N,
                              onChange: (e) => y(e.target.value),
                              placeholder: 'rfq-123',
                            }),
                          ],
                        }),
                        (0, n.jsx)(u.Button, {
                          type: 'button',
                          onClick: () => {
                            w(N.trim());
                          },
                          children: r('view'),
                        }),
                      ],
                    }),
                    k
                      ? (0, n.jsx)('p', {
                          className: 'text-muted-foreground text-sm',
                          children: 'Loading...',
                        })
                      : null,
                    R || k
                      ? null
                      : (0, n.jsx)(o.u, {
                          title: t('form.emptyLines'),
                          description: 'Provide an RFQ ID to review details.',
                        }),
                    R
                      ? (0, n.jsxs)('div', {
                          className: 'border-border/70 space-y-4 rounded-lg border p-4',
                          children: [
                            (0, n.jsxs)('div', {
                              className: 'flex flex-wrap items-center justify-between gap-3',
                              children: [
                                (0, n.jsxs)('div', {
                                  children: [
                                    (0, n.jsx)('h3', {
                                      className: 'text-lg font-semibold text-foreground',
                                      children: R.title,
                                    }),
                                    (0, n.jsx)('p', {
                                      className: 'text-muted-foreground text-sm',
                                      children: R.notes,
                                    }),
                                  ],
                                }),
                                (0, n.jsx)('span', {
                                  className:
                                    'bg-primary/10 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary',
                                  children: g(R.status),
                                }),
                              ],
                            }),
                            (0, n.jsxs)('div', {
                              children: [
                                (0, n.jsx)('h4', {
                                  className: 'text-muted-foreground mb-2 text-sm font-semibold',
                                  children: t('form.lines'),
                                }),
                                (0, n.jsxs)(x.iA, {
                                  children: [
                                    (0, n.jsx)(x.xD, {
                                      children: (0, n.jsxs)(x.SC, {
                                        children: [
                                          (0, n.jsx)(x.ss, { children: t('form.description') }),
                                          (0, n.jsx)(x.ss, { children: t('form.quantity') }),
                                          (0, n.jsx)(x.ss, { children: t('form.uom') }),
                                          (0, n.jsx)(x.ss, { children: t('form.targetPrice') }),
                                        ],
                                      }),
                                    }),
                                    (0, n.jsx)(x.RM, {
                                      children: (null !== (e = R.lines) && void 0 !== e
                                        ? e
                                        : []
                                      ).map((e) => {
                                        var t;
                                        return (0, n.jsxs)(
                                          x.SC,
                                          {
                                            children: [
                                              (0, n.jsx)(x.pj, { children: e.description }),
                                              (0, n.jsx)(x.pj, { children: (0, j.uf)(e.quantity) }),
                                              (0, n.jsx)(x.pj, { children: e.uom }),
                                              (0, n.jsx)(x.pj, {
                                                children:
                                                  null !== (t = e.targetPrice) && void 0 !== t
                                                    ? t
                                                    : '-',
                                              }),
                                            ],
                                          },
                                          e.id,
                                        );
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            'draft' === R.status
                              ? (0, n.jsx)(u.Button, {
                                  onClick: D,
                                  disabled: S.isPending,
                                  children: r('issue'),
                                })
                              : null,
                          ],
                        })
                      : null,
                  ],
                }),
              ],
            }),
          ],
        });
      };
    },
    1735: function (e, t, r) {
      'use strict';
      r.d(t, {
        u: function () {
          return i;
        },
      });
      var n = r(6501),
        s = r(5611),
        l = r(2120);
      let i = (e) => {
        let { title: t, description: r, actionLabel: i, onAction: d, icon: a, className: c } = e;
        return (0, n.jsxs)('div', {
          className: (0, l.cn)(
            'flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center',
            c,
          ),
          children: [
            a,
            (0, n.jsxs)('div', {
              children: [
                (0, n.jsx)('h3', { className: 'text-lg font-semibold', children: t }),
                r
                  ? (0, n.jsx)('p', {
                      className: 'text-muted-foreground mt-2 text-sm',
                      children: r,
                    })
                  : null,
              ],
            }),
            i ? (0, n.jsx)(s.Button, { onClick: d, variant: 'outline', children: i }) : null,
          ],
        });
      };
    },
    560: function (e, t, r) {
      'use strict';
      r.d(t, {
        Card: function () {
          return i;
        },
        CardContent: function () {
          return o;
        },
        Ol: function () {
          return d;
        },
        SZ: function () {
          return c;
        },
        ll: function () {
          return a;
        },
      });
      var n = r(6501),
        s = r(8422),
        l = r(2120);
      let i = s.forwardRef((e, t) => {
        let { className: r, ...s } = e;
        return (0, n.jsx)('div', {
          ref: t,
          className: (0, l.cn)(
            'rounded-lg border border-border bg-card text-card-foreground shadow-sm',
            r,
          ),
          ...s,
        });
      });
      i.displayName = 'Card';
      let d = s.forwardRef((e, t) => {
        let { className: r, ...s } = e;
        return (0, n.jsx)('div', {
          ref: t,
          className: (0, l.cn)('flex flex-col gap-1.5 p-6', r),
          ...s,
        });
      });
      d.displayName = 'CardHeader';
      let a = s.forwardRef((e, t) => {
        let { className: r, ...s } = e;
        return (0, n.jsx)('h3', {
          ref: t,
          className: (0, l.cn)('text-lg font-semibold leading-none tracking-tight', r),
          ...s,
        });
      });
      a.displayName = 'CardTitle';
      let c = s.forwardRef((e, t) => {
        let { className: r, ...s } = e;
        return (0, n.jsx)('p', {
          ref: t,
          className: (0, l.cn)('text-muted-foreground text-sm', r),
          ...s,
        });
      });
      c.displayName = 'CardDescription';
      let o = s.forwardRef((e, t) => {
        let { className: r, ...s } = e;
        return (0, n.jsx)('div', { ref: t, className: (0, l.cn)('p-6 pt-0', r), ...s });
      });
      ((o.displayName = 'CardContent'),
        (s.forwardRef((e, t) => {
          let { className: r, ...s } = e;
          return (0, n.jsx)('div', {
            ref: t,
            className: (0, l.cn)('flex items-center p-6 pt-0', r),
            ...s,
          });
        }).displayName = 'CardFooter'));
    },
    8808: function (e, t, r) {
      'use strict';
      r.d(t, {
        p6: function () {
          return l;
        },
        uf: function () {
          return s;
        },
        xG: function () {
          return n;
        },
      });
      let n = function (e) {
          let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'USD',
            r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 'en-US';
          return new Intl.NumberFormat(r, { style: 'currency', currency: t }).format(e);
        },
        s = function (e) {
          let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'en-US';
          return new Intl.NumberFormat(t).format(e);
        },
        l = function (e) {
          let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'en-US',
            r = e instanceof Date ? e : new Date(e);
          return new Intl.DateTimeFormat(t, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }).format(r);
        };
    },
  },
  function (e) {
    (e.O(0, [655, 43, 855, 18, 85, 496, 744], function () {
      return e((e.s = 6886));
    }),
      (_N_E = e.O()));
  },
]);
