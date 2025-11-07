var V = Object.defineProperty;
var Y = Object.getOwnPropertyDescriptor;
var J = Object.getOwnPropertyNames;
var Q = Object.prototype.hasOwnProperty;
var Z = (r, l) => () => (r && (l = r((r = 0))), l);
var z = (r, l, q, b) => {
    if ((l && typeof l == 'object') || typeof l == 'function')
      for (let g of J(l))
        !Q.call(r, g) &&
          g !== q &&
          V(r, g, { get: () => l[g], enumerable: !(b = Y(l, g)) || b.enumerable });
    return r;
  },
  H = (r, l, q) => (z(r, l, 'default'), q && z(q, l, 'default'));
var nn = (r) => z(V({}, '__esModule', { value: !0 }), r);
var K = {};
import * as Pc from 'async_hooks';
var X = Z(() => {
  H(K, Pc);
});
import { __getNamedExports as en } from '../../../__next-on-pages-dist__/webpack/8586.js';
import { __getNamedExports as tn } from '../../../__next-on-pages-dist__/webpack/1746.js';
import { __getNamedExports as _n } from '../../../__next-on-pages-dist__/webpack/3290.js';
import { __getNamedExports as cn } from '../../../__next-on-pages-dist__/webpack/2516.js';
import { __getNamedExports as sn } from '../../../__next-on-pages-dist__/webpack/7e5b5057542a677d168ef2f7e421c64a.js';
import { __getNamedExports as an } from '../../../__next-on-pages-dist__/webpack/feaf1bd85f055963b24458fea3223a55.js';
import { __getNamedExports as on } from '../../../__next-on-pages-dist__/manifest/8979b518535174c7eb8d77a6d5a08905.js';
var m = globalThis.__nextOnPagesRoutesIsolation.getProxyFor('/[lng]/orders'),
  rn = en(m, m, m),
  un = rn.__chunk_8586,
  dn = tn(m, m, m),
  hn = dn.__chunk_1746,
  ln = _n(m, m, m),
  kn = ln.__chunk_3290,
  mn = cn(m, m, m),
  pn = mn.__chunk_2516,
  U = sn(m, m, m),
  fn = U.__chunk_6195,
  gn = U.__chunk_2067,
  bn = U.__chunk_935,
  xn = U.__chunk_9228,
  yn = U.__chunk_602,
  n = an(m, m, m),
  jn = n.__chunk_9316,
  Pn = n.__chunk_8700,
  En = n.__chunk_8034,
  vn = n.__chunk_5530,
  Nn = n.__chunk_2530,
  wn = n.__chunk_4851,
  Rn = n.__chunk_4672,
  Sn = n.__chunk_336,
  On = n.__chunk_4085,
  Tn = n.__chunk_8741,
  In = n.__chunk_164,
  Cn = n.__chunk_1368,
  Mn = n.__chunk_5482,
  An = n.__chunk_696,
  Fn = n.__chunk_1644,
  $n = n.__chunk_5460,
  Dn = n.__chunk_5424,
  qn = n.__chunk_7617,
  Ln = n.__chunk_9805,
  Bn = n.__chunk_2459,
  Kn = n.__chunk_5115,
  Un = n.__chunk_5069,
  Wn = n.__chunk_7538,
  zn = n.__chunk_9497,
  Hn = n.__chunk_2208,
  Gn = n.__chunk_3906,
  Vn = n.__chunk_7130,
  Xn = n.__chunk_7713,
  Yn = n.__chunk_5765,
  Jn = n.__chunk_9182,
  Qn = n.__chunk_1661,
  Zn = n.__chunk_7042,
  ne = n.__chunk_5588,
  ee = n.__chunk_7850,
  te = n.__chunk_4961,
  _e = n.__chunk_3435,
  ce = n.__chunk_4508,
  se = n.__chunk_8981,
  ae = n.__chunk_5579,
  oe = n.__chunk_1082,
  re = n.__chunk_9712,
  ue = n.__chunk_1209,
  de = n.__chunk_434,
  ie = n.__chunk_3326,
  he = n.__chunk_4314,
  le = n.__chunk_2714,
  ke = n.__chunk_5942,
  me = n.__chunk_106,
  pe = n.__chunk_8712,
  fe = n.__chunk_3758,
  ge = n.__chunk_7309,
  be = n.__chunk_9212,
  xe = n.__chunk_407,
  ye = n.__chunk_5318,
  je = n.__chunk_4990,
  Pe = n.__chunk_5737,
  Ee = n.__chunk_3065,
  ve = n.__chunk_9327,
  Ne = n.__chunk_4114,
  we = n.__chunk_6977,
  Re = n.__chunk_3831,
  Se = n.__chunk_575,
  Oe = n.__chunk_9145,
  Te = n.__chunk_4793,
  Ie = n.__chunk_4510,
  Ce = n.__chunk_8868,
  Me = n.__chunk_7700,
  Ae = n.__chunk_1511,
  Fe = n.__chunk_3196,
  $e = n.__chunk_2161,
  De = n.__chunk_6482,
  qe = n.__chunk_7185,
  Le = n.__chunk_712,
  Be = n.__chunk_2222,
  Ke = n.__chunk_4977,
  Ue = n.__chunk_1298,
  We = n.__chunk_8427,
  ze = n.__chunk_253,
  He = n.__chunk_9154,
  Ge = n.__chunk_8433,
  Ve = n.__chunk_291,
  Xe = n.__chunk_4703,
  Ye = n.__chunk_1502,
  Je = n.__chunk_4634,
  Qe = n.__chunk_4627,
  Ze = n.__chunk_2940,
  nt = n.__chunk_2041,
  et = n.__chunk_5991,
  tt = n.__chunk_5159,
  _t = n.__chunk_5143,
  ct = n.__chunk_7329,
  st = n.__chunk_3746,
  at = n.__chunk_8556,
  ot = n.__chunk_758,
  rt = n.__chunk_6450,
  ut = n.__chunk_207,
  dt = n.__chunk_5929,
  it = n.__chunk_9458,
  ht = n.__chunk_4497,
  lt = n.__chunk_6612,
  kt = n.__chunk_4119,
  mt = n.__chunk_9491,
  pt = n.__chunk_151,
  ft = n.__chunk_1875,
  gt = n.__chunk_2990,
  bt = n.__chunk_1646,
  xt = n.__chunk_225,
  yt = n.__chunk_3254,
  jt = n.__chunk_7497,
  Pt = n.__chunk_2798,
  Et = n.__chunk_6828,
  vt = n.__chunk_8402,
  Nt = n.__chunk_4360,
  wt = n.__chunk_627,
  Rt = n.__chunk_6725,
  St = n.__chunk_3916,
  Ot = n.__chunk_4505,
  Tt = n.__chunk_4576,
  It = n.__chunk_9104,
  Ct = n.__chunk_2223,
  Mt = n.__chunk_6299,
  At = n.__chunk_1478,
  Ft = n.__chunk_8186,
  $t = n.__chunk_8997,
  Dt = n.__chunk_6575,
  qt = n.__chunk_5521,
  Lt = n.__chunk_5758,
  Bt = n.__chunk_1349,
  Kt = n.__chunk_4709,
  Ut = n.__chunk_5448,
  Wt = n.__chunk_5401,
  zt = n.__chunk_614,
  Ht = n.__chunk_4598,
  Gt = n.__chunk_5771,
  Vt = n.__chunk_4833,
  Xt = n.__chunk_8799,
  Yt = n.__chunk_9004,
  Jt = n.__chunk_8430,
  Qt = n.__chunk_219,
  Zt = n.__chunk_9334,
  n_ = n.__chunk_2413,
  e_ = n.__chunk_5060,
  t_ = n.__chunk_5365,
  __ = n.__chunk_6613,
  c_ = n.__chunk_252,
  s_ = n.__chunk_1331,
  a_ = n.__chunk_4180,
  o_ = n.__chunk_6618,
  r_ = n.__chunk_3160,
  u_ = n.__chunk_3972,
  d_ = n.__chunk_282,
  i_ = n.__chunk_4527,
  h_ = n.__chunk_1571,
  l_ = n.__chunk_3573,
  k_ = n.__chunk_1518,
  m_ = n.__chunk_1402,
  p_ = n.__chunk_1067,
  f_ = n.__chunk_2731,
  g_ = n.__chunk_8388,
  b_ = n.__chunk_4350,
  x_ = n.__chunk_8248,
  y_ = n.__chunk_9216,
  j_ = n.__chunk_8836,
  P_ = n.__chunk_4265,
  E_ = n.__chunk_4460,
  v_ = n.__chunk_3821,
  N_ = n.__chunk_9468,
  w_ = n.__chunk_5553,
  R_ = n.__chunk_6385,
  S_ = n.__chunk_2249,
  O_ = n.__chunk_9893,
  T_ = n.__chunk_9161,
  I_ = n.__chunk_3278,
  C_ = n.__chunk_4858,
  M_ = n.__chunk_725,
  A_ = n.__chunk_4273,
  F_ = n.__chunk_9240,
  $_ = n.__chunk_2134,
  D_ = n.__chunk_2418,
  q_ = n.__chunk_6983,
  L_ = n.__chunk_9277,
  B_ = n.__chunk_6905,
  K_ = n.__chunk_3103,
  U_ = n.__chunk_6364,
  W_ = n.__chunk_7724,
  z_ = n.__chunk_1121,
  H_ = n.__chunk_4783,
  G_ = n.__chunk_5009,
  V_ = n.__chunk_70,
  X_ = n.__chunk_7376,
  Y_ = n.__chunk_1261,
  J_ = n.__chunk_5075,
  Q_ = n.__chunk_3408,
  Z_ = n.__chunk_9563,
  nc = n.__chunk_8904,
  ec = n.__chunk_1223,
  tc = n.__chunk_5761,
  _c = n.__chunk_5941,
  cc = n.__chunk_2054,
  sc = n.__chunk_8394,
  ac = n.__chunk_9724,
  oc = n.__chunk_7779,
  rc = n.__chunk_5000,
  uc = n.__chunk_9090,
  dc = n.__chunk_5542,
  ic = n.__chunk_4,
  hc = n.__chunk_8915,
  lc = n.__chunk_7579,
  kc = n.__chunk_5389,
  mc = n.__chunk_5336,
  pc = n.__chunk_6788,
  fc = n.__chunk_2181,
  W = on(m, m, m),
  gc = W.__NEXT_FONT_MANIFEST,
  bc = W.__REACT_LOADABLE_MANIFEST,
  xc = W.__BUILD_MANIFEST,
  yc = W.__RSC_SERVER_MANIFEST,
  Tc = ((r, l, q) => (
    (l._ENTRIES = {}),
    (r.__RSC_SERVER_MANIFEST = yc),
    (l.__RSC_MANIFEST = l.__RSC_MANIFEST || {}),
    (l.__RSC_MANIFEST['/[lng]/orders/page'] = {
      moduleLoading: { prefix: '/_next/', crossOrigin: null },
      ssrModuleMapping: {
        437: { '*': { id: '4323', name: '*', chunks: [], async: !1 } },
        1917: { '*': { id: '4782', name: '*', chunks: [], async: !1 } },
        2456: { '*': { id: '4006', name: '*', chunks: [], async: !1 } },
        3790: { '*': { id: '4672', name: '*', chunks: [], async: !1 } },
        4612: { '*': { id: '8030', name: '*', chunks: [], async: !1 } },
        5298: { '*': { id: '9539', name: '*', chunks: [], async: !1 } },
        5846: { '*': { id: '7970', name: '*', chunks: [], async: !1 } },
        6922: { '*': { id: '2700', name: '*', chunks: [], async: !1 } },
        7336: { '*': { id: '6254', name: '*', chunks: [], async: !1 } },
        8189: { '*': { id: '9650', name: '*', chunks: [], async: !1 } },
        9717: { '*': { id: '6851', name: '*', chunks: [], async: !1 } },
      },
      edgeSSRModuleMapping: {
        434: { '*': { id: '7508', name: '*', chunks: [], async: !1 } },
        437: { '*': { id: '1082', name: '*', chunks: [], async: !1 } },
        528: { '*': { id: '8140', name: '*', chunks: [], async: !1 } },
        560: { '*': { id: '3290', name: '*', chunks: [], async: !1 } },
        983: { '*': { id: '2230', name: '*', chunks: [], async: !1 } },
        1127: { '*': { id: '9778', name: '*', chunks: [], async: !1 } },
        1251: { '*': { id: '2803', name: '*', chunks: [], async: !1 } },
        1399: { '*': { id: '8077', name: '*', chunks: [], async: !1 } },
        1917: { '*': { id: '2459', name: '*', chunks: [], async: !1 } },
        2456: { '*': { id: '3103', name: '*', chunks: [], async: !1 } },
        3398: { '*': { id: '9458', name: '*', chunks: [], async: !1 } },
        3790: { '*': { id: '5115', name: '*', chunks: [], async: !1 } },
        3981: { '*': { id: '7504', name: '*', chunks: [], async: !1 } },
        4398: { '*': { id: '8146', name: '*', chunks: [], async: !1 } },
        4612: { '*': { id: '7538', name: '*', chunks: [], async: !1 } },
        4703: { '*': { id: '8818', name: '*', chunks: [], async: !1 } },
        5298: { '*': { id: '2249', name: '*', chunks: [], async: !1 } },
        5419: { '*': { id: '5521', name: '*', chunks: [], async: !1 } },
        5608: { '*': { id: '8836', name: '*', chunks: [], async: !1 } },
        5611: { '*': { id: '9805', name: '*', chunks: [], async: !1 } },
        5846: { '*': { id: '725', name: '*', chunks: [], async: !1 } },
        6192: { '*': { id: '3826', name: '*', chunks: [], async: !1 } },
        6922: { '*': { id: '9497', name: '*', chunks: [], async: !1 } },
        7152: { '*': { id: '2223', name: '*', chunks: [], async: !1 } },
        7336: { '*': { id: '6983', name: '*', chunks: [], async: !1 } },
        7627: { '*': { id: '1219', name: '*', chunks: [], async: !1 } },
        7914: { '*': { id: '5069', name: '*', chunks: [], async: !1 } },
        8189: { '*': { id: '2134', name: '*', chunks: [], async: !1 } },
        8366: { '*': { id: '6387', name: '*', chunks: [], async: !1 } },
        9326: { '*': { id: '585', name: '*', chunks: [], async: !1 } },
        9713: { '*': { id: '8830', name: '*', chunks: [], async: !1 } },
        9717: { '*': { id: '9277', name: '*', chunks: [], async: !1 } },
        9938: { '*': { id: '3916', name: '*', chunks: [], async: !1 } },
      },
      clientModules: {
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/client/components/app-router.js':
          { id: 2456, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/esm/client/components/app-router.js':
          { id: 2456, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/client/components/client-page.js':
          { id: 9717, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/esm/client/components/client-page.js':
          { id: 9717, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/client/components/error-boundary.js':
          { id: 7336, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/esm/client/components/error-boundary.js':
          { id: 7336, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/client/components/layout-router.js':
          { id: 8189, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/esm/client/components/layout-router.js':
          { id: 8189, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/client/components/not-found-boundary.js':
          { id: 5846, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/esm/client/components/not-found-boundary.js':
          { id: 5846, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/client/components/render-from-template-context.js':
          { id: 5298, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/esm/client/components/render-from-template-context.js':
          { id: 5298, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js':
          { id: 5419, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/esm/shared/lib/app-router-context.shared-runtime.js':
          { id: 5419, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js':
          { id: 7152, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/esm/shared/lib/hooks-client-context.shared-runtime.js':
          { id: 7152, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/shared/lib/loadable-context.shared-runtime.js':
          { id: 9938, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/esm/shared/lib/loadable-context.shared-runtime.js':
          { id: 9938, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/shared/lib/server-inserted-html.shared-runtime.js':
          { id: 3398, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/esm/shared/lib/server-inserted-html.shared-runtime.js':
          { id: 3398, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/app/providers.tsx': {
          id: 6922,
          name: '*',
          chunks: [
            '655',
            'static/chunks/655-56915f9d114b7f4e.js',
            '141',
            'static/chunks/141-9bb230997932d15b.js',
            '855',
            'static/chunks/855-fae9702efe576cfb.js',
            '185',
            'static/chunks/app/layout-88a37b7818c0d151.js',
          ],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/app/query-provider.tsx': {
          id: 4612,
          name: '*',
          chunks: [
            '655',
            'static/chunks/655-56915f9d114b7f4e.js',
            '141',
            'static/chunks/141-9bb230997932d15b.js',
            '855',
            'static/chunks/855-fae9702efe576cfb.js',
            '185',
            'static/chunks/app/layout-88a37b7818c0d151.js',
          ],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/components/common/theme-provider.tsx': {
          id: 3790,
          name: '*',
          chunks: [
            '655',
            'static/chunks/655-56915f9d114b7f4e.js',
            '141',
            'static/chunks/141-9bb230997932d15b.js',
            '855',
            'static/chunks/855-fae9702efe576cfb.js',
            '185',
            'static/chunks/app/layout-88a37b7818c0d151.js',
          ],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/components/common/toast.tsx': {
          id: 1917,
          name: '*',
          chunks: [
            '655',
            'static/chunks/655-56915f9d114b7f4e.js',
            '141',
            'static/chunks/141-9bb230997932d15b.js',
            '855',
            'static/chunks/855-fae9702efe576cfb.js',
            '185',
            'static/chunks/app/layout-88a37b7818c0d151.js',
          ],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next-intl@4.4.0_next@14.2.5_react@18.3.1_typescript@5.9.3/node_modules/next-intl/dist/esm/production/shared/NextIntlClientProvider.js':
          {
            id: 437,
            name: '*',
            chunks: [
              '655',
              'static/chunks/655-56915f9d114b7f4e.js',
              '141',
              'static/chunks/141-9bb230997932d15b.js',
              '855',
              'static/chunks/855-fae9702efe576cfb.js',
              '185',
              'static/chunks/app/layout-88a37b7818c0d151.js',
            ],
            async: !1,
          },
        '/mnt/d/Projects/b2b-marketplace/frontend/styles/globals.css': {
          id: 659,
          name: '*',
          chunks: [
            '655',
            'static/chunks/655-56915f9d114b7f4e.js',
            '141',
            'static/chunks/141-9bb230997932d15b.js',
            '855',
            'static/chunks/855-fae9702efe576cfb.js',
            '185',
            'static/chunks/app/layout-88a37b7818c0d151.js',
          ],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/font/google/target.css?{"path":"libs/config/fonts.ts","import":"Inter","arguments":[{"subsets":["latin"],"variable":"--font-sans","display":"swap"}],"variableName":"inter"}':
          {
            id: 2529,
            name: '*',
            chunks: [
              '655',
              'static/chunks/655-56915f9d114b7f4e.js',
              '141',
              'static/chunks/141-9bb230997932d15b.js',
              '855',
              'static/chunks/855-fae9702efe576cfb.js',
              '185',
              'static/chunks/app/layout-88a37b7818c0d151.js',
            ],
            async: !1,
          },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/font/local/target.css?{"path":"libs/config/fonts.ts","import":"","arguments":[{"variable":"--font-rtl","display":"swap","src":[{"path":"../../public/fonts/cairo/cairo-arabic.woff2","weight":"400 700","style":"normal"}]}],"variableName":"cairo"}':
          {
            id: 2454,
            name: '*',
            chunks: [
              '655',
              'static/chunks/655-56915f9d114b7f4e.js',
              '141',
              'static/chunks/141-9bb230997932d15b.js',
              '855',
              'static/chunks/855-fae9702efe576cfb.js',
              '185',
              'static/chunks/app/layout-88a37b7818c0d151.js',
            ],
            async: !1,
          },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/font/google/target.css?{"path":"libs/config/fonts.ts","import":"Inter","arguments":[{"subsets":["latin"],"weight":["500","600","700"],"variable":"--font-heading","display":"swap"}],"variableName":"heading"}':
          {
            id: 6679,
            name: '*',
            chunks: [
              '655',
              'static/chunks/655-56915f9d114b7f4e.js',
              '141',
              'static/chunks/141-9bb230997932d15b.js',
              '855',
              'static/chunks/855-fae9702efe576cfb.js',
              '185',
              'static/chunks/app/layout-88a37b7818c0d151.js',
            ],
            async: !1,
          },
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/admin/users/admin-users.tsx': {
          id: 3981,
          name: '*',
          chunks: [],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/components/common/app-shell.tsx': {
          id: 7914,
          name: '*',
          chunks: [
            '655',
            'static/chunks/655-56915f9d114b7f4e.js',
            '43',
            'static/chunks/43-fa995ca364ebf5a6.js',
            '855',
            'static/chunks/855-fae9702efe576cfb.js',
            '737',
            'static/chunks/app/%5Blng%5D/orders/page-9b40e4206aef8781.js',
          ],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/components/ui/button.tsx': {
          id: 5611,
          name: '*',
          chunks: [
            '655',
            'static/chunks/655-56915f9d114b7f4e.js',
            '43',
            'static/chunks/43-fa995ca364ebf5a6.js',
            '855',
            'static/chunks/855-fae9702efe576cfb.js',
            '866',
            'static/chunks/app/%5Blng%5D/page-e2dd5d2cf6b5f232.js',
          ],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/components/ui/card.tsx': {
          id: 560,
          name: '*',
          chunks: [
            '655',
            'static/chunks/655-56915f9d114b7f4e.js',
            '43',
            'static/chunks/43-fa995ca364ebf5a6.js',
            '855',
            'static/chunks/855-fae9702efe576cfb.js',
            '866',
            'static/chunks/app/%5Blng%5D/page-e2dd5d2cf6b5f232.js',
          ],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/client/link.js':
          {
            id: 5608,
            name: '*',
            chunks: [
              '655',
              'static/chunks/655-56915f9d114b7f4e.js',
              '43',
              'static/chunks/43-fa995ca364ebf5a6.js',
              '855',
              'static/chunks/855-fae9702efe576cfb.js',
              '866',
              'static/chunks/app/%5Blng%5D/page-e2dd5d2cf6b5f232.js',
            ],
            async: !1,
          },
        '/mnt/d/Projects/b2b-marketplace/frontend/node_modules/.pnpm/next@14.2.5_@babel+core@7.28.5_@playwright+test@1.56.1_react-dom@18.3.1_react@18.3.1/node_modules/next/dist/esm/client/link.js':
          {
            id: 5608,
            name: '*',
            chunks: [
              '655',
              'static/chunks/655-56915f9d114b7f4e.js',
              '43',
              'static/chunks/43-fa995ca364ebf5a6.js',
              '855',
              'static/chunks/855-fae9702efe576cfb.js',
              '866',
              'static/chunks/app/%5Blng%5D/page-e2dd5d2cf6b5f232.js',
            ],
            async: !1,
          },
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/admin/dashboard/admin-dashboard.tsx': {
          id: 1127,
          name: '*',
          chunks: [],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/auth/signin/sign-in-form.tsx': {
          id: 7627,
          name: '*',
          chunks: [],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/auth/register/register-form.tsx': {
          id: 4398,
          name: '*',
          chunks: [],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/catalog/catalog-content.tsx': {
          id: 9713,
          name: '*',
          chunks: [],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/quotes/quote-inbox.tsx': {
          id: 434,
          name: '*',
          chunks: [],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/orders/orders-workspace.tsx': {
          id: 983,
          name: '*',
          chunks: [
            '655',
            'static/chunks/655-56915f9d114b7f4e.js',
            '43',
            'static/chunks/43-fa995ca364ebf5a6.js',
            '855',
            'static/chunks/855-fae9702efe576cfb.js',
            '737',
            'static/chunks/app/%5Blng%5D/orders/page-9b40e4206aef8781.js',
          ],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/rfq/rfq-dashboard.tsx': {
          id: 1399,
          name: '*',
          chunks: [],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/orders/[orderId]/order-detail.tsx': {
          id: 8366,
          name: '*',
          chunks: [],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/product/[id]/product-detail.tsx': {
          id: 528,
          name: '*',
          chunks: [],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/rfq/new/rfq-create-form.tsx': {
          id: 9326,
          name: '*',
          chunks: [],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/admin/feature-flags/feature-flags-admin.tsx':
          { id: 4703, name: '*', chunks: [], async: !1 },
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/wallet/wallet-overview.tsx': {
          id: 1251,
          name: '*',
          chunks: [],
          async: !1,
        },
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/supplier/quotes/inbox/supplier-quote-inbox.tsx':
          { id: 6192, name: '*', chunks: [], async: !1 },
      },
      entryCSSFiles: {
        '/mnt/d/Projects/b2b-marketplace/frontend/': [],
        '/mnt/d/Projects/b2b-marketplace/frontend/app/layout': ['static/css/047186558a7712c9.css'],
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/layout': [],
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/page': [],
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/orders/page': [],
      },
    }),
    (r.__BUILD_MANIFEST = xc),
    (r.__REACT_LOADABLE_MANIFEST = bc),
    (r.__NEXT_FONT_MANIFEST = gc),
    (r.__INTERCEPTION_ROUTE_REWRITE_MANIFEST = '[]'),
    (r.__PRERENDER_MANIFEST =
      '{"version":4,"routes":{},"dynamicRoutes":{},"notFoundRoutes":[],"preview":{"previewModeId":"process.env.__NEXT_PREVIEW_MODE_ID","previewModeSigningKey":"process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY","previewModeEncryptionKey":"process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY"}}'),
    (() => {
      'use strict';
      var b = {},
        g = {};
      function e(t) {
        var o = g[t];
        if (o !== void 0) return o.exports;
        var s = (g[t] = { exports: {} }),
          h = !0;
        try {
          (b[t](s, s.exports, e), (h = !1));
        } finally {
          h && delete g[t];
        }
        return s.exports;
      }
      ((e.m = b),
        (e.amdO = {}),
        (() => {
          var t = [];
          e.O = (o, s, h, p) => {
            if (s) {
              p = p || 0;
              for (var i = t.length; i > 0 && t[i - 1][2] > p; i--) t[i] = t[i - 1];
              t[i] = [s, h, p];
              return;
            }
            for (var k = 1 / 0, i = 0; i < t.length; i++) {
              for (var [s, h, p] = t[i], f = !0, j = 0; j < s.length; j++)
                k >= p && Object.keys(e.O).every((w) => e.O[w](s[j]))
                  ? s.splice(j--, 1)
                  : ((f = !1), p < k && (k = p));
              if (f) {
                t.splice(i--, 1);
                var u = h();
                u !== void 0 && (o = u);
              }
            }
            return o;
          };
        })(),
        (e.n = (t) => {
          var o = t && t.__esModule ? () => t.default : () => t;
          return (e.d(o, { a: o }), o);
        }),
        (() => {
          var t,
            o = Object.getPrototypeOf ? (s) => Object.getPrototypeOf(s) : (s) => s.__proto__;
          e.t = function (s, h) {
            if (
              (1 & h && (s = this(s)),
              8 & h ||
                (typeof s == 'object' &&
                  s &&
                  ((4 & h && s.__esModule) || (16 & h && typeof s.then == 'function'))))
            )
              return s;
            var p = Object.create(null);
            e.r(p);
            var i = {};
            t = t || [null, o({}), o([]), o(o)];
            for (var k = 2 & h && s; typeof k == 'object' && !~t.indexOf(k); k = o(k))
              Object.getOwnPropertyNames(k).forEach((f) => (i[f] = () => s[f]));
            return ((i.default = () => s), e.d(p, i), p);
          };
        })(),
        (e.d = (t, o) => {
          for (var s in o)
            e.o(o, s) && !e.o(t, s) && Object.defineProperty(t, s, { enumerable: !0, get: o[s] });
        }),
        (e.e = () => Promise.resolve()),
        (e.g = (function () {
          if (typeof l == 'object') return l;
          try {
            return this || Function('return this')();
          } catch {
            if (typeof window == 'object') return window;
          }
        })()),
        (e.o = (t, o) => Object.prototype.hasOwnProperty.call(t, o)),
        (e.r = (t) => {
          (typeof Symbol < 'u' &&
            Symbol.toStringTag &&
            Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
            Object.defineProperty(t, '__esModule', { value: !0 }));
        }),
        (() => {
          var t = { 993: 0 };
          e.O.j = (h) => t[h] === 0;
          var o = (h, p) => {
              var i,
                k,
                [f, j, u] = p,
                P = 0;
              if (f.some((M) => t[M] !== 0)) {
                for (i in j) e.o(j, i) && (e.m[i] = j[i]);
                if (u) var T = u(e);
              }
              for (h && h(p); P < f.length; P++)
                ((k = f[P]), e.o(t, k) && t[k] && t[k][0](), (t[k] = 0));
              return e.O(T);
            },
            s = (r.webpackChunk_N_E = r.webpackChunk_N_E || []);
          (s.forEach(o.bind(null, 0)), (s.push = o.bind(null, s.push.bind(s))));
        })());
    })(),
    (r.webpackChunk_N_E = r.webpackChunk_N_E || []).push([
      [365],
      {
        2181: fc,
        6788: pc,
        5336: mc,
        5389: kc,
        7579: lc,
        8915: hc,
        4: ic,
        5542: dc,
        9090: uc,
        5e3: rc,
        7779: oc,
        9724: ac,
        8394: sc,
        2054: cc,
        5941: _c,
        5761: tc,
        1223: ec,
        8904: nc,
        9563: Z_,
        3408: Q_,
        5075: J_,
        1261: Y_,
        7376: X_,
        70: V_,
        5009: G_,
        4783: H_,
        1121: z_,
        7724: W_,
        6364: U_,
        3103: K_,
        6905: B_,
        9277: L_,
        6983: q_,
        2418: D_,
        2134: $_,
        9240: F_,
        4273: A_,
        725: M_,
        4858: C_,
        3278: I_,
        9161: T_,
        9893: O_,
        2249: S_,
        6385: R_,
        5553: w_,
        9468: N_,
        3821: v_,
        4460: E_,
        4265: P_,
        8836: j_,
        9216: y_,
        8248: x_,
        4350: b_,
        8388: g_,
        2731: f_,
        1067: p_,
        1402: m_,
        1518: k_,
        3573: l_,
        1571: h_,
        4527: i_,
        282: d_,
        3972: u_,
        3160: r_,
        6618: o_,
        4180: a_,
        1331: s_,
        252: c_,
        6613: __,
        5365: t_,
        5060: e_,
        2413: n_,
        9334: Zt,
        219: Qt,
        8430: Jt,
        9004: Yt,
        8799: Xt,
        4833: Vt,
        5771: Gt,
        4598: Ht,
        614: zt,
        5401: Wt,
        5448: Ut,
        4709: Kt,
        1349: Bt,
        5758: Lt,
        5521: qt,
        6575: Dt,
        8997: $t,
        8186: Ft,
        1478: At,
        6299: Mt,
        2223: Ct,
        9104: It,
        4576: Tt,
        4505: Ot,
        3916: St,
        6725: Rt,
        627: wt,
        4360: Nt,
        8402: vt,
        6828: Et,
        2798: Pt,
        7497: jt,
        3254: yt,
        225: xt,
        1646: bt,
        2990: gt,
        1875: ft,
        151: pt,
        9491: mt,
        4119: kt,
        6612: lt,
        4497: ht,
        9458: it,
        5929: dt,
        207: ut,
        6450: rt,
        758: ot,
        8556: at,
        3746: st,
        7329: ct,
        5143: _t,
        5159: tt,
        5991: et,
        2041: nt,
        2940: Ze,
        4627: Qe,
        4634: Je,
        1502: Ye,
        4703: Xe,
        291: Ve,
        8433: Ge,
        9154: He,
        253: ze,
        8427: We,
        1298: Ue,
        4977: Ke,
        2222: Be,
        712: Le,
        7185: qe,
        6482: De,
        2161: $e,
        3196: Fe,
        1511: Ae,
        7700: Me,
        602: yn,
        9228: xn,
        8868: Ce,
        935: bn,
        4510: Ie,
        4793: Te,
        9145: Oe,
        575: Se,
        3831: Re,
        6977: we,
        4114: Ne,
        9327: ve,
        3065: Ee,
        5737: Pe,
        4990: je,
        5318: ye,
        407: xe,
        9212: be,
        7309: ge,
        3758: fe,
        8712: pe,
        106: me,
        5942: ke,
        2714: le,
        4314: he,
        3326: ie,
        434: de,
        1209: ue,
        9712: re,
        1082: oe,
        5579: ae,
        8981: se,
        4508: ce,
        3435: _e,
        4961: te,
        7850: ee,
        5588: ne,
        7042: Zn,
        1661: Qn,
        9182: Jn,
        5765: Yn,
      },
    ]),
    (r.webpackChunk_N_E = r.webpackChunk_N_E || []).push([
      [61],
      {
        7713: Xn,
        7130: Vn,
        3906: Gn,
        2208: Hn,
        9497: zn,
        7538: Wn,
        5069: Un,
        5115: Kn,
        2459: Bn,
        9805: Ln,
        7617: qn,
        5424: Dn,
        5460: $n,
        1644: Fn,
        696: An,
        5482: Mn,
        1368: Cn,
        164: In,
        8741: Tn,
        4085: On,
        336: Sn,
        4672: Rn,
        4851: wn,
        2530: Nn,
        5530: vn,
        8034: En,
        8700: Pn,
        9316: jn,
      },
    ]),
    (r.webpackChunk_N_E = r.webpackChunk_N_E || []).push([
      [737],
      {
        2067: gn,
        6195: fn,
        5585: (b, g, e) => {
          'use strict';
          (e.r(g), e.d(g, { ComponentMod: () => c, default: () => N }));
          var t,
            o = {};
          (e.r(o),
            e.d(o, {
              AppRouter: () => u.WY,
              ClientPageRoot: () => u.b1,
              GlobalError: () => j.ZP,
              LayoutRouter: () => u.yO,
              NotFoundBoundary: () => u.O4,
              Postpone: () => u.hQ,
              RenderFromTemplateContext: () => u.b5,
              __next_app__: () => E,
              actionAsyncStorage: () => u.Wz,
              createDynamicallyTrackedSearchParams: () => u.rL,
              createUntrackedSearchParams: () => u.S5,
              decodeAction: () => u.Hs,
              decodeFormState: () => u.dH,
              decodeReply: () => u.kf,
              originalPathname: () => M,
              pages: () => T,
              patchFetch: () => u.XH,
              preconnect: () => u.$P,
              preloadFont: () => u.C5,
              preloadStyle: () => u.oH,
              renderToReadableStream: () => u.aW,
              requestAsyncStorage: () => u.Fg,
              routeModule: () => w,
              serverHooks: () => u.GP,
              staticGenerationAsyncStorage: () => u.AT,
              taintObjectReference: () => u.nr,
              tree: () => P,
            }),
            e(4833));
          var s = e(9004),
            h = e(4783),
            p = e(252),
            i = e(3573),
            k = e(3196),
            f = e(2161),
            j = e(4977),
            u = e(6482);
          let P = [
              '',
              {
                children: [
                  '[lng]',
                  {
                    children: [
                      'orders',
                      {
                        children: [
                          '__PAGE__',
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(e.bind(e, 5211)),
                              '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/orders/page.tsx',
                            ],
                          },
                        ],
                      },
                      {},
                    ],
                  },
                  {
                    layout: [
                      () => Promise.resolve().then(e.bind(e, 8741)),
                      '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/layout.tsx',
                    ],
                  },
                ],
              },
              {
                layout: [
                  () => Promise.resolve().then(e.bind(e, 4085)),
                  '/mnt/d/Projects/b2b-marketplace/frontend/app/layout.tsx',
                ],
                'not-found': [
                  () => Promise.resolve().then(e.bind(e, 712)),
                  'next/dist/client/components/not-found-error',
                ],
              },
            ],
            T = ['/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/orders/page.tsx'],
            M = '/[lng]/orders/page',
            E = { require: e, loadChunk: () => Promise.resolve() },
            w = new k.AppPageRouteModule({
              definition: {
                kind: f.x.APP_PAGE,
                page: '/[lng]/orders/page',
                pathname: '/[lng]/orders',
                bundlePath: '',
                filename: '',
                appPaths: [],
              },
              userland: { loaderTree: P },
            });
          var L = e(8388),
            D = e(4527),
            A = e(1518);
          let R = (x) => (x ? JSON.parse(x) : void 0),
            I = r.__BUILD_MANIFEST,
            B = R(r.__PRERENDER_MANIFEST),
            v = R(r.__REACT_LOADABLE_MANIFEST),
            S = (t = r.__RSC_MANIFEST) == null ? void 0 : t['/[lng]/orders/page'],
            y = R(r.__RSC_SERVER_MANIFEST),
            _ = R(r.__NEXT_FONT_MANIFEST),
            d = R(r.__INTERCEPTION_ROUTE_REWRITE_MANIFEST) ?? [];
          S &&
            y &&
            (0, D.Mo)({
              clientReferenceManifest: S,
              serverActionsManifest: y,
              serverModuleMap: (0, A.w)({
                serverActionsManifest: y,
                pageName: '/[lng]/orders/page',
              }),
            });
          let a = (0, h.d)({
              pagesType: L.s.APP,
              dev: !1,
              page: '/[lng]/orders/page',
              appMod: null,
              pageMod: o,
              errorMod: null,
              error500Mod: null,
              Document: null,
              buildManifest: I,
              prerenderManifest: B,
              renderToHTML: i.f,
              reactLoadableManifest: v,
              clientReferenceManifest: S,
              serverActionsManifest: y,
              serverActions: void 0,
              subresourceIntegrityManifest: void 0,
              config: {
                env: {},
                eslint: { ignoreDuringBuilds: !1, dirs: ['app', 'components', 'libs', 'messages'] },
                typescript: { ignoreBuildErrors: !1, tsconfigPath: 'tsconfig.json' },
                distDir: '.next',
                cleanDistDir: !0,
                assetPrefix: '',
                cacheMaxMemorySize: 52428800,
                configOrigin: 'next.config.mjs',
                useFileSystemPublicRoutes: !0,
                generateEtags: !0,
                pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
                poweredByHeader: !0,
                compress: !0,
                analyticsId: '',
                images: {
                  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
                  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
                  path: '/_next/image',
                  loader: 'default',
                  loaderFile: '',
                  domains: [],
                  disableStaticImages: !1,
                  minimumCacheTTL: 60,
                  formats: ['image/webp'],
                  dangerouslyAllowSVG: !1,
                  contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
                  contentDispositionType: 'inline',
                  remotePatterns: [{ protocol: 'https', hostname: '**' }],
                  unoptimized: !1,
                },
                devIndicators: { buildActivity: !0, buildActivityPosition: 'bottom-right' },
                onDemandEntries: { maxInactiveAge: 6e4, pagesBufferLength: 5 },
                amp: { canonicalBase: '' },
                basePath: '',
                sassOptions: {},
                trailingSlash: !1,
                i18n: null,
                productionBrowserSourceMaps: !1,
                optimizeFonts: !0,
                excludeDefaultMomentLocales: !0,
                serverRuntimeConfig: {},
                publicRuntimeConfig: {},
                reactProductionProfiling: !1,
                reactStrictMode: null,
                httpAgentOptions: { keepAlive: !0 },
                outputFileTracing: !0,
                staticPageGenerationTimeout: 60,
                swcMinify: !0,
                modularizeImports: {
                  '@mui/icons-material': { transform: '@mui/icons-material/{{member}}' },
                  lodash: { transform: 'lodash/{{member}}' },
                },
                experimental: {
                  prerenderEarlyExit: !1,
                  serverMinification: !0,
                  serverSourceMaps: !1,
                  linkNoTouchStart: !1,
                  caseSensitiveRoutes: !1,
                  clientRouterFilter: !0,
                  clientRouterFilterRedirects: !1,
                  fetchCacheKeyPrefix: '',
                  middlewarePrefetch: 'flexible',
                  optimisticClientCache: !0,
                  manualClientBasePath: !1,
                  cpus: 7,
                  memoryBasedWorkersCount: !1,
                  isrFlushToDisk: !0,
                  workerThreads: !1,
                  optimizeCss: !1,
                  nextScriptWorkers: !1,
                  scrollRestoration: !1,
                  externalDir: !1,
                  disableOptimizedLoading: !1,
                  gzipSize: !0,
                  craCompat: !1,
                  esmExternals: !0,
                  fullySpecified: !1,
                  outputFileTracingRoot: '/mnt/d/Projects/b2b-marketplace/frontend',
                  swcTraceProfiling: !1,
                  forceSwcTransforms: !1,
                  largePageDataBytes: 128e3,
                  adjustFontFallbacks: !1,
                  adjustFontFallbacksWithSizeAdjust: !1,
                  typedRoutes: !0,
                  instrumentationHook: !1,
                  bundlePagesExternals: !1,
                  parallelServerCompiles: !1,
                  parallelServerBuildTraces: !1,
                  ppr: !1,
                  missingSuspenseWithCSRBailout: !0,
                  optimizeServerReact: !0,
                  useEarlyImport: !1,
                  staleTimes: { dynamic: 30, static: 300 },
                  optimizePackageImports: [
                    'lucide-react',
                    'date-fns',
                    'lodash-es',
                    'ramda',
                    'antd',
                    'react-bootstrap',
                    'ahooks',
                    '@ant-design/icons',
                    '@headlessui/react',
                    '@headlessui-float/react',
                    '@heroicons/react/20/solid',
                    '@heroicons/react/24/solid',
                    '@heroicons/react/24/outline',
                    '@visx/visx',
                    '@tremor/react',
                    'rxjs',
                    '@mui/material',
                    '@mui/icons-material',
                    'recharts',
                    'react-use',
                    '@material-ui/core',
                    '@material-ui/icons',
                    '@tabler/icons-react',
                    'mui-core',
                    'react-icons/ai',
                    'react-icons/bi',
                    'react-icons/bs',
                    'react-icons/cg',
                    'react-icons/ci',
                    'react-icons/di',
                    'react-icons/fa',
                    'react-icons/fa6',
                    'react-icons/fc',
                    'react-icons/fi',
                    'react-icons/gi',
                    'react-icons/go',
                    'react-icons/gr',
                    'react-icons/hi',
                    'react-icons/hi2',
                    'react-icons/im',
                    'react-icons/io',
                    'react-icons/io5',
                    'react-icons/lia',
                    'react-icons/lib',
                    'react-icons/lu',
                    'react-icons/md',
                    'react-icons/pi',
                    'react-icons/ri',
                    'react-icons/rx',
                    'react-icons/si',
                    'react-icons/sl',
                    'react-icons/tb',
                    'react-icons/tfi',
                    'react-icons/ti',
                    'react-icons/vsc',
                    'react-icons/wi',
                  ],
                },
                configFile: '/mnt/d/Projects/b2b-marketplace/frontend/next.config.mjs',
                configFileName: 'next.config.mjs',
                transpilePackages: ['sonner'],
              },
              buildId: 'K55Yx2JiiJu9pJx_lf4NK',
              nextFontManifest: _,
              incrementalCacheHandler: null,
              interceptionRouteRewrites: d,
            }),
            c = o;
          function N(x) {
            return (0, s.C)({ ...x, IncrementalCache: p.k, handler: a });
          }
        },
        1509: (b, g, e) => {
          (Promise.resolve().then(e.bind(e, 2230)), Promise.resolve().then(e.bind(e, 5069)));
        },
        2230: (b, g, e) => {
          'use strict';
          e.d(g, { OrdersWorkspace: () => M });
          var t = e(3408),
            o = e(9563),
            s = e(9712),
            h = e(3435),
            p = e(8981),
            i = e(2516),
            k = e(9805),
            f = e(3290),
            j = e(1746),
            u = e(5424),
            P = e(7617),
            T = e(8586);
          let M = () => {
            let E = (0, s.T_)('orders'),
              w = (0, s.T_)('common.actions'),
              L = (0, s.T_)('common.status'),
              D = (0, h.bU)(),
              [A, R] = (0, o.useState)(''),
              [I, B] = (0, o.useState)(''),
              v = (0, u.gz)(I, { query: { enabled: !!I } }),
              S = (0, u.QE)({
                mutation: {
                  onSuccess: (c) => {
                    (p.Am.success('Order created', {
                      description: c.id ? `Order ${c.id} created.` : 'Order created.',
                    }),
                      c.id && B(c.id));
                  },
                  onError: (c) => (0, P.Hv)(c),
                },
              }),
              y = (0, u.rV)({
                mutation: {
                  onSuccess: (c) => {
                    (p.Am.success('Order paid with wallet', {
                      description: `Order ${c.id} payment succeeded.`,
                    }),
                      v.refetch());
                  },
                  onError: (c) => (0, P.Hv)(c),
                },
              }),
              _ = async () => {
                if (A)
                  try {
                    await S.mutateAsync({ data: { quoteId: A } });
                  } catch (c) {
                    (0, P.Hv)(c);
                  }
              },
              d = async () => {
                if (I)
                  try {
                    await y.mutateAsync({ orderId: I, data: {} });
                  } catch (c) {
                    (0, P.Hv)(c);
                  }
              },
              a = v.data;
            return (0, t.jsxs)('div', {
              className: 'space-y-6 p-6',
              children: [
                (0, t.jsx)(i.m, {
                  title: E('title'),
                  breadcrumbs: [{ label: E('title') }],
                  actions: (0, t.jsxs)('div', {
                    className: 'flex items-center gap-2',
                    children: [
                      (0, t.jsx)(j.I, {
                        placeholder: 'Quote ID',
                        value: A,
                        onChange: (c) => R(c.target.value),
                        className: 'w-48',
                      }),
                      (0, t.jsx)(k.Button, {
                        onClick: _,
                        disabled: S.isPending,
                        children: w('submit'),
                      }),
                    ],
                  }),
                }),
                a
                  ? (0, t.jsxs)(f.Card, {
                      children: [
                        (0, t.jsx)(f.Ol, {
                          children: (0, t.jsx)(f.ll, { children: E('detail.summary') }),
                        }),
                        (0, t.jsxs)(f.CardContent, {
                          className: 'text-muted-foreground space-y-4 text-sm',
                          children: [
                            (0, t.jsxs)('div', {
                              className: 'grid gap-4 md:grid-cols-2',
                              children: [
                                (0, t.jsxs)('div', {
                                  children: [
                                    (0, t.jsx)('span', {
                                      className:
                                        'text-muted-foreground/80 block text-xs uppercase tracking-wide',
                                      children: w('view'),
                                    }),
                                    (0, t.jsx)('span', {
                                      className: 'text-sm text-foreground',
                                      children: a.id ?? '-',
                                    }),
                                  ],
                                }),
                                (0, t.jsxs)('div', {
                                  children: [
                                    (0, t.jsx)('span', {
                                      className:
                                        'text-muted-foreground/80 block text-xs uppercase tracking-wide',
                                      children: E('detail.status'),
                                    }),
                                    (0, t.jsx)('span', {
                                      className: 'text-sm text-foreground',
                                      children: L(a.status),
                                    }),
                                  ],
                                }),
                                (0, t.jsxs)('div', {
                                  children: [
                                    (0, t.jsx)('span', {
                                      className:
                                        'text-muted-foreground/80 block text-xs uppercase tracking-wide',
                                      children: 'Subtotal',
                                    }),
                                    (0, t.jsx)('span', {
                                      className: 'text-sm text-foreground',
                                      children: (0, T.xG)(a.subtotal ?? 0, a.currency ?? 'USD', D),
                                    }),
                                  ],
                                }),
                                (0, t.jsxs)('div', {
                                  children: [
                                    (0, t.jsx)('span', {
                                      className:
                                        'text-muted-foreground/80 block text-xs uppercase tracking-wide',
                                      children: 'Grand Total',
                                    }),
                                    (0, t.jsx)('span', {
                                      className: 'text-sm text-foreground',
                                      children: (0, T.xG)(
                                        a.grandTotal ?? 0,
                                        a.currency ?? 'USD',
                                        D,
                                      ),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, t.jsx)('div', {
                              className: 'flex justify-end',
                              children: (0, t.jsx)(k.Button, {
                                onClick: d,
                                disabled: y.isPending,
                                children: E('detail.payCta'),
                              }),
                            }),
                          ],
                        }),
                      ],
                    })
                  : (0, t.jsx)(f.Card, {
                      children: (0, t.jsx)(f.CardContent, {
                        className: 'text-muted-foreground py-10 text-sm',
                        children: 'Create an order from an accepted quote to view details here.',
                      }),
                    }),
              ],
            });
          };
        },
        2516: pn,
        3290: kn,
        1746: hn,
        8586: un,
        5211: (b, g, e) => {
          'use strict';
          (e.r(g), e.d(g, { default: () => f }));
          var t = e(9154),
            o = e(336),
            s = e(1298);
          let h = (0, s.D)(
              String.raw`/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/orders/orders-workspace.tsx`,
            ),
            { __esModule: p, $$typeof: i } = h;
          h.default;
          let k = (0, s.D)(
            String.raw`/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/orders/orders-workspace.tsx#OrdersWorkspace`,
          );
          function f() {
            return (0, t.jsx)(o.V, { children: (0, t.jsx)(k, {}) });
          }
        },
      },
      (b) => {
        var g = (t) => b((b.s = t));
        b.O(0, [365, 61], () => g(5585));
        var e = b.O();
        (l._ENTRIES = typeof l._ENTRIES > 'u' ? {} : l._ENTRIES)[
          'middleware_app/[lng]/orders/page'
        ] = e;
      },
    ]),
    function () {
      let b = { exports: {}, loaded: !1 };
      return (
        (function (e, t) {
          var o = Object.create,
            s = Object.defineProperty,
            h = Object.getOwnPropertyDescriptor,
            p = Object.getOwnPropertyNames,
            i = Object.getPrototypeOf,
            k = Object.prototype.hasOwnProperty,
            f = (_) => s(_, '__esModule', { value: !0 }),
            j = (_, d) => {
              f(_);
              for (var a in d) s(_, a, { get: d[a], enumerable: !0 });
            },
            u = (_, d, a) => {
              if ((d && typeof d == 'object') || typeof d == 'function')
                for (let c of p(d))
                  !k.call(_, c) &&
                    c !== 'default' &&
                    s(_, c, { get: () => d[c], enumerable: !(a = h(d, c)) || a.enumerable });
              return _;
            },
            P = (_) =>
              u(
                f(
                  s(
                    _ != null ? o(i(_)) : {},
                    'default',
                    _ && _.__esModule && 'default' in _
                      ? { get: () => _.default, enumerable: !0 }
                      : { value: _, enumerable: !0 },
                  ),
                ),
                _,
              );
          j(t, { default: () => B });
          var T = P((X(), nn(K))),
            M = '@next/request-context',
            E = Symbol.for(M),
            w = Symbol.for('internal.storage');
          function L() {
            let _ = l;
            if (!_[E]) {
              let d = new T.AsyncLocalStorage(),
                a = { get: () => d.getStore(), [w]: d };
              _[E] = a;
            }
            return _[E];
          }
          var D = L();
          function A(_, d) {
            return D[w].run(_, d);
          }
          function R(_) {
            let d = {};
            return (
              _ &&
                _.forEach((a, c) => {
                  ((d[c] = a), c.toLowerCase() === 'set-cookie' && (d[c] = I(a)));
                }),
              d
            );
          }
          function I(_) {
            let d = [],
              a = 0,
              c,
              N,
              x,
              F,
              $;
            function O() {
              for (; a < _.length && /\s/.test(_.charAt(a)); ) a += 1;
              return a < _.length;
            }
            function C() {
              return ((N = _.charAt(a)), N !== '=' && N !== ';' && N !== ',');
            }
            for (; a < _.length; ) {
              for (c = a, $ = !1; O(); )
                if (((N = _.charAt(a)), N === ',')) {
                  for (x = a, a += 1, O(), F = a; a < _.length && C(); ) a += 1;
                  a < _.length && _.charAt(a) === '='
                    ? (($ = !0), (a = F), d.push(_.substring(c, x)), (c = a))
                    : (a = x + 1);
                } else a += 1;
              (!$ || a >= _.length) && d.push(_.substring(c, _.length));
            }
            return d;
          }
          function B(_) {
            let d = _.staticRoutes.map((c) => ({ regexp: new RegExp(c.namedRegex), page: c.page })),
              a =
                _.dynamicRoutes?.map((c) => ({ regexp: new RegExp(c.namedRegex), page: c.page })) ||
                [];
            return async function (c, N) {
              let x = new URL(c.url).pathname,
                F = {};
              if (
                (_.nextConfig?.basePath &&
                  x.startsWith(_.nextConfig.basePath) &&
                  (x = x.replace(_.nextConfig.basePath, '') || '/'),
                _.nextConfig?.i18n)
              )
                for (let O of _.nextConfig.i18n.locales) {
                  let C = new RegExp(`^/${O}($|/)`, 'i');
                  if (x.match(C)) {
                    x = x.replace(C, '/') || '/';
                    break;
                  }
                }
              for (let O of d)
                if (O.regexp.exec(x)) {
                  F.name = O.page;
                  break;
                }
              if (!F.name) {
                let O = S(x);
                for (let C of a || []) {
                  if (O && !S(C.page)) continue;
                  let G = C.regexp.exec(x);
                  if (G) {
                    F = { name: C.page, params: G.groups };
                    break;
                  }
                }
              }
              let $ = await A({ waitUntil: N.waitUntil }, () =>
                l._ENTRIES[`middleware_${_.name}`].default.call(
                  {},
                  {
                    request: {
                      url: c.url,
                      method: c.method,
                      headers: R(c.headers),
                      ip: v(c.headers, y.Ip),
                      geo: {
                        city: v(c.headers, y.City, !0),
                        country: v(c.headers, y.Country, !0),
                        latitude: v(c.headers, y.Latitude),
                        longitude: v(c.headers, y.Longitude),
                        region: v(c.headers, y.Region, !0),
                      },
                      nextConfig: _.nextConfig,
                      page: F,
                      body: c.body,
                    },
                  },
                ),
              );
              return ($.waitUntil && N.waitUntil($.waitUntil), $.response);
            };
          }
          function v(_, d, a = !1) {
            let c = _.get(d) || void 0;
            return a && c ? decodeURIComponent(c) : c;
          }
          function S(_) {
            return _ === '/api' || _.startsWith('/api/');
          }
          var y;
          (function (_) {
            ((_.City = 'x-vercel-ip-city'),
              (_.Country = 'x-vercel-ip-country'),
              (_.Ip = 'x-real-ip'),
              (_.Latitude = 'x-vercel-ip-latitude'),
              (_.Longitude = 'x-vercel-ip-longitude'),
              (_.Region = 'x-vercel-ip-country-region'));
          })(y || (y = {}));
        })(b, b.exports),
        b.exports
      );
    }
      .call({})
      .default({
        name: 'app/[lng]/orders/page',
        staticRoutes: [
          {
            page: '/_not-found',
            regex: '^/_not\\-found(?:/)?$',
            routeKeys: {},
            namedRegex: '^/_not\\-found(?:/)?$',
          },
        ],
        dynamicRoutes: [
          {
            page: '/[lng]',
            regex: '^/([^/]+?)(?:/)?$',
            routeKeys: { nxtPlng: 'nxtPlng' },
            namedRegex: '^/(?<nxtPlng>[^/]+?)(?:/)?$',
          },
          {
            page: '/[lng]/admin/dashboard',
            regex: '^/([^/]+?)/admin/dashboard(?:/)?$',
            routeKeys: { nxtPlng: 'nxtPlng' },
            namedRegex: '^/(?<nxtPlng>[^/]+?)/admin/dashboard(?:/)?$',
          },
          {
            page: '/[lng]/admin/feature-flags',
            regex: '^/([^/]+?)/admin/feature\\-flags(?:/)?$',
            routeKeys: { nxtPlng: 'nxtPlng' },
            namedRegex: '^/(?<nxtPlng>[^/]+?)/admin/feature\\-flags(?:/)?$',
          },
          {
            page: '/[lng]/admin/users',
            regex: '^/([^/]+?)/admin/users(?:/)?$',
            routeKeys: { nxtPlng: 'nxtPlng' },
            namedRegex: '^/(?<nxtPlng>[^/]+?)/admin/users(?:/)?$',
          },
          {
            page: '/[lng]/auth/register',
            regex: '^/([^/]+?)/auth/register(?:/)?$',
            routeKeys: { nxtPlng: 'nxtPlng' },
            namedRegex: '^/(?<nxtPlng>[^/]+?)/auth/register(?:/)?$',
          },
          {
            page: '/[lng]/auth/signin',
            regex: '^/([^/]+?)/auth/signin(?:/)?$',
            routeKeys: { nxtPlng: 'nxtPlng' },
            namedRegex: '^/(?<nxtPlng>[^/]+?)/auth/signin(?:/)?$',
          },
          {
            page: '/[lng]/catalog',
            regex: '^/([^/]+?)/catalog(?:/)?$',
            routeKeys: { nxtPlng: 'nxtPlng' },
            namedRegex: '^/(?<nxtPlng>[^/]+?)/catalog(?:/)?$',
          },
          {
            page: '/[lng]/orders',
            regex: '^/([^/]+?)/orders(?:/)?$',
            routeKeys: { nxtPlng: 'nxtPlng' },
            namedRegex: '^/(?<nxtPlng>[^/]+?)/orders(?:/)?$',
          },
          {
            page: '/[lng]/orders/[orderId]',
            regex: '^/([^/]+?)/orders/([^/]+?)(?:/)?$',
            routeKeys: { nxtPlng: 'nxtPlng', nxtPorderId: 'nxtPorderId' },
            namedRegex: '^/(?<nxtPlng>[^/]+?)/orders/(?<nxtPorderId>[^/]+?)(?:/)?$',
          },
          {
            page: '/[lng]/product/[id]',
            regex: '^/([^/]+?)/product/([^/]+?)(?:/)?$',
            routeKeys: { nxtPlng: 'nxtPlng', nxtPid: 'nxtPid' },
            namedRegex: '^/(?<nxtPlng>[^/]+?)/product/(?<nxtPid>[^/]+?)(?:/)?$',
          },
          {
            page: '/[lng]/quotes',
            regex: '^/([^/]+?)/quotes(?:/)?$',
            routeKeys: { nxtPlng: 'nxtPlng' },
            namedRegex: '^/(?<nxtPlng>[^/]+?)/quotes(?:/)?$',
          },
          {
            page: '/[lng]/rfq',
            regex: '^/([^/]+?)/rfq(?:/)?$',
            routeKeys: { nxtPlng: 'nxtPlng' },
            namedRegex: '^/(?<nxtPlng>[^/]+?)/rfq(?:/)?$',
          },
          {
            page: '/[lng]/rfq/new',
            regex: '^/([^/]+?)/rfq/new(?:/)?$',
            routeKeys: { nxtPlng: 'nxtPlng' },
            namedRegex: '^/(?<nxtPlng>[^/]+?)/rfq/new(?:/)?$',
          },
          {
            page: '/[lng]/supplier/quotes/inbox',
            regex: '^/([^/]+?)/supplier/quotes/inbox(?:/)?$',
            routeKeys: { nxtPlng: 'nxtPlng' },
            namedRegex: '^/(?<nxtPlng>[^/]+?)/supplier/quotes/inbox(?:/)?$',
          },
          {
            page: '/[lng]/wallet',
            regex: '^/([^/]+?)/wallet(?:/)?$',
            routeKeys: { nxtPlng: 'nxtPlng' },
            namedRegex: '^/(?<nxtPlng>[^/]+?)/wallet(?:/)?$',
          },
        ],
        nextConfig: { basePath: '' },
      })
  ))(m, m, m);
export { Tc as default };
