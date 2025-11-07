var G = Object.defineProperty;
var Z = Object.getOwnPropertyDescriptor;
var Y = Object.getOwnPropertyNames;
var J = Object.prototype.hasOwnProperty;
var nn = (i, m) => () => (i && (m = i((i = 0))), m);
var H = (i, m, D, P) => {
    if ((m && typeof m == 'object') || typeof m == 'function')
      for (let x of Y(m))
        !J.call(i, x) &&
          x !== D &&
          G(i, x, { get: () => m[x], enumerable: !(P = Z(m, x)) || P.enumerable });
    return i;
  },
  Q = (i, m, D) => (H(i, m, 'default'), D && H(D, m, 'default'));
var en = (i) => H(G({}, '__esModule', { value: !0 }), i);
var K = {};
import * as wc from 'async_hooks';
var X = nn(() => {
  Q(K, wc);
});
import { __getNamedExports as tn } from '../../../../../__next-on-pages-dist__/webpack/8780.js';
import { __getNamedExports as _n } from '../../../../../__next-on-pages-dist__/webpack/e2daa575c5ad679c94cfb939c9e42019.js';
import { __getNamedExports as cn } from '../../../../../__next-on-pages-dist__/webpack/1746.js';
import { __getNamedExports as sn } from '../../../../../__next-on-pages-dist__/webpack/3290.js';
import { __getNamedExports as an } from '../../../../../__next-on-pages-dist__/webpack/2516.js';
import { __getNamedExports as on } from '../../../../../__next-on-pages-dist__/webpack/7e5b5057542a677d168ef2f7e421c64a.js';
import { __getNamedExports as rn } from '../../../../../__next-on-pages-dist__/webpack/feaf1bd85f055963b24458fea3223a55.js';
import { __getNamedExports as un } from '../../../../../__next-on-pages-dist__/manifest/8979b518535174c7eb8d77a6d5a08905.js';
var k = globalThis.__nextOnPagesRoutesIsolation.getProxyFor('/[lng]/supplier/quotes/inbox'),
  dn = tn(k, k, k),
  ln = dn.__chunk_8780,
  U = _n(k, k, k),
  hn = U.__chunk_4475,
  kn = U.__chunk_5274,
  mn = U.__chunk_4537,
  pn = U.__chunk_3535,
  fn = U.__chunk_1566,
  bn = cn(k, k, k),
  gn = bn.__chunk_1746,
  xn = sn(k, k, k),
  yn = xn.__chunk_3290,
  jn = an(k, k, k),
  Pn = jn.__chunk_2516,
  z = on(k, k, k),
  vn = z.__chunk_6195,
  En = z.__chunk_2067,
  Nn = z.__chunk_935,
  Rn = z.__chunk_9228,
  In = z.__chunk_602,
  n = rn(k, k, k),
  Sn = n.__chunk_9316,
  wn = n.__chunk_8700,
  Tn = n.__chunk_8034,
  qn = n.__chunk_5530,
  Mn = n.__chunk_2530,
  An = n.__chunk_4851,
  Cn = n.__chunk_4672,
  Fn = n.__chunk_336,
  On = n.__chunk_4085,
  $n = n.__chunk_8741,
  Dn = n.__chunk_164,
  Ln = n.__chunk_1368,
  Bn = n.__chunk_5482,
  Kn = n.__chunk_696,
  Un = n.__chunk_1644,
  zn = n.__chunk_5460,
  Wn = n.__chunk_5424,
  Hn = n.__chunk_7617,
  Qn = n.__chunk_9805,
  Vn = n.__chunk_2459,
  Gn = n.__chunk_5115,
  Xn = n.__chunk_5069,
  Zn = n.__chunk_7538,
  Yn = n.__chunk_9497,
  Jn = n.__chunk_2208,
  ne = n.__chunk_3906,
  ee = n.__chunk_7130,
  te = n.__chunk_7713,
  _e = n.__chunk_5765,
  ce = n.__chunk_9182,
  se = n.__chunk_1661,
  ae = n.__chunk_7042,
  oe = n.__chunk_5588,
  re = n.__chunk_7850,
  ue = n.__chunk_4961,
  ie = n.__chunk_3435,
  de = n.__chunk_4508,
  le = n.__chunk_8981,
  he = n.__chunk_5579,
  ke = n.__chunk_1082,
  me = n.__chunk_9712,
  pe = n.__chunk_1209,
  fe = n.__chunk_434,
  be = n.__chunk_3326,
  ge = n.__chunk_4314,
  xe = n.__chunk_2714,
  ye = n.__chunk_5942,
  je = n.__chunk_106,
  Pe = n.__chunk_8712,
  ve = n.__chunk_3758,
  Ee = n.__chunk_7309,
  Ne = n.__chunk_9212,
  Re = n.__chunk_407,
  Ie = n.__chunk_5318,
  Se = n.__chunk_4990,
  we = n.__chunk_5737,
  Te = n.__chunk_3065,
  qe = n.__chunk_9327,
  Me = n.__chunk_4114,
  Ae = n.__chunk_6977,
  Ce = n.__chunk_3831,
  Fe = n.__chunk_575,
  Oe = n.__chunk_9145,
  $e = n.__chunk_4793,
  De = n.__chunk_4510,
  Le = n.__chunk_8868,
  Be = n.__chunk_7700,
  Ke = n.__chunk_1511,
  Ue = n.__chunk_3196,
  ze = n.__chunk_2161,
  We = n.__chunk_6482,
  He = n.__chunk_7185,
  Qe = n.__chunk_712,
  Ve = n.__chunk_2222,
  Ge = n.__chunk_4977,
  Xe = n.__chunk_1298,
  Ze = n.__chunk_8427,
  Ye = n.__chunk_253,
  Je = n.__chunk_9154,
  nt = n.__chunk_8433,
  et = n.__chunk_291,
  tt = n.__chunk_4703,
  _t = n.__chunk_1502,
  ct = n.__chunk_4634,
  st = n.__chunk_4627,
  at = n.__chunk_2940,
  ot = n.__chunk_2041,
  rt = n.__chunk_5991,
  ut = n.__chunk_5159,
  it = n.__chunk_5143,
  dt = n.__chunk_7329,
  lt = n.__chunk_3746,
  ht = n.__chunk_8556,
  kt = n.__chunk_758,
  mt = n.__chunk_6450,
  pt = n.__chunk_207,
  ft = n.__chunk_5929,
  bt = n.__chunk_9458,
  gt = n.__chunk_4497,
  xt = n.__chunk_6612,
  yt = n.__chunk_4119,
  jt = n.__chunk_9491,
  Pt = n.__chunk_151,
  vt = n.__chunk_1875,
  Et = n.__chunk_2990,
  Nt = n.__chunk_1646,
  Rt = n.__chunk_225,
  It = n.__chunk_3254,
  St = n.__chunk_7497,
  wt = n.__chunk_2798,
  Tt = n.__chunk_6828,
  qt = n.__chunk_8402,
  Mt = n.__chunk_4360,
  At = n.__chunk_627,
  Ct = n.__chunk_6725,
  Ft = n.__chunk_3916,
  Ot = n.__chunk_4505,
  $t = n.__chunk_4576,
  Dt = n.__chunk_9104,
  Lt = n.__chunk_2223,
  Bt = n.__chunk_6299,
  Kt = n.__chunk_1478,
  Ut = n.__chunk_8186,
  zt = n.__chunk_8997,
  Wt = n.__chunk_6575,
  Ht = n.__chunk_5521,
  Qt = n.__chunk_5758,
  Vt = n.__chunk_1349,
  Gt = n.__chunk_4709,
  Xt = n.__chunk_5448,
  Zt = n.__chunk_5401,
  Yt = n.__chunk_614,
  Jt = n.__chunk_4598,
  n_ = n.__chunk_5771,
  e_ = n.__chunk_4833,
  t_ = n.__chunk_8799,
  __ = n.__chunk_9004,
  c_ = n.__chunk_8430,
  s_ = n.__chunk_219,
  a_ = n.__chunk_9334,
  o_ = n.__chunk_2413,
  r_ = n.__chunk_5060,
  u_ = n.__chunk_5365,
  i_ = n.__chunk_6613,
  d_ = n.__chunk_252,
  l_ = n.__chunk_1331,
  h_ = n.__chunk_4180,
  k_ = n.__chunk_6618,
  m_ = n.__chunk_3160,
  p_ = n.__chunk_3972,
  f_ = n.__chunk_282,
  b_ = n.__chunk_4527,
  g_ = n.__chunk_1571,
  x_ = n.__chunk_3573,
  y_ = n.__chunk_1518,
  j_ = n.__chunk_1402,
  P_ = n.__chunk_1067,
  v_ = n.__chunk_2731,
  E_ = n.__chunk_8388,
  N_ = n.__chunk_4350,
  R_ = n.__chunk_8248,
  I_ = n.__chunk_9216,
  S_ = n.__chunk_8836,
  w_ = n.__chunk_4265,
  T_ = n.__chunk_4460,
  q_ = n.__chunk_3821,
  M_ = n.__chunk_9468,
  A_ = n.__chunk_5553,
  C_ = n.__chunk_6385,
  F_ = n.__chunk_2249,
  O_ = n.__chunk_9893,
  $_ = n.__chunk_9161,
  D_ = n.__chunk_3278,
  L_ = n.__chunk_4858,
  B_ = n.__chunk_725,
  K_ = n.__chunk_4273,
  U_ = n.__chunk_9240,
  z_ = n.__chunk_2134,
  W_ = n.__chunk_2418,
  H_ = n.__chunk_6983,
  Q_ = n.__chunk_9277,
  V_ = n.__chunk_6905,
  G_ = n.__chunk_3103,
  X_ = n.__chunk_6364,
  Z_ = n.__chunk_7724,
  Y_ = n.__chunk_1121,
  J_ = n.__chunk_4783,
  nc = n.__chunk_5009,
  ec = n.__chunk_70,
  tc = n.__chunk_7376,
  _c = n.__chunk_1261,
  cc = n.__chunk_5075,
  sc = n.__chunk_3408,
  ac = n.__chunk_9563,
  oc = n.__chunk_8904,
  rc = n.__chunk_1223,
  uc = n.__chunk_5761,
  ic = n.__chunk_5941,
  dc = n.__chunk_2054,
  lc = n.__chunk_8394,
  hc = n.__chunk_9724,
  kc = n.__chunk_7779,
  mc = n.__chunk_5000,
  pc = n.__chunk_9090,
  fc = n.__chunk_5542,
  bc = n.__chunk_4,
  gc = n.__chunk_8915,
  xc = n.__chunk_7579,
  yc = n.__chunk_5389,
  jc = n.__chunk_5336,
  Pc = n.__chunk_6788,
  vc = n.__chunk_2181,
  W = un(k, k, k),
  Ec = W.__NEXT_FONT_MANIFEST,
  Nc = W.__REACT_LOADABLE_MANIFEST,
  Rc = W.__BUILD_MANIFEST,
  Ic = W.__RSC_SERVER_MANIFEST,
  Dc = ((i, m, D) => (
    (m._ENTRIES = {}),
    (i.__RSC_SERVER_MANIFEST = Ic),
    (m.__RSC_MANIFEST = m.__RSC_MANIFEST || {}),
    (m.__RSC_MANIFEST['/[lng]/supplier/quotes/inbox/page'] = {
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
            '805',
            'static/chunks/805-7413c91746a75245.js',
            '855',
            'static/chunks/855-fae9702efe576cfb.js',
            '700',
            'static/chunks/700-bffdf56fcafe9a6f.js',
            '245',
            'static/chunks/app/%5Blng%5D/supplier/quotes/inbox/page-e5d9369f35cea9f3.js',
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
          {
            id: 6192,
            name: '*',
            chunks: [
              '655',
              'static/chunks/655-56915f9d114b7f4e.js',
              '43',
              'static/chunks/43-fa995ca364ebf5a6.js',
              '805',
              'static/chunks/805-7413c91746a75245.js',
              '855',
              'static/chunks/855-fae9702efe576cfb.js',
              '700',
              'static/chunks/700-bffdf56fcafe9a6f.js',
              '245',
              'static/chunks/app/%5Blng%5D/supplier/quotes/inbox/page-e5d9369f35cea9f3.js',
            ],
            async: !1,
          },
      },
      entryCSSFiles: {
        '/mnt/d/Projects/b2b-marketplace/frontend/': [],
        '/mnt/d/Projects/b2b-marketplace/frontend/app/layout': ['static/css/047186558a7712c9.css'],
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/layout': [],
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/page': [],
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/supplier/quotes/inbox/page': [],
      },
    }),
    (i.__BUILD_MANIFEST = Rc),
    (i.__REACT_LOADABLE_MANIFEST = Nc),
    (i.__NEXT_FONT_MANIFEST = Ec),
    (i.__INTERCEPTION_ROUTE_REWRITE_MANIFEST = '[]'),
    (i.__PRERENDER_MANIFEST =
      '{"version":4,"routes":{},"dynamicRoutes":{},"notFoundRoutes":[],"preview":{"previewModeId":"process.env.__NEXT_PREVIEW_MODE_ID","previewModeSigningKey":"process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY","previewModeEncryptionKey":"process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY"}}'),
    (() => {
      'use strict';
      var P = {},
        x = {};
      function t(e) {
        var u = x[e];
        if (u !== void 0) return u.exports;
        var s = (x[e] = { exports: {} }),
          a = !0;
        try {
          (P[e](s, s.exports, t), (a = !1));
        } finally {
          a && delete x[e];
        }
        return s.exports;
      }
      ((t.m = P),
        (t.amdO = {}),
        (() => {
          var e = [];
          t.O = (u, s, a, b) => {
            if (s) {
              b = b || 0;
              for (var h = e.length; h > 0 && e[h - 1][2] > b; h--) e[h] = e[h - 1];
              e[h] = [s, a, b];
              return;
            }
            for (var f = 1 / 0, h = 0; h < e.length; h++) {
              for (var [s, a, b] = e[h], y = !0, v = 0; v < s.length; v++)
                f >= b && Object.keys(t.O).every((w) => t.O[w](s[v]))
                  ? s.splice(v--, 1)
                  : ((y = !1), b < f && (f = b));
              if (y) {
                e.splice(h--, 1);
                var o = a();
                o !== void 0 && (u = o);
              }
            }
            return u;
          };
        })(),
        (t.n = (e) => {
          var u = e && e.__esModule ? () => e.default : () => e;
          return (t.d(u, { a: u }), u);
        }),
        (() => {
          var e,
            u = Object.getPrototypeOf ? (s) => Object.getPrototypeOf(s) : (s) => s.__proto__;
          t.t = function (s, a) {
            if (
              (1 & a && (s = this(s)),
              8 & a ||
                (typeof s == 'object' &&
                  s &&
                  ((4 & a && s.__esModule) || (16 & a && typeof s.then == 'function'))))
            )
              return s;
            var b = Object.create(null);
            t.r(b);
            var h = {};
            e = e || [null, u({}), u([]), u(u)];
            for (var f = 2 & a && s; typeof f == 'object' && !~e.indexOf(f); f = u(f))
              Object.getOwnPropertyNames(f).forEach((y) => (h[y] = () => s[y]));
            return ((h.default = () => s), t.d(b, h), b);
          };
        })(),
        (t.d = (e, u) => {
          for (var s in u)
            t.o(u, s) && !t.o(e, s) && Object.defineProperty(e, s, { enumerable: !0, get: u[s] });
        }),
        (t.e = () => Promise.resolve()),
        (t.g = (function () {
          if (typeof m == 'object') return m;
          try {
            return this || Function('return this')();
          } catch {
            if (typeof window == 'object') return window;
          }
        })()),
        (t.o = (e, u) => Object.prototype.hasOwnProperty.call(e, u)),
        (t.r = (e) => {
          (typeof Symbol < 'u' &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
            Object.defineProperty(e, '__esModule', { value: !0 }));
        }),
        (() => {
          var e = { 993: 0 };
          t.O.j = (a) => e[a] === 0;
          var u = (a, b) => {
              var h,
                f,
                [y, v, o] = b,
                j = 0;
              if (y.some((M) => e[M] !== 0)) {
                for (h in v) t.o(v, h) && (t.m[h] = v[h]);
                if (o) var q = o(t);
              }
              for (a && a(b); j < y.length; j++)
                ((f = y[j]), t.o(e, f) && e[f] && e[f][0](), (e[f] = 0));
              return t.O(q);
            },
            s = (i.webpackChunk_N_E = i.webpackChunk_N_E || []);
          (s.forEach(u.bind(null, 0)), (s.push = u.bind(null, s.push.bind(s))));
        })());
    })(),
    (i.webpackChunk_N_E = i.webpackChunk_N_E || []).push([
      [365],
      {
        2181: vc,
        6788: Pc,
        5336: jc,
        5389: yc,
        7579: xc,
        8915: gc,
        4: bc,
        5542: fc,
        9090: pc,
        5e3: mc,
        7779: kc,
        9724: hc,
        8394: lc,
        2054: dc,
        5941: ic,
        5761: uc,
        1223: rc,
        8904: oc,
        9563: ac,
        3408: sc,
        5075: cc,
        1261: _c,
        7376: tc,
        70: ec,
        5009: nc,
        4783: J_,
        1121: Y_,
        7724: Z_,
        6364: X_,
        3103: G_,
        6905: V_,
        9277: Q_,
        6983: H_,
        2418: W_,
        2134: z_,
        9240: U_,
        4273: K_,
        725: B_,
        4858: L_,
        3278: D_,
        9161: $_,
        9893: O_,
        2249: F_,
        6385: C_,
        5553: A_,
        9468: M_,
        3821: q_,
        4460: T_,
        4265: w_,
        8836: S_,
        9216: I_,
        8248: R_,
        4350: N_,
        8388: E_,
        2731: v_,
        1067: P_,
        1402: j_,
        1518: y_,
        3573: x_,
        1571: g_,
        4527: b_,
        282: f_,
        3972: p_,
        3160: m_,
        6618: k_,
        4180: h_,
        1331: l_,
        252: d_,
        6613: i_,
        5365: u_,
        5060: r_,
        2413: o_,
        9334: a_,
        219: s_,
        8430: c_,
        9004: __,
        8799: t_,
        4833: e_,
        5771: n_,
        4598: Jt,
        614: Yt,
        5401: Zt,
        5448: Xt,
        4709: Gt,
        1349: Vt,
        5758: Qt,
        5521: Ht,
        6575: Wt,
        8997: zt,
        8186: Ut,
        1478: Kt,
        6299: Bt,
        2223: Lt,
        9104: Dt,
        4576: $t,
        4505: Ot,
        3916: Ft,
        6725: Ct,
        627: At,
        4360: Mt,
        8402: qt,
        6828: Tt,
        2798: wt,
        7497: St,
        3254: It,
        225: Rt,
        1646: Nt,
        2990: Et,
        1875: vt,
        151: Pt,
        9491: jt,
        4119: yt,
        6612: xt,
        4497: gt,
        9458: bt,
        5929: ft,
        207: pt,
        6450: mt,
        758: kt,
        8556: ht,
        3746: lt,
        7329: dt,
        5143: it,
        5159: ut,
        5991: rt,
        2041: ot,
        2940: at,
        4627: st,
        4634: ct,
        1502: _t,
        4703: tt,
        291: et,
        8433: nt,
        9154: Je,
        253: Ye,
        8427: Ze,
        1298: Xe,
        4977: Ge,
        2222: Ve,
        712: Qe,
        7185: He,
        6482: We,
        2161: ze,
        3196: Ue,
        1511: Ke,
        7700: Be,
        602: In,
        9228: Rn,
        8868: Le,
        935: Nn,
        4510: De,
        4793: $e,
        9145: Oe,
        575: Fe,
        3831: Ce,
        6977: Ae,
        4114: Me,
        9327: qe,
        3065: Te,
        5737: we,
        4990: Se,
        5318: Ie,
        407: Re,
        9212: Ne,
        7309: Ee,
        3758: ve,
        8712: Pe,
        106: je,
        5942: ye,
        2714: xe,
        4314: ge,
        3326: be,
        434: fe,
        1209: pe,
        9712: me,
        1082: ke,
        5579: he,
        8981: le,
        4508: de,
        3435: ie,
        4961: ue,
        7850: re,
        5588: oe,
        7042: ae,
        1661: se,
        9182: ce,
        5765: _e,
      },
    ]),
    (i.webpackChunk_N_E = i.webpackChunk_N_E || []).push([
      [727],
      { 1566: fn, 3535: pn, 4537: mn, 5274: kn },
    ]),
    (i.webpackChunk_N_E = i.webpackChunk_N_E || []).push([
      [61],
      {
        7713: te,
        7130: ee,
        3906: ne,
        2208: Jn,
        9497: Yn,
        7538: Zn,
        5069: Xn,
        5115: Gn,
        2459: Vn,
        9805: Qn,
        7617: Hn,
        5424: Wn,
        5460: zn,
        1644: Un,
        696: Kn,
        5482: Bn,
        1368: Ln,
        164: Dn,
        8741: $n,
        4085: On,
        336: Fn,
        4672: Cn,
        4851: An,
        2530: Mn,
        5530: qn,
        8034: Tn,
        8700: wn,
        9316: Sn,
      },
    ]),
    (i.webpackChunk_N_E = i.webpackChunk_N_E || []).push([
      [245],
      {
        2067: En,
        6195: vn,
        5940: (P, x, t) => {
          'use strict';
          (t.r(x), t.d(x, { ComponentMod: () => c, default: () => d }));
          var e,
            u = {};
          (t.r(u),
            t.d(u, {
              AppRouter: () => o.WY,
              ClientPageRoot: () => o.b1,
              GlobalError: () => v.ZP,
              LayoutRouter: () => o.yO,
              NotFoundBoundary: () => o.O4,
              Postpone: () => o.hQ,
              RenderFromTemplateContext: () => o.b5,
              __next_app__: () => S,
              actionAsyncStorage: () => o.Wz,
              createDynamicallyTrackedSearchParams: () => o.rL,
              createUntrackedSearchParams: () => o.S5,
              decodeAction: () => o.Hs,
              decodeFormState: () => o.dH,
              decodeReply: () => o.kf,
              originalPathname: () => M,
              pages: () => q,
              patchFetch: () => o.XH,
              preconnect: () => o.$P,
              preloadFont: () => o.C5,
              preloadStyle: () => o.oH,
              renderToReadableStream: () => o.aW,
              requestAsyncStorage: () => o.Fg,
              routeModule: () => w,
              serverHooks: () => o.GP,
              staticGenerationAsyncStorage: () => o.AT,
              taintObjectReference: () => o.nr,
              tree: () => j,
            }),
            t(4833));
          var s = t(9004),
            a = t(4783),
            b = t(252),
            h = t(3573),
            f = t(3196),
            y = t(2161),
            v = t(4977),
            o = t(6482);
          let j = [
              '',
              {
                children: [
                  '[lng]',
                  {
                    children: [
                      'supplier',
                      {
                        children: [
                          'quotes',
                          {
                            children: [
                              'inbox',
                              {
                                children: [
                                  '__PAGE__',
                                  {},
                                  {
                                    page: [
                                      () => Promise.resolve().then(t.bind(t, 7207)),
                                      '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/supplier/quotes/inbox/page.tsx',
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
                      {},
                    ],
                  },
                  {
                    layout: [
                      () => Promise.resolve().then(t.bind(t, 8741)),
                      '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/layout.tsx',
                    ],
                  },
                ],
              },
              {
                layout: [
                  () => Promise.resolve().then(t.bind(t, 4085)),
                  '/mnt/d/Projects/b2b-marketplace/frontend/app/layout.tsx',
                ],
                'not-found': [
                  () => Promise.resolve().then(t.bind(t, 712)),
                  'next/dist/client/components/not-found-error',
                ],
              },
            ],
            q = [
              '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/supplier/quotes/inbox/page.tsx',
            ],
            M = '/[lng]/supplier/quotes/inbox/page',
            S = { require: t, loadChunk: () => Promise.resolve() },
            w = new f.AppPageRouteModule({
              definition: {
                kind: y.x.APP_PAGE,
                page: '/[lng]/supplier/quotes/inbox/page',
                pathname: '/[lng]/supplier/quotes/inbox',
                bundlePath: '',
                filename: '',
                appPaths: [],
              },
              userland: { loaderTree: j },
            });
          var L = t(8388),
            B = t(4527),
            $ = t(1518);
          let N = (p) => (p ? JSON.parse(p) : void 0),
            A = i.__BUILD_MANIFEST,
            C = N(i.__PRERENDER_MANIFEST),
            g = N(i.__REACT_LOADABLE_MANIFEST),
            R = (e = i.__RSC_MANIFEST) == null ? void 0 : e['/[lng]/supplier/quotes/inbox/page'],
            E = N(i.__RSC_SERVER_MANIFEST),
            _ = N(i.__NEXT_FONT_MANIFEST),
            l = N(i.__INTERCEPTION_ROUTE_REWRITE_MANIFEST) ?? [];
          R &&
            E &&
            (0, B.Mo)({
              clientReferenceManifest: R,
              serverActionsManifest: E,
              serverModuleMap: (0, $.w)({
                serverActionsManifest: E,
                pageName: '/[lng]/supplier/quotes/inbox/page',
              }),
            });
          let r = (0, a.d)({
              pagesType: L.s.APP,
              dev: !1,
              page: '/[lng]/supplier/quotes/inbox/page',
              appMod: null,
              pageMod: u,
              errorMod: null,
              error500Mod: null,
              Document: null,
              buildManifest: A,
              prerenderManifest: C,
              renderToHTML: h.f,
              reactLoadableManifest: g,
              clientReferenceManifest: R,
              serverActionsManifest: E,
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
              interceptionRouteRewrites: l,
            }),
            c = u;
          function d(p) {
            return (0, s.C)({ ...p, IncrementalCache: b.k, handler: r });
          }
        },
        1692: (P, x, t) => {
          (Promise.resolve().then(t.bind(t, 3826)), Promise.resolve().then(t.bind(t, 5069)));
        },
        3826: (P, x, t) => {
          'use strict';
          t.d(x, { SupplierQuoteInbox: () => B });
          var e = t(3408),
            u = t(9712),
            s = t(4537),
            a = t(5274),
            b = t(1566),
            h = t(8981),
            f = t(2516),
            y = t(9805),
            v = t(3290),
            o = t(1746),
            j = t(4475),
            q = t(8780),
            M = t(5424),
            S = t(7617);
          let w = a.Ry({
              rfqLineId: a.Z_().min(1),
              description: a.Z_().min(1),
              quantity: a.oQ.number().positive(),
              uom: a.Z_().min(1),
              unitPrice: a.oQ.number().positive(),
              leadTimeDays: a.oQ
                .number()
                .int()
                .positive()
                .optional()
                .or(a.i0('').transform(() => {})),
            }),
            L = a.Ry({
              rfqId: a.Z_().min(1),
              vendorId: a.Z_().min(1),
              currency: a.Z_().min(1),
              notes: a.Z_().optional(),
              lines: a.IX(w).min(1),
            }),
            B = () => {
              let $ = (0, u.T_)('quotes'),
                N = (0, u.T_)('quotes.compare'),
                A = (0, u.T_)('rfq.form'),
                C = (0, u.T_)('common.actions'),
                g = (0, s.cI)({
                  resolver: (0, b.F)(L),
                  defaultValues: {
                    rfqId: '',
                    vendorId: '',
                    currency: 'USD',
                    notes: '',
                    lines: [
                      {
                        rfqLineId: '',
                        description: '',
                        quantity: 1,
                        uom: 'EA',
                        unitPrice: 0,
                        leadTimeDays: void 0,
                      },
                    ],
                  },
                }),
                {
                  fields: R,
                  append: E,
                  remove: _,
                } = (0, s.Dq)({ control: g.control, name: 'lines' }),
                l = (0, M.i1)({
                  mutation: {
                    onSuccess: (c) => {
                      (h.Am.success('Quote submitted', { description: `Quote ${c.id} created.` }),
                        g.reset());
                    },
                    onError: (c) => (0, S.Hv)(c),
                  },
                }),
                r = g.handleSubmit(async (c) => {
                  let d = c.lines.map((p) => ({
                    ...p,
                    leadTimeDays: Number.isFinite(p.leadTimeDays) ? p.leadTimeDays : void 0,
                  }));
                  try {
                    await l.mutateAsync({
                      rfqId: c.rfqId,
                      data: {
                        vendorId: c.vendorId,
                        currency: c.currency,
                        notes: c.notes,
                        lines: d,
                      },
                    });
                  } catch (p) {
                    (0, S.Hv)(p);
                  }
                });
              return (0, e.jsxs)('div', {
                className: 'space-y-6 p-6',
                children: [
                  (0, e.jsx)(f.m, { title: $('title'), breadcrumbs: [{ label: $('title') }] }),
                  (0, e.jsxs)(v.Card, {
                    children: [
                      (0, e.jsx)(v.Ol, { children: (0, e.jsx)(v.ll, { children: C('addQuote') }) }),
                      (0, e.jsx)(v.CardContent, {
                        children: (0, e.jsxs)('form', {
                          onSubmit: r,
                          className: 'space-y-6',
                          children: [
                            (0, e.jsxs)('div', {
                              className: 'grid gap-4 md:grid-cols-3',
                              children: [
                                (0, e.jsxs)('div', {
                                  className: 'flex flex-col gap-2',
                                  children: [
                                    (0, e.jsx)(j._, { htmlFor: 'rfqId', children: 'RFQ ID' }),
                                    (0, e.jsx)(o.I, { id: 'rfqId', ...g.register('rfqId') }),
                                  ],
                                }),
                                (0, e.jsxs)('div', {
                                  className: 'flex flex-col gap-2',
                                  children: [
                                    (0, e.jsx)(j._, { htmlFor: 'vendorId', children: 'Vendor ID' }),
                                    (0, e.jsx)(o.I, { id: 'vendorId', ...g.register('vendorId') }),
                                  ],
                                }),
                                (0, e.jsxs)('div', {
                                  className: 'flex flex-col gap-2',
                                  children: [
                                    (0, e.jsx)(j._, { htmlFor: 'currency', children: 'Currency' }),
                                    (0, e.jsx)(o.I, { id: 'currency', ...g.register('currency') }),
                                  ],
                                }),
                              ],
                            }),
                            (0, e.jsxs)('div', {
                              className: 'flex flex-col gap-2',
                              children: [
                                (0, e.jsx)(j._, { htmlFor: 'notes', children: 'Notes' }),
                                (0, e.jsx)(q.g, { id: 'notes', rows: 3, ...g.register('notes') }),
                              ],
                            }),
                            (0, e.jsxs)('div', {
                              className: 'space-y-4',
                              children: [
                                R.map((c, d) =>
                                  (0, e.jsxs)(
                                    'div',
                                    {
                                      className:
                                        'border-border/70 grid gap-3 rounded-md border p-4 md:grid-cols-6',
                                      children: [
                                        (0, e.jsxs)('div', {
                                          className: 'flex flex-col gap-2',
                                          children: [
                                            (0, e.jsx)(j._, {
                                              htmlFor: `lines.${d}.rfqLineId`,
                                              children: 'RFQ Line ID',
                                            }),
                                            (0, e.jsx)(o.I, {
                                              id: `lines.${d}.rfqLineId`,
                                              ...g.register(`lines.${d}.rfqLineId`),
                                            }),
                                          ],
                                        }),
                                        (0, e.jsxs)('div', {
                                          className: 'flex flex-col gap-2 md:col-span-2',
                                          children: [
                                            (0, e.jsx)(j._, {
                                              htmlFor: `lines.${d}.description`,
                                              children: A('description'),
                                            }),
                                            (0, e.jsx)(o.I, {
                                              id: `lines.${d}.description`,
                                              ...g.register(`lines.${d}.description`),
                                            }),
                                          ],
                                        }),
                                        (0, e.jsxs)('div', {
                                          className: 'flex flex-col gap-2',
                                          children: [
                                            (0, e.jsx)(j._, {
                                              htmlFor: `lines.${d}.quantity`,
                                              children: A('quantity'),
                                            }),
                                            (0, e.jsx)(o.I, {
                                              id: `lines.${d}.quantity`,
                                              type: 'number',
                                              step: '0.01',
                                              ...g.register(`lines.${d}.quantity`, {
                                                valueAsNumber: !0,
                                              }),
                                            }),
                                          ],
                                        }),
                                        (0, e.jsxs)('div', {
                                          className: 'flex flex-col gap-2',
                                          children: [
                                            (0, e.jsx)(j._, {
                                              htmlFor: `lines.${d}.uom`,
                                              children: A('uom'),
                                            }),
                                            (0, e.jsx)(o.I, {
                                              id: `lines.${d}.uom`,
                                              ...g.register(`lines.${d}.uom`),
                                            }),
                                          ],
                                        }),
                                        (0, e.jsxs)('div', {
                                          className: 'flex flex-col gap-2',
                                          children: [
                                            (0, e.jsx)(j._, {
                                              htmlFor: `lines.${d}.unitPrice`,
                                              children: N('unitPrice'),
                                            }),
                                            (0, e.jsx)(o.I, {
                                              id: `lines.${d}.unitPrice`,
                                              type: 'number',
                                              step: '0.01',
                                              ...g.register(`lines.${d}.unitPrice`, {
                                                valueAsNumber: !0,
                                              }),
                                            }),
                                          ],
                                        }),
                                        (0, e.jsxs)('div', {
                                          className: 'flex flex-col gap-2',
                                          children: [
                                            (0, e.jsx)(j._, {
                                              htmlFor: `lines.${d}.leadTimeDays`,
                                              children: N('leadTime'),
                                            }),
                                            (0, e.jsx)(o.I, {
                                              id: `lines.${d}.leadTimeDays`,
                                              type: 'number',
                                              ...g.register(`lines.${d}.leadTimeDays`, {
                                                valueAsNumber: !0,
                                              }),
                                            }),
                                          ],
                                        }),
                                        R.length > 1
                                          ? (0, e.jsx)('div', {
                                              className: 'md:col-span-6',
                                              children: (0, e.jsx)(y.Button, {
                                                type: 'button',
                                                variant: 'outline',
                                                size: 'sm',
                                                onClick: () => _(d),
                                                children: 'Remove line',
                                              }),
                                            })
                                          : null,
                                      ],
                                    },
                                    c.id,
                                  ),
                                ),
                                (0, e.jsx)(y.Button, {
                                  type: 'button',
                                  variant: 'outline',
                                  onClick: () =>
                                    E({
                                      rfqLineId: '',
                                      description: '',
                                      quantity: 1,
                                      uom: 'EA',
                                      unitPrice: 0,
                                      leadTimeDays: void 0,
                                    }),
                                  children: C('addLine'),
                                }),
                              ],
                            }),
                            (0, e.jsx)(y.Button, {
                              type: 'submit',
                              disabled: l.isPending,
                              children: C('submit'),
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              });
            };
        },
        2516: Pn,
        3290: yn,
        1746: gn,
        4475: hn,
        8780: ln,
        7207: (P, x, t) => {
          'use strict';
          (t.r(x), t.d(x, { default: () => y }));
          var e = t(9154),
            u = t(336),
            s = t(1298);
          let a = (0, s.D)(
              String.raw`/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/supplier/quotes/inbox/supplier-quote-inbox.tsx`,
            ),
            { __esModule: b, $$typeof: h } = a;
          a.default;
          let f = (0, s.D)(
            String.raw`/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/supplier/quotes/inbox/supplier-quote-inbox.tsx#SupplierQuoteInbox`,
          );
          function y() {
            return (0, e.jsx)(u.V, { children: (0, e.jsx)(f, {}) });
          }
        },
      },
      (P) => {
        var x = (e) => P((P.s = e));
        P.O(0, [365, 727, 61], () => x(5940));
        var t = P.O();
        (m._ENTRIES = typeof m._ENTRIES > 'u' ? {} : m._ENTRIES)[
          'middleware_app/[lng]/supplier/quotes/inbox/page'
        ] = t;
      },
    ]),
    function () {
      let P = { exports: {}, loaded: !1 };
      return (
        (function (t, e) {
          var u = Object.create,
            s = Object.defineProperty,
            a = Object.getOwnPropertyDescriptor,
            b = Object.getOwnPropertyNames,
            h = Object.getPrototypeOf,
            f = Object.prototype.hasOwnProperty,
            y = (_) => s(_, '__esModule', { value: !0 }),
            v = (_, l) => {
              y(_);
              for (var r in l) s(_, r, { get: l[r], enumerable: !0 });
            },
            o = (_, l, r) => {
              if ((l && typeof l == 'object') || typeof l == 'function')
                for (let c of b(l))
                  !f.call(_, c) &&
                    c !== 'default' &&
                    s(_, c, { get: () => l[c], enumerable: !(r = a(l, c)) || r.enumerable });
              return _;
            },
            j = (_) =>
              o(
                y(
                  s(
                    _ != null ? u(h(_)) : {},
                    'default',
                    _ && _.__esModule && 'default' in _
                      ? { get: () => _.default, enumerable: !0 }
                      : { value: _, enumerable: !0 },
                  ),
                ),
                _,
              );
          v(e, { default: () => C });
          var q = j((X(), en(K))),
            M = '@next/request-context',
            S = Symbol.for(M),
            w = Symbol.for('internal.storage');
          function L() {
            let _ = m;
            if (!_[S]) {
              let l = new q.AsyncLocalStorage(),
                r = { get: () => l.getStore(), [w]: l };
              _[S] = r;
            }
            return _[S];
          }
          var B = L();
          function $(_, l) {
            return B[w].run(_, l);
          }
          function N(_) {
            let l = {};
            return (
              _ &&
                _.forEach((r, c) => {
                  ((l[c] = r), c.toLowerCase() === 'set-cookie' && (l[c] = A(r)));
                }),
              l
            );
          }
          function A(_) {
            let l = [],
              r = 0,
              c,
              d,
              p,
              F,
              O;
            function I() {
              for (; r < _.length && /\s/.test(_.charAt(r)); ) r += 1;
              return r < _.length;
            }
            function T() {
              return ((d = _.charAt(r)), d !== '=' && d !== ';' && d !== ',');
            }
            for (; r < _.length; ) {
              for (c = r, O = !1; I(); )
                if (((d = _.charAt(r)), d === ',')) {
                  for (p = r, r += 1, I(), F = r; r < _.length && T(); ) r += 1;
                  r < _.length && _.charAt(r) === '='
                    ? ((O = !0), (r = F), l.push(_.substring(c, p)), (c = r))
                    : (r = p + 1);
                } else r += 1;
              (!O || r >= _.length) && l.push(_.substring(c, _.length));
            }
            return l;
          }
          function C(_) {
            let l = _.staticRoutes.map((c) => ({ regexp: new RegExp(c.namedRegex), page: c.page })),
              r =
                _.dynamicRoutes?.map((c) => ({ regexp: new RegExp(c.namedRegex), page: c.page })) ||
                [];
            return async function (c, d) {
              let p = new URL(c.url).pathname,
                F = {};
              if (
                (_.nextConfig?.basePath &&
                  p.startsWith(_.nextConfig.basePath) &&
                  (p = p.replace(_.nextConfig.basePath, '') || '/'),
                _.nextConfig?.i18n)
              )
                for (let I of _.nextConfig.i18n.locales) {
                  let T = new RegExp(`^/${I}($|/)`, 'i');
                  if (p.match(T)) {
                    p = p.replace(T, '/') || '/';
                    break;
                  }
                }
              for (let I of l)
                if (I.regexp.exec(p)) {
                  F.name = I.page;
                  break;
                }
              if (!F.name) {
                let I = R(p);
                for (let T of r || []) {
                  if (I && !R(T.page)) continue;
                  let V = T.regexp.exec(p);
                  if (V) {
                    F = { name: T.page, params: V.groups };
                    break;
                  }
                }
              }
              let O = await $({ waitUntil: d.waitUntil }, () =>
                m._ENTRIES[`middleware_${_.name}`].default.call(
                  {},
                  {
                    request: {
                      url: c.url,
                      method: c.method,
                      headers: N(c.headers),
                      ip: g(c.headers, E.Ip),
                      geo: {
                        city: g(c.headers, E.City, !0),
                        country: g(c.headers, E.Country, !0),
                        latitude: g(c.headers, E.Latitude),
                        longitude: g(c.headers, E.Longitude),
                        region: g(c.headers, E.Region, !0),
                      },
                      nextConfig: _.nextConfig,
                      page: F,
                      body: c.body,
                    },
                  },
                ),
              );
              return (O.waitUntil && d.waitUntil(O.waitUntil), O.response);
            };
          }
          function g(_, l, r = !1) {
            let c = _.get(l) || void 0;
            return r && c ? decodeURIComponent(c) : c;
          }
          function R(_) {
            return _ === '/api' || _.startsWith('/api/');
          }
          var E;
          (function (_) {
            ((_.City = 'x-vercel-ip-city'),
              (_.Country = 'x-vercel-ip-country'),
              (_.Ip = 'x-real-ip'),
              (_.Latitude = 'x-vercel-ip-latitude'),
              (_.Longitude = 'x-vercel-ip-longitude'),
              (_.Region = 'x-vercel-ip-country-region'));
          })(E || (E = {}));
        })(P, P.exports),
        P.exports
      );
    }
      .call({})
      .default({
        name: 'app/[lng]/supplier/quotes/inbox/page',
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
  ))(k, k, k);
export { Dc as default };
