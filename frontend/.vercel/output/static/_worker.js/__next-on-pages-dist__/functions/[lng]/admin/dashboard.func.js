var V = Object.defineProperty;
var Y = Object.getOwnPropertyDescriptor;
var J = Object.getOwnPropertyNames;
var Q = Object.prototype.hasOwnProperty;
var Z = (r, k) => () => (r && (k = r((r = 0))), k);
var z = (r, k, A, b) => {
    if ((k && typeof k == 'object') || typeof k == 'function')
      for (let p of J(k))
        !Q.call(r, p) &&
          p !== A &&
          V(r, p, { get: () => k[p], enumerable: !(b = Y(k, p)) || b.enumerable });
    return r;
  },
  G = (r, k, A) => (z(r, k, 'default'), A && z(A, k, 'default'));
var nn = (r) => z(V({}, '__esModule', { value: !0 }), r);
var D = {};
import * as xc from 'async_hooks';
var X = Z(() => {
  G(D, xc);
});
import { __getNamedExports as en } from '../../../../__next-on-pages-dist__/webpack/3290.js';
import { __getNamedExports as tn } from '../../../../__next-on-pages-dist__/webpack/2516.js';
import { __getNamedExports as _n } from '../../../../__next-on-pages-dist__/webpack/1831.js';
import { __getNamedExports as cn } from '../../../../__next-on-pages-dist__/webpack/7e5b5057542a677d168ef2f7e421c64a.js';
import { __getNamedExports as sn } from '../../../../__next-on-pages-dist__/webpack/feaf1bd85f055963b24458fea3223a55.js';
import { __getNamedExports as an } from '../../../../__next-on-pages-dist__/manifest/8979b518535174c7eb8d77a6d5a08905.js';
var f = globalThis.__nextOnPagesRoutesIsolation.getProxyFor('/[lng]/admin/dashboard'),
  on = en(f, f, f),
  rn = on.__chunk_3290,
  un = tn(f, f, f),
  dn = un.__chunk_2516,
  hn = _n(f, f, f),
  ln = hn.__chunk_1831,
  $ = cn(f, f, f),
  kn = $.__chunk_6195,
  mn = $.__chunk_2067,
  pn = $.__chunk_935,
  fn = $.__chunk_9228,
  bn = $.__chunk_602,
  n = sn(f, f, f),
  gn = n.__chunk_9316,
  xn = n.__chunk_8700,
  yn = n.__chunk_8034,
  jn = n.__chunk_5530,
  Pn = n.__chunk_2530,
  En = n.__chunk_4851,
  vn = n.__chunk_4672,
  Rn = n.__chunk_336,
  wn = n.__chunk_4085,
  Sn = n.__chunk_8741,
  Nn = n.__chunk_164,
  Mn = n.__chunk_1368,
  Tn = n.__chunk_5482,
  On = n.__chunk_696,
  An = n.__chunk_1644,
  In = n.__chunk_5460,
  Cn = n.__chunk_5424,
  Fn = n.__chunk_7617,
  Dn = n.__chunk_9805,
  $n = n.__chunk_2459,
  Ln = n.__chunk_5115,
  qn = n.__chunk_5069,
  Bn = n.__chunk_7538,
  Kn = n.__chunk_9497,
  Un = n.__chunk_2208,
  Wn = n.__chunk_3906,
  zn = n.__chunk_7130,
  Gn = n.__chunk_7713,
  Hn = n.__chunk_5765,
  Vn = n.__chunk_9182,
  Xn = n.__chunk_1661,
  Yn = n.__chunk_7042,
  Jn = n.__chunk_5588,
  Qn = n.__chunk_7850,
  Zn = n.__chunk_4961,
  ne = n.__chunk_3435,
  ee = n.__chunk_4508,
  te = n.__chunk_8981,
  _e = n.__chunk_5579,
  ce = n.__chunk_1082,
  se = n.__chunk_9712,
  ae = n.__chunk_1209,
  oe = n.__chunk_434,
  re = n.__chunk_3326,
  ue = n.__chunk_4314,
  de = n.__chunk_2714,
  ie = n.__chunk_5942,
  he = n.__chunk_106,
  le = n.__chunk_8712,
  ke = n.__chunk_3758,
  me = n.__chunk_7309,
  pe = n.__chunk_9212,
  fe = n.__chunk_407,
  be = n.__chunk_5318,
  ge = n.__chunk_4990,
  xe = n.__chunk_5737,
  ye = n.__chunk_3065,
  je = n.__chunk_9327,
  Pe = n.__chunk_4114,
  Ee = n.__chunk_6977,
  ve = n.__chunk_3831,
  Re = n.__chunk_575,
  we = n.__chunk_9145,
  Se = n.__chunk_4793,
  Ne = n.__chunk_4510,
  Me = n.__chunk_8868,
  Te = n.__chunk_7700,
  Oe = n.__chunk_1511,
  Ae = n.__chunk_3196,
  Ie = n.__chunk_2161,
  Ce = n.__chunk_6482,
  Fe = n.__chunk_7185,
  De = n.__chunk_712,
  $e = n.__chunk_2222,
  Le = n.__chunk_4977,
  qe = n.__chunk_1298,
  Be = n.__chunk_8427,
  Ke = n.__chunk_253,
  Ue = n.__chunk_9154,
  We = n.__chunk_8433,
  ze = n.__chunk_291,
  Ge = n.__chunk_4703,
  He = n.__chunk_1502,
  Ve = n.__chunk_4634,
  Xe = n.__chunk_4627,
  Ye = n.__chunk_2940,
  Je = n.__chunk_2041,
  Qe = n.__chunk_5991,
  Ze = n.__chunk_5159,
  nt = n.__chunk_5143,
  et = n.__chunk_7329,
  tt = n.__chunk_3746,
  _t = n.__chunk_8556,
  ct = n.__chunk_758,
  st = n.__chunk_6450,
  at = n.__chunk_207,
  ot = n.__chunk_5929,
  rt = n.__chunk_9458,
  ut = n.__chunk_4497,
  dt = n.__chunk_6612,
  it = n.__chunk_4119,
  ht = n.__chunk_9491,
  lt = n.__chunk_151,
  kt = n.__chunk_1875,
  mt = n.__chunk_2990,
  pt = n.__chunk_1646,
  ft = n.__chunk_225,
  bt = n.__chunk_3254,
  gt = n.__chunk_7497,
  xt = n.__chunk_2798,
  yt = n.__chunk_6828,
  jt = n.__chunk_8402,
  Pt = n.__chunk_4360,
  Et = n.__chunk_627,
  vt = n.__chunk_6725,
  Rt = n.__chunk_3916,
  wt = n.__chunk_4505,
  St = n.__chunk_4576,
  Nt = n.__chunk_9104,
  Mt = n.__chunk_2223,
  Tt = n.__chunk_6299,
  Ot = n.__chunk_1478,
  At = n.__chunk_8186,
  It = n.__chunk_8997,
  Ct = n.__chunk_6575,
  Ft = n.__chunk_5521,
  Dt = n.__chunk_5758,
  $t = n.__chunk_1349,
  Lt = n.__chunk_4709,
  qt = n.__chunk_5448,
  Bt = n.__chunk_5401,
  Kt = n.__chunk_614,
  Ut = n.__chunk_4598,
  Wt = n.__chunk_5771,
  zt = n.__chunk_4833,
  Gt = n.__chunk_8799,
  Ht = n.__chunk_9004,
  Vt = n.__chunk_8430,
  Xt = n.__chunk_219,
  Yt = n.__chunk_9334,
  Jt = n.__chunk_2413,
  Qt = n.__chunk_5060,
  Zt = n.__chunk_5365,
  n_ = n.__chunk_6613,
  e_ = n.__chunk_252,
  t_ = n.__chunk_1331,
  __ = n.__chunk_4180,
  c_ = n.__chunk_6618,
  s_ = n.__chunk_3160,
  a_ = n.__chunk_3972,
  o_ = n.__chunk_282,
  r_ = n.__chunk_4527,
  u_ = n.__chunk_1571,
  d_ = n.__chunk_3573,
  i_ = n.__chunk_1518,
  h_ = n.__chunk_1402,
  l_ = n.__chunk_1067,
  k_ = n.__chunk_2731,
  m_ = n.__chunk_8388,
  p_ = n.__chunk_4350,
  f_ = n.__chunk_8248,
  b_ = n.__chunk_9216,
  g_ = n.__chunk_8836,
  x_ = n.__chunk_4265,
  y_ = n.__chunk_4460,
  j_ = n.__chunk_3821,
  P_ = n.__chunk_9468,
  E_ = n.__chunk_5553,
  v_ = n.__chunk_6385,
  R_ = n.__chunk_2249,
  w_ = n.__chunk_9893,
  S_ = n.__chunk_9161,
  N_ = n.__chunk_3278,
  M_ = n.__chunk_4858,
  T_ = n.__chunk_725,
  O_ = n.__chunk_4273,
  A_ = n.__chunk_9240,
  I_ = n.__chunk_2134,
  C_ = n.__chunk_2418,
  F_ = n.__chunk_6983,
  D_ = n.__chunk_9277,
  $_ = n.__chunk_6905,
  L_ = n.__chunk_3103,
  q_ = n.__chunk_6364,
  B_ = n.__chunk_7724,
  K_ = n.__chunk_1121,
  U_ = n.__chunk_4783,
  W_ = n.__chunk_5009,
  z_ = n.__chunk_70,
  G_ = n.__chunk_7376,
  H_ = n.__chunk_1261,
  V_ = n.__chunk_5075,
  X_ = n.__chunk_3408,
  Y_ = n.__chunk_9563,
  J_ = n.__chunk_8904,
  Q_ = n.__chunk_1223,
  Z_ = n.__chunk_5761,
  nc = n.__chunk_5941,
  ec = n.__chunk_2054,
  tc = n.__chunk_8394,
  _c = n.__chunk_9724,
  cc = n.__chunk_7779,
  sc = n.__chunk_5000,
  ac = n.__chunk_9090,
  oc = n.__chunk_5542,
  rc = n.__chunk_4,
  uc = n.__chunk_8915,
  dc = n.__chunk_7579,
  ic = n.__chunk_5389,
  hc = n.__chunk_5336,
  lc = n.__chunk_6788,
  kc = n.__chunk_2181,
  L = an(f, f, f),
  mc = L.__NEXT_FONT_MANIFEST,
  pc = L.__REACT_LOADABLE_MANIFEST,
  fc = L.__BUILD_MANIFEST,
  bc = L.__RSC_SERVER_MANIFEST,
  wc = ((r, k, A) => (
    (k._ENTRIES = {}),
    (r.__RSC_SERVER_MANIFEST = bc),
    (k.__RSC_MANIFEST = k.__RSC_MANIFEST || {}),
    (k.__RSC_MANIFEST['/[lng]/admin/dashboard/page'] = {
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
            '586',
            'static/chunks/586-732b750f356709c8.js',
            '318',
            'static/chunks/app/%5Blng%5D/admin/dashboard/page-0d640df0b0424971.js',
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
          chunks: [
            '655',
            'static/chunks/655-56915f9d114b7f4e.js',
            '43',
            'static/chunks/43-fa995ca364ebf5a6.js',
            '855',
            'static/chunks/855-fae9702efe576cfb.js',
            '586',
            'static/chunks/586-732b750f356709c8.js',
            '318',
            'static/chunks/app/%5Blng%5D/admin/dashboard/page-0d640df0b0424971.js',
          ],
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
          chunks: [],
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
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/admin/dashboard/page': [],
      },
    }),
    (r.__BUILD_MANIFEST = fc),
    (r.__REACT_LOADABLE_MANIFEST = pc),
    (r.__NEXT_FONT_MANIFEST = mc),
    (r.__INTERCEPTION_ROUTE_REWRITE_MANIFEST = '[]'),
    (r.__PRERENDER_MANIFEST =
      '{"version":4,"routes":{},"dynamicRoutes":{},"notFoundRoutes":[],"preview":{"previewModeId":"process.env.__NEXT_PREVIEW_MODE_ID","previewModeSigningKey":"process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY","previewModeEncryptionKey":"process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY"}}'),
    (() => {
      'use strict';
      var b = {},
        p = {};
      function e(_) {
        var o = p[_];
        if (o !== void 0) return o.exports;
        var c = (p[_] = { exports: {} }),
          h = !0;
        try {
          (b[_](c, c.exports, e), (h = !1));
        } finally {
          h && delete p[_];
        }
        return c.exports;
      }
      ((e.m = b),
        (e.amdO = {}),
        (() => {
          var _ = [];
          e.O = (o, c, h, l) => {
            if (c) {
              l = l || 0;
              for (var i = _.length; i > 0 && _[i - 1][2] > l; i--) _[i] = _[i - 1];
              _[i] = [c, h, l];
              return;
            }
            for (var m = 1 / 0, i = 0; i < _.length; i++) {
              for (var [c, h, l] = _[i], x = !0, j = 0; j < c.length; j++)
                m >= l && Object.keys(e.O).every((T) => e.O[T](c[j]))
                  ? c.splice(j--, 1)
                  : ((x = !1), l < m && (m = l));
              if (x) {
                _.splice(i--, 1);
                var u = h();
                u !== void 0 && (o = u);
              }
            }
            return o;
          };
        })(),
        (e.n = (_) => {
          var o = _ && _.__esModule ? () => _.default : () => _;
          return (e.d(o, { a: o }), o);
        }),
        (() => {
          var _,
            o = Object.getPrototypeOf ? (c) => Object.getPrototypeOf(c) : (c) => c.__proto__;
          e.t = function (c, h) {
            if (
              (1 & h && (c = this(c)),
              8 & h ||
                (typeof c == 'object' &&
                  c &&
                  ((4 & h && c.__esModule) || (16 & h && typeof c.then == 'function'))))
            )
              return c;
            var l = Object.create(null);
            e.r(l);
            var i = {};
            _ = _ || [null, o({}), o([]), o(o)];
            for (var m = 2 & h && c; typeof m == 'object' && !~_.indexOf(m); m = o(m))
              Object.getOwnPropertyNames(m).forEach((x) => (i[x] = () => c[x]));
            return ((i.default = () => c), e.d(l, i), l);
          };
        })(),
        (e.d = (_, o) => {
          for (var c in o)
            e.o(o, c) && !e.o(_, c) && Object.defineProperty(_, c, { enumerable: !0, get: o[c] });
        }),
        (e.e = () => Promise.resolve()),
        (e.g = (function () {
          if (typeof k == 'object') return k;
          try {
            return this || Function('return this')();
          } catch {
            if (typeof window == 'object') return window;
          }
        })()),
        (e.o = (_, o) => Object.prototype.hasOwnProperty.call(_, o)),
        (e.r = (_) => {
          (typeof Symbol < 'u' &&
            Symbol.toStringTag &&
            Object.defineProperty(_, Symbol.toStringTag, { value: 'Module' }),
            Object.defineProperty(_, '__esModule', { value: !0 }));
        }),
        (() => {
          var _ = { 993: 0 };
          e.O.j = (h) => _[h] === 0;
          var o = (h, l) => {
              var i,
                m,
                [x, j, u] = l,
                v = 0;
              if (x.some((C) => _[C] !== 0)) {
                for (i in j) e.o(j, i) && (e.m[i] = j[i]);
                if (u) var I = u(e);
              }
              for (h && h(l); v < x.length; v++)
                ((m = x[v]), e.o(_, m) && _[m] && _[m][0](), (_[m] = 0));
              return e.O(I);
            },
            c = (r.webpackChunk_N_E = r.webpackChunk_N_E || []);
          (c.forEach(o.bind(null, 0)), (c.push = o.bind(null, c.push.bind(c))));
        })());
    })(),
    (r.webpackChunk_N_E = r.webpackChunk_N_E || []).push([
      [365],
      {
        2181: kc,
        6788: lc,
        5336: hc,
        5389: ic,
        7579: dc,
        8915: uc,
        4: rc,
        5542: oc,
        9090: ac,
        5e3: sc,
        7779: cc,
        9724: _c,
        8394: tc,
        2054: ec,
        5941: nc,
        5761: Z_,
        1223: Q_,
        8904: J_,
        9563: Y_,
        3408: X_,
        5075: V_,
        1261: H_,
        7376: G_,
        70: z_,
        5009: W_,
        4783: U_,
        1121: K_,
        7724: B_,
        6364: q_,
        3103: L_,
        6905: $_,
        9277: D_,
        6983: F_,
        2418: C_,
        2134: I_,
        9240: A_,
        4273: O_,
        725: T_,
        4858: M_,
        3278: N_,
        9161: S_,
        9893: w_,
        2249: R_,
        6385: v_,
        5553: E_,
        9468: P_,
        3821: j_,
        4460: y_,
        4265: x_,
        8836: g_,
        9216: b_,
        8248: f_,
        4350: p_,
        8388: m_,
        2731: k_,
        1067: l_,
        1402: h_,
        1518: i_,
        3573: d_,
        1571: u_,
        4527: r_,
        282: o_,
        3972: a_,
        3160: s_,
        6618: c_,
        4180: __,
        1331: t_,
        252: e_,
        6613: n_,
        5365: Zt,
        5060: Qt,
        2413: Jt,
        9334: Yt,
        219: Xt,
        8430: Vt,
        9004: Ht,
        8799: Gt,
        4833: zt,
        5771: Wt,
        4598: Ut,
        614: Kt,
        5401: Bt,
        5448: qt,
        4709: Lt,
        1349: $t,
        5758: Dt,
        5521: Ft,
        6575: Ct,
        8997: It,
        8186: At,
        1478: Ot,
        6299: Tt,
        2223: Mt,
        9104: Nt,
        4576: St,
        4505: wt,
        3916: Rt,
        6725: vt,
        627: Et,
        4360: Pt,
        8402: jt,
        6828: yt,
        2798: xt,
        7497: gt,
        3254: bt,
        225: ft,
        1646: pt,
        2990: mt,
        1875: kt,
        151: lt,
        9491: ht,
        4119: it,
        6612: dt,
        4497: ut,
        9458: rt,
        5929: ot,
        207: at,
        6450: st,
        758: ct,
        8556: _t,
        3746: tt,
        7329: et,
        5143: nt,
        5159: Ze,
        5991: Qe,
        2041: Je,
        2940: Ye,
        4627: Xe,
        4634: Ve,
        1502: He,
        4703: Ge,
        291: ze,
        8433: We,
        9154: Ue,
        253: Ke,
        8427: Be,
        1298: qe,
        4977: Le,
        2222: $e,
        712: De,
        7185: Fe,
        6482: Ce,
        2161: Ie,
        3196: Ae,
        1511: Oe,
        7700: Te,
        602: bn,
        9228: fn,
        8868: Me,
        935: pn,
        4510: Ne,
        4793: Se,
        9145: we,
        575: Re,
        3831: ve,
        6977: Ee,
        4114: Pe,
        9327: je,
        3065: ye,
        5737: xe,
        4990: ge,
        5318: be,
        407: fe,
        9212: pe,
        7309: me,
        3758: ke,
        8712: le,
        106: he,
        5942: ie,
        2714: de,
        4314: ue,
        3326: re,
        434: oe,
        1209: ae,
        9712: se,
        1082: ce,
        5579: _e,
        8981: te,
        4508: ee,
        3435: ne,
        4961: Zn,
        7850: Qn,
        5588: Jn,
        7042: Yn,
        1661: Xn,
        9182: Vn,
        5765: Hn,
      },
    ]),
    (r.webpackChunk_N_E = r.webpackChunk_N_E || []).push([
      [61],
      {
        7713: Gn,
        7130: zn,
        3906: Wn,
        2208: Un,
        9497: Kn,
        7538: Bn,
        5069: qn,
        5115: Ln,
        2459: $n,
        9805: Dn,
        7617: Fn,
        5424: Cn,
        5460: In,
        1644: An,
        696: On,
        5482: Tn,
        1368: Mn,
        164: Nn,
        8741: Sn,
        4085: wn,
        336: Rn,
        4672: vn,
        4851: En,
        2530: Pn,
        5530: jn,
        8034: yn,
        8700: xn,
        9316: gn,
      },
    ]),
    (r.webpackChunk_N_E = r.webpackChunk_N_E || []).push([
      [318],
      {
        2067: mn,
        6195: kn,
        4011: (b, p, e) => {
          'use strict';
          (e.r(p), e.d(p, { ComponentMod: () => s, default: () => P }));
          var _,
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
              __next_app__: () => F,
              actionAsyncStorage: () => u.Wz,
              createDynamicallyTrackedSearchParams: () => u.rL,
              createUntrackedSearchParams: () => u.S5,
              decodeAction: () => u.Hs,
              decodeFormState: () => u.dH,
              decodeReply: () => u.kf,
              originalPathname: () => C,
              pages: () => I,
              patchFetch: () => u.XH,
              preconnect: () => u.$P,
              preloadFont: () => u.C5,
              preloadStyle: () => u.oH,
              renderToReadableStream: () => u.aW,
              requestAsyncStorage: () => u.Fg,
              routeModule: () => T,
              serverHooks: () => u.GP,
              staticGenerationAsyncStorage: () => u.AT,
              taintObjectReference: () => u.nr,
              tree: () => v,
            }),
            e(4833));
          var c = e(9004),
            h = e(4783),
            l = e(252),
            i = e(3573),
            m = e(3196),
            x = e(2161),
            j = e(4977),
            u = e(6482);
          let v = [
              '',
              {
                children: [
                  '[lng]',
                  {
                    children: [
                      'admin',
                      {
                        children: [
                          'dashboard',
                          {
                            children: [
                              '__PAGE__',
                              {},
                              {
                                page: [
                                  () => Promise.resolve().then(e.bind(e, 7412)),
                                  '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/admin/dashboard/page.tsx',
                                ],
                              },
                            ],
                          },
                          {},
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
            I = ['/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/admin/dashboard/page.tsx'],
            C = '/[lng]/admin/dashboard/page',
            F = { require: e, loadChunk: () => Promise.resolve() },
            T = new m.AppPageRouteModule({
              definition: {
                kind: x.x.APP_PAGE,
                page: '/[lng]/admin/dashboard/page',
                pathname: '/[lng]/admin/dashboard',
                bundlePath: '',
                filename: '',
                appPaths: [],
              },
              userland: { loaderTree: v },
            });
          var q = e(8388),
            B = e(4527),
            K = e(1518);
          let S = (g) => (g ? JSON.parse(g) : void 0),
            U = r.__BUILD_MANIFEST,
            W = S(r.__PRERENDER_MANIFEST),
            R = S(r.__REACT_LOADABLE_MANIFEST),
            O = (_ = r.__RSC_MANIFEST) == null ? void 0 : _['/[lng]/admin/dashboard/page'],
            y = S(r.__RSC_SERVER_MANIFEST),
            t = S(r.__NEXT_FONT_MANIFEST),
            d = S(r.__INTERCEPTION_ROUTE_REWRITE_MANIFEST) ?? [];
          O &&
            y &&
            (0, B.Mo)({
              clientReferenceManifest: O,
              serverActionsManifest: y,
              serverModuleMap: (0, K.w)({
                serverActionsManifest: y,
                pageName: '/[lng]/admin/dashboard/page',
              }),
            });
          let a = (0, h.d)({
              pagesType: q.s.APP,
              dev: !1,
              page: '/[lng]/admin/dashboard/page',
              appMod: null,
              pageMod: o,
              errorMod: null,
              error500Mod: null,
              Document: null,
              buildManifest: U,
              prerenderManifest: W,
              renderToHTML: i.f,
              reactLoadableManifest: R,
              clientReferenceManifest: O,
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
              nextFontManifest: t,
              incrementalCacheHandler: null,
              interceptionRouteRewrites: d,
            }),
            s = o;
          function P(g) {
            return (0, c.C)({ ...g, IncrementalCache: l.k, handler: a });
          }
        },
        5816: (b, p, e) => {
          (Promise.resolve().then(e.bind(e, 9778)), Promise.resolve().then(e.bind(e, 5069)));
        },
        9778: (b, p, e) => {
          'use strict';
          e.d(p, { AdminDashboard: () => i });
          var _ = e(3408),
            o = e(9712),
            c = e(2516),
            h = e(1831),
            l = e(3290);
          let i = () => {
            let m = (0, o.T_)('admin.dashboard');
            return (0, _.jsxs)('div', {
              className: 'space-y-6 p-6',
              children: [
                (0, _.jsx)(c.m, { title: m('title'), breadcrumbs: [{ label: m('title') }] }),
                (0, _.jsx)(h.j, {
                  items: [
                    { label: 'Active buyers', value: '42' },
                    { label: 'Active suppliers', value: '16' },
                    { label: 'RFQs issued (30d)', value: '128' },
                    { label: 'Orders fulfilled (30d)', value: '54' },
                  ],
                }),
                (0, _.jsxs)(l.Card, {
                  children: [
                    (0, _.jsx)(l.Ol, { children: (0, _.jsx)(l.ll, { children: 'Operations' }) }),
                    (0, _.jsx)(l.CardContent, {
                      className: 'text-muted-foreground space-y-2 text-sm',
                      children: (0, _.jsx)('p', {
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
        1831: ln,
        2516: dn,
        3290: rn,
        7412: (b, p, e) => {
          'use strict';
          (e.r(p), e.d(p, { default: () => x }));
          var _ = e(9154),
            o = e(336),
            c = e(1298);
          let h = (0, c.D)(
              String.raw`/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/admin/dashboard/admin-dashboard.tsx`,
            ),
            { __esModule: l, $$typeof: i } = h;
          h.default;
          let m = (0, c.D)(
            String.raw`/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/admin/dashboard/admin-dashboard.tsx#AdminDashboard`,
          );
          function x() {
            return (0, _.jsx)(o.V, { children: (0, _.jsx)(m, {}) });
          }
        },
      },
      (b) => {
        var p = (_) => b((b.s = _));
        b.O(0, [365, 61], () => p(4011));
        var e = b.O();
        (k._ENTRIES = typeof k._ENTRIES > 'u' ? {} : k._ENTRIES)[
          'middleware_app/[lng]/admin/dashboard/page'
        ] = e;
      },
    ]),
    function () {
      let b = { exports: {}, loaded: !1 };
      return (
        (function (e, _) {
          var o = Object.create,
            c = Object.defineProperty,
            h = Object.getOwnPropertyDescriptor,
            l = Object.getOwnPropertyNames,
            i = Object.getPrototypeOf,
            m = Object.prototype.hasOwnProperty,
            x = (t) => c(t, '__esModule', { value: !0 }),
            j = (t, d) => {
              x(t);
              for (var a in d) c(t, a, { get: d[a], enumerable: !0 });
            },
            u = (t, d, a) => {
              if ((d && typeof d == 'object') || typeof d == 'function')
                for (let s of l(d))
                  !m.call(t, s) &&
                    s !== 'default' &&
                    c(t, s, { get: () => d[s], enumerable: !(a = h(d, s)) || a.enumerable });
              return t;
            },
            v = (t) =>
              u(
                x(
                  c(
                    t != null ? o(i(t)) : {},
                    'default',
                    t && t.__esModule && 'default' in t
                      ? { get: () => t.default, enumerable: !0 }
                      : { value: t, enumerable: !0 },
                  ),
                ),
                t,
              );
          j(_, { default: () => W });
          var I = v((X(), nn(D))),
            C = '@next/request-context',
            F = Symbol.for(C),
            T = Symbol.for('internal.storage');
          function q() {
            let t = k;
            if (!t[F]) {
              let d = new I.AsyncLocalStorage(),
                a = { get: () => d.getStore(), [T]: d };
              t[F] = a;
            }
            return t[F];
          }
          var B = q();
          function K(t, d) {
            return B[T].run(t, d);
          }
          function S(t) {
            let d = {};
            return (
              t &&
                t.forEach((a, s) => {
                  ((d[s] = a), s.toLowerCase() === 'set-cookie' && (d[s] = U(a)));
                }),
              d
            );
          }
          function U(t) {
            let d = [],
              a = 0,
              s,
              P,
              g,
              N,
              M;
            function E() {
              for (; a < t.length && /\s/.test(t.charAt(a)); ) a += 1;
              return a < t.length;
            }
            function w() {
              return ((P = t.charAt(a)), P !== '=' && P !== ';' && P !== ',');
            }
            for (; a < t.length; ) {
              for (s = a, M = !1; E(); )
                if (((P = t.charAt(a)), P === ',')) {
                  for (g = a, a += 1, E(), N = a; a < t.length && w(); ) a += 1;
                  a < t.length && t.charAt(a) === '='
                    ? ((M = !0), (a = N), d.push(t.substring(s, g)), (s = a))
                    : (a = g + 1);
                } else a += 1;
              (!M || a >= t.length) && d.push(t.substring(s, t.length));
            }
            return d;
          }
          function W(t) {
            let d = t.staticRoutes.map((s) => ({ regexp: new RegExp(s.namedRegex), page: s.page })),
              a =
                t.dynamicRoutes?.map((s) => ({ regexp: new RegExp(s.namedRegex), page: s.page })) ||
                [];
            return async function (s, P) {
              let g = new URL(s.url).pathname,
                N = {};
              if (
                (t.nextConfig?.basePath &&
                  g.startsWith(t.nextConfig.basePath) &&
                  (g = g.replace(t.nextConfig.basePath, '') || '/'),
                t.nextConfig?.i18n)
              )
                for (let E of t.nextConfig.i18n.locales) {
                  let w = new RegExp(`^/${E}($|/)`, 'i');
                  if (g.match(w)) {
                    g = g.replace(w, '/') || '/';
                    break;
                  }
                }
              for (let E of d)
                if (E.regexp.exec(g)) {
                  N.name = E.page;
                  break;
                }
              if (!N.name) {
                let E = O(g);
                for (let w of a || []) {
                  if (E && !O(w.page)) continue;
                  let H = w.regexp.exec(g);
                  if (H) {
                    N = { name: w.page, params: H.groups };
                    break;
                  }
                }
              }
              let M = await K({ waitUntil: P.waitUntil }, () =>
                k._ENTRIES[`middleware_${t.name}`].default.call(
                  {},
                  {
                    request: {
                      url: s.url,
                      method: s.method,
                      headers: S(s.headers),
                      ip: R(s.headers, y.Ip),
                      geo: {
                        city: R(s.headers, y.City, !0),
                        country: R(s.headers, y.Country, !0),
                        latitude: R(s.headers, y.Latitude),
                        longitude: R(s.headers, y.Longitude),
                        region: R(s.headers, y.Region, !0),
                      },
                      nextConfig: t.nextConfig,
                      page: N,
                      body: s.body,
                    },
                  },
                ),
              );
              return (M.waitUntil && P.waitUntil(M.waitUntil), M.response);
            };
          }
          function R(t, d, a = !1) {
            let s = t.get(d) || void 0;
            return a && s ? decodeURIComponent(s) : s;
          }
          function O(t) {
            return t === '/api' || t.startsWith('/api/');
          }
          var y;
          (function (t) {
            ((t.City = 'x-vercel-ip-city'),
              (t.Country = 'x-vercel-ip-country'),
              (t.Ip = 'x-real-ip'),
              (t.Latitude = 'x-vercel-ip-latitude'),
              (t.Longitude = 'x-vercel-ip-longitude'),
              (t.Region = 'x-vercel-ip-country-region'));
          })(y || (y = {}));
        })(b, b.exports),
        b.exports
      );
    }
      .call({})
      .default({
        name: 'app/[lng]/admin/dashboard/page',
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
  ))(f, f, f);
export { wc as default };
