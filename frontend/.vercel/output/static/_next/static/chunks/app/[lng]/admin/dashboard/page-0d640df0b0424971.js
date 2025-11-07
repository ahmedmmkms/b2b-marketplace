(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [318],
  {
    70: function (e, s, t) {
      (Promise.resolve().then(t.bind(t, 1127)), Promise.resolve().then(t.bind(t, 7914)));
    },
    1127: function (e, s, t) {
      'use strict';
      t.d(s, {
        AdminDashboard: function () {
          return d;
        },
      });
      var l = t(6501),
        a = t(1894),
        n = t(9683),
        i = t(1678),
        r = t(560);
      let d = () => {
        let e = (0, a.T_)('admin.dashboard');
        return (0, l.jsxs)('div', {
          className: 'space-y-6 p-6',
          children: [
            (0, l.jsx)(n.m, { title: e('title'), breadcrumbs: [{ label: e('title') }] }),
            (0, l.jsx)(i.j, {
              items: [
                { label: 'Active buyers', value: '42' },
                { label: 'Active suppliers', value: '16' },
                { label: 'RFQs issued (30d)', value: '128' },
                { label: 'Orders fulfilled (30d)', value: '54' },
              ],
            }),
            (0, l.jsxs)(r.Card, {
              children: [
                (0, l.jsx)(r.Ol, { children: (0, l.jsx)(r.ll, { children: 'Operations' }) }),
                (0, l.jsx)(r.CardContent, {
                  className: 'text-muted-foreground space-y-2 text-sm',
                  children: (0, l.jsx)('p', {
                    children:
                      'TODO: Wire dashboard metrics to backend analytics endpoints once available. Use this space to surface RFQ throughput, quote conversion, and payment health indicators.',
                  }),
                }),
              ],
            }),
          ],
        });
      };
    },
  },
  function (e) {
    (e.O(0, [655, 43, 855, 586, 85, 496, 744], function () {
      return e((e.s = 70));
    }),
      (_N_E = e.O()));
  },
]);
