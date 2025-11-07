(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [924],
  {
    8351: function (e, t, s) {
      (Promise.resolve().then(s.bind(s, 9326)), Promise.resolve().then(s.bind(s, 7914)));
    },
    9326: function (e, t, s) {
      'use strict';
      s.d(t, {
        RfqCreateForm: function () {
          return N;
        },
      });
      var i = s(6501),
        r = s(8422),
        l = s(9939),
        n = s(1894),
        o = s(9056),
        a = s(9376),
        c = s(8336),
        d = s(9681),
        u = s(56),
        m = s(9683),
        x = s(5611),
        v = s(560),
        f = s(8957),
        p = s(4734),
        h = s(7960),
        g = s(7077),
        j = s(4722);
      let b = c.Ry({
          description: c.Z_().min(1, 'Description is required'),
          quantity: c.oQ.number().positive('Quantity must be positive'),
          uom: c.Z_().min(1, 'Unit of measure is required'),
          targetPrice: c.oQ
            .number()
            .positive()
            .optional()
            .or(c.i0('').transform(() => void 0)),
        }),
        y = c.Ry({
          title: c.Z_().min(3, 'Title must be at least 3 characters'),
          notes: c.Z_().optional(),
          autoIssue: c.O7().optional(),
          lines: c.IX(b).min(1, 'Add at least one line item'),
        }),
        N = () => {
          var e;
          let t = (0, n.T_)('rfq'),
            s = (0, n.T_)('common.actions'),
            c = (0, l.useRouter)(),
            b = (0, o.bU)(),
            [N, _] = (0, r.useState)(!1),
            q = (0, a.cI)({
              resolver: (0, d.F)(y),
              defaultValues: {
                title: '',
                notes: '',
                autoIssue: !0,
                lines: [{ description: '', quantity: 1, uom: 'EA', targetPrice: void 0 }],
              },
            }),
            { fields: S, append: P, remove: C } = (0, a.Dq)({ control: q.control, name: 'lines' }),
            F = (0, g.dG)(),
            I = (0, g.pk)(),
            w = (0, g.YC)(),
            A = q.handleSubmit(async (e) => {
              _(!0);
              try {
                let [t, ...s] = e.lines.map((e) => ({
                    ...e,
                    targetPrice: Number.isFinite(e.targetPrice) ? e.targetPrice : void 0,
                  })),
                  i = (
                    await F.mutateAsync({
                      data: { title: e.title, notes: e.notes, lines: t ? [t] : [] },
                    })
                  ).id;
                if (!i) throw Error('RFQ id missing from response.');
                for (let e of s) await I.mutateAsync({ rfqId: i, data: e });
                (e.autoIssue && (await w.mutateAsync({ rfqId: i })),
                  u.Am.success('RFQ created successfully', {
                    description: e.autoIssue ? 'RFQ issued to suppliers.' : 'RFQ saved as draft.',
                  }),
                  c.push('/'.concat(b, '/rfq')));
              } catch (e) {
                (0, j.Hv)(e);
              } finally {
                _(!1);
              }
            });
          return (0, i.jsxs)('div', {
            className: 'space-y-6 p-6',
            children: [
              (0, i.jsx)(m.m, {
                title: t('new'),
                breadcrumbs: [{ label: t('title'), href: '/rfq' }, { label: t('new') }],
              }),
              (0, i.jsxs)('form', {
                onSubmit: A,
                className: 'space-y-6',
                children: [
                  (0, i.jsxs)(v.Card, {
                    children: [
                      (0, i.jsx)(v.Ol, {
                        children: (0, i.jsx)(v.ll, { children: t('form.title') }),
                      }),
                      (0, i.jsx)(v.CardContent, {
                        className: 'space-y-4',
                        children: (0, i.jsxs)('div', {
                          className: 'grid gap-4 md:grid-cols-2',
                          children: [
                            (0, i.jsxs)('div', {
                              className: 'flex flex-col gap-2',
                              children: [
                                (0, i.jsx)(p._, { htmlFor: 'title', children: t('form.title') }),
                                (0, i.jsx)(f.I, { id: 'title', ...q.register('title') }),
                                q.formState.errors.title
                                  ? (0, i.jsx)('p', {
                                      className: 'text-xs text-danger',
                                      children: q.formState.errors.title.message,
                                    })
                                  : null,
                              ],
                            }),
                            (0, i.jsxs)('div', {
                              className: 'flex flex-col gap-2',
                              children: [
                                (0, i.jsx)(p._, { htmlFor: 'notes', children: t('form.notes') }),
                                (0, i.jsx)(h.g, { id: 'notes', rows: 4, ...q.register('notes') }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, i.jsxs)(v.Card, {
                    children: [
                      (0, i.jsx)(v.Ol, {
                        children: (0, i.jsx)(v.ll, { children: t('form.lines') }),
                      }),
                      (0, i.jsxs)(v.CardContent, {
                        className: 'space-y-4',
                        children: [
                          S.map((e, s) => {
                            var r, l, n, o, a, c, d, u, m, v, h, g, j, b, y, N;
                            return (0, i.jsxs)(
                              'div',
                              {
                                className:
                                  'border-border/70 grid gap-3 rounded-md border p-4 md:grid-cols-4',
                                children: [
                                  (0, i.jsxs)('div', {
                                    className: 'flex flex-col gap-2 md:col-span-2',
                                    children: [
                                      (0, i.jsx)(p._, {
                                        htmlFor: 'lines.'.concat(s, '.description'),
                                        children: t('form.description'),
                                      }),
                                      (0, i.jsx)(f.I, {
                                        id: 'lines.'.concat(s, '.description'),
                                        ...q.register('lines.'.concat(s, '.description')),
                                      }),
                                      (
                                        null === (l = q.formState.errors.lines) || void 0 === l
                                          ? void 0
                                          : null === (r = l[s]) || void 0 === r
                                            ? void 0
                                            : r.description
                                      )
                                        ? (0, i.jsx)('p', {
                                            className: 'text-xs text-danger',
                                            children:
                                              null === (o = q.formState.errors.lines[s]) ||
                                              void 0 === o
                                                ? void 0
                                                : null === (n = o.description) || void 0 === n
                                                  ? void 0
                                                  : n.message,
                                          })
                                        : null,
                                    ],
                                  }),
                                  (0, i.jsxs)('div', {
                                    className: 'flex flex-col gap-2',
                                    children: [
                                      (0, i.jsx)(p._, {
                                        htmlFor: 'lines.'.concat(s, '.quantity'),
                                        children: t('form.quantity'),
                                      }),
                                      (0, i.jsx)(f.I, {
                                        id: 'lines.'.concat(s, '.quantity'),
                                        type: 'number',
                                        step: '0.01',
                                        ...q.register('lines.'.concat(s, '.quantity'), {
                                          valueAsNumber: !0,
                                        }),
                                      }),
                                      (
                                        null === (c = q.formState.errors.lines) || void 0 === c
                                          ? void 0
                                          : null === (a = c[s]) || void 0 === a
                                            ? void 0
                                            : a.quantity
                                      )
                                        ? (0, i.jsx)('p', {
                                            className: 'text-xs text-danger',
                                            children:
                                              null === (u = q.formState.errors.lines[s]) ||
                                              void 0 === u
                                                ? void 0
                                                : null === (d = u.quantity) || void 0 === d
                                                  ? void 0
                                                  : d.message,
                                          })
                                        : null,
                                    ],
                                  }),
                                  (0, i.jsxs)('div', {
                                    className: 'flex flex-col gap-2',
                                    children: [
                                      (0, i.jsx)(p._, {
                                        htmlFor: 'lines.'.concat(s, '.uom'),
                                        children: t('form.uom'),
                                      }),
                                      (0, i.jsx)(f.I, {
                                        id: 'lines.'.concat(s, '.uom'),
                                        ...q.register('lines.'.concat(s, '.uom')),
                                      }),
                                      (
                                        null === (v = q.formState.errors.lines) || void 0 === v
                                          ? void 0
                                          : null === (m = v[s]) || void 0 === m
                                            ? void 0
                                            : m.uom
                                      )
                                        ? (0, i.jsx)('p', {
                                            className: 'text-xs text-danger',
                                            children:
                                              null === (g = q.formState.errors.lines[s]) ||
                                              void 0 === g
                                                ? void 0
                                                : null === (h = g.uom) || void 0 === h
                                                  ? void 0
                                                  : h.message,
                                          })
                                        : null,
                                    ],
                                  }),
                                  (0, i.jsxs)('div', {
                                    className: 'flex flex-col gap-2',
                                    children: [
                                      (0, i.jsx)(p._, {
                                        htmlFor: 'lines.'.concat(s, '.targetPrice'),
                                        children: t('form.targetPrice'),
                                      }),
                                      (0, i.jsx)(f.I, {
                                        id: 'lines.'.concat(s, '.targetPrice'),
                                        type: 'number',
                                        step: '0.01',
                                        ...q.register('lines.'.concat(s, '.targetPrice'), {
                                          valueAsNumber: !0,
                                        }),
                                      }),
                                      (
                                        null === (b = q.formState.errors.lines) || void 0 === b
                                          ? void 0
                                          : null === (j = b[s]) || void 0 === j
                                            ? void 0
                                            : j.targetPrice
                                      )
                                        ? (0, i.jsx)('p', {
                                            className: 'text-xs text-danger',
                                            children:
                                              null === (N = q.formState.errors.lines[s]) ||
                                              void 0 === N
                                                ? void 0
                                                : null === (y = N.targetPrice) || void 0 === y
                                                  ? void 0
                                                  : y.message,
                                          })
                                        : null,
                                    ],
                                  }),
                                  S.length > 1
                                    ? (0, i.jsx)('div', {
                                        className: 'md:col-span-4',
                                        children: (0, i.jsx)(x.Button, {
                                          type: 'button',
                                          variant: 'outline',
                                          size: 'sm',
                                          onClick: () => C(s),
                                          children: 'Remove',
                                        }),
                                      })
                                    : null,
                                ],
                              },
                              e.id,
                            );
                          }),
                          (
                            null === (e = q.formState.errors.lines) || void 0 === e
                              ? void 0
                              : e.root
                          )
                            ? (0, i.jsx)('p', {
                                className: 'text-xs text-danger',
                                children: q.formState.errors.lines.root.message,
                              })
                            : null,
                          (0, i.jsx)(x.Button, {
                            type: 'button',
                            variant: 'outline',
                            onClick: () =>
                              P({ description: '', quantity: 1, uom: 'EA', targetPrice: void 0 }),
                            children: s('addLine'),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, i.jsxs)('div', {
                    className: 'flex items-center justify-between',
                    children: [
                      (0, i.jsxs)('label', {
                        className: 'text-muted-foreground flex items-center gap-2 text-sm',
                        children: [
                          (0, i.jsx)('input', { type: 'checkbox', ...q.register('autoIssue') }),
                          t('issueConfirm'),
                        ],
                      }),
                      (0, i.jsx)(x.Button, {
                        type: 'submit',
                        size: 'lg',
                        disabled: N,
                        children: N ? 'Submitting...' : s('submit'),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        };
    },
  },
  function (e) {
    (e.O(0, [655, 43, 805, 855, 700, 85, 496, 744], function () {
      return e((e.s = 8351));
    }),
      (_N_E = e.O()));
  },
]);
