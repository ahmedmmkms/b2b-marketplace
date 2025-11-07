var X = Object.defineProperty;
var J = Object.getOwnPropertyDescriptor;
var Q = Object.getOwnPropertyNames;
var Z = Object.prototype.hasOwnProperty;
var nn = (r, m) => () => (r && (m = r((r = 0))), m);
var W = (r, m, $, b) => {
    if ((m && typeof m == 'object') || typeof m == 'function')
      for (let f of Q(m))
        !Z.call(r, f) &&
          f !== $ &&
          X(r, f, { get: () => m[f], enumerable: !(b = J(m, f)) || b.enumerable });
    return r;
  },
  G = (r, m, $) => (W(r, m, 'default'), $ && W($, m, 'default'));
var en = (r) => W(X({}, '__esModule', { value: !0 }), r);
var K = {};
import * as Cc from 'async_hooks';
var Y = nn(() => {
  G(K, Cc);
});
import { __getNamedExports as tn } from '../../../__next-on-pages-dist__/webpack/8586.js';
import { __getNamedExports as _n } from '../../../__next-on-pages-dist__/webpack/6405.js';
import { __getNamedExports as cn } from '../../../__next-on-pages-dist__/webpack/1746.js';
import { __getNamedExports as sn } from '../../../__next-on-pages-dist__/webpack/2516.js';
import { __getNamedExports as an } from '../../../__next-on-pages-dist__/webpack/66.js';
import { __getNamedExports as on } from '../../../__next-on-pages-dist__/webpack/e180c861548def327eaab0b514e26199.js';
import { __getNamedExports as rn } from '../../../__next-on-pages-dist__/webpack/7e5b5057542a677d168ef2f7e421c64a.js';
import { __getNamedExports as un } from '../../../__next-on-pages-dist__/webpack/feaf1bd85f055963b24458fea3223a55.js';
import { __getNamedExports as ln } from '../../../__next-on-pages-dist__/manifest/8979b518535174c7eb8d77a6d5a08905.js';
var l = globalThis.__nextOnPagesRoutesIsolation.getProxyFor('/[lng]/catalog'),
  dn = tn(l, l, l),
  hn = dn.__chunk_8586,
  kn = _n(l, l, l),
  mn = kn.__chunk_6405,
  pn = cn(l, l, l),
  fn = pn.__chunk_1746,
  gn = sn(l, l, l),
  bn = gn.__chunk_2516,
  xn = an(l, l, l),
  yn = xn.__chunk_66,
  V = on(l, l, l),
  jn = V.__chunk_4874,
  Pn = V.__chunk_4742,
  En = V.__chunk_7140,
  z = rn(l, l, l),
  vn = z.__chunk_6195,
  Nn = z.__chunk_2067,
  wn = z.__chunk_935,
  Rn = z.__chunk_9228,
  Sn = z.__chunk_602,
  n = un(l, l, l),
  Tn = n.__chunk_9316,
  Cn = n.__chunk_8700,
  Mn = n.__chunk_8034,
  In = n.__chunk_5530,
  On = n.__chunk_2530,
  An = n.__chunk_4851,
  Fn = n.__chunk_4672,
  Dn = n.__chunk_336,
  $n = n.__chunk_4085,
  Ln = n.__chunk_8741,
  qn = n.__chunk_164,
  Bn = n.__chunk_1368,
  Kn = n.__chunk_5482,
  zn = n.__chunk_696,
  Un = n.__chunk_1644,
  Wn = n.__chunk_5460,
  Gn = n.__chunk_5424,
  Vn = n.__chunk_7617,
  Hn = n.__chunk_9805,
  Xn = n.__chunk_2459,
  Yn = n.__chunk_5115,
  Jn = n.__chunk_5069,
  Qn = n.__chunk_7538,
  Zn = n.__chunk_9497,
  ne = n.__chunk_2208,
  ee = n.__chunk_3906,
  te = n.__chunk_7130,
  _e = n.__chunk_7713,
  ce = n.__chunk_5765,
  se = n.__chunk_9182,
  ae = n.__chunk_1661,
  oe = n.__chunk_7042,
  re = n.__chunk_5588,
  ue = n.__chunk_7850,
  ie = n.__chunk_4961,
  le = n.__chunk_3435,
  de = n.__chunk_4508,
  he = n.__chunk_8981,
  ke = n.__chunk_5579,
  me = n.__chunk_1082,
  pe = n.__chunk_9712,
  fe = n.__chunk_1209,
  ge = n.__chunk_434,
  be = n.__chunk_3326,
  xe = n.__chunk_4314,
  ye = n.__chunk_2714,
  je = n.__chunk_5942,
  Pe = n.__chunk_106,
  Ee = n.__chunk_8712,
  ve = n.__chunk_3758,
  Ne = n.__chunk_7309,
  we = n.__chunk_9212,
  Re = n.__chunk_407,
  Se = n.__chunk_5318,
  Te = n.__chunk_4990,
  Ce = n.__chunk_5737,
  Me = n.__chunk_3065,
  Ie = n.__chunk_9327,
  Oe = n.__chunk_4114,
  Ae = n.__chunk_6977,
  Fe = n.__chunk_3831,
  De = n.__chunk_575,
  $e = n.__chunk_9145,
  Le = n.__chunk_4793,
  qe = n.__chunk_4510,
  Be = n.__chunk_8868,
  Ke = n.__chunk_7700,
  ze = n.__chunk_1511,
  Ue = n.__chunk_3196,
  We = n.__chunk_2161,
  Ge = n.__chunk_6482,
  Ve = n.__chunk_7185,
  He = n.__chunk_712,
  Xe = n.__chunk_2222,
  Ye = n.__chunk_4977,
  Je = n.__chunk_1298,
  Qe = n.__chunk_8427,
  Ze = n.__chunk_253,
  nt = n.__chunk_9154,
  et = n.__chunk_8433,
  tt = n.__chunk_291,
  _t = n.__chunk_4703,
  ct = n.__chunk_1502,
  st = n.__chunk_4634,
  at = n.__chunk_4627,
  ot = n.__chunk_2940,
  rt = n.__chunk_2041,
  ut = n.__chunk_5991,
  it = n.__chunk_5159,
  lt = n.__chunk_5143,
  dt = n.__chunk_7329,
  ht = n.__chunk_3746,
  kt = n.__chunk_8556,
  mt = n.__chunk_758,
  pt = n.__chunk_6450,
  ft = n.__chunk_207,
  gt = n.__chunk_5929,
  bt = n.__chunk_9458,
  xt = n.__chunk_4497,
  yt = n.__chunk_6612,
  jt = n.__chunk_4119,
  Pt = n.__chunk_9491,
  Et = n.__chunk_151,
  vt = n.__chunk_1875,
  Nt = n.__chunk_2990,
  wt = n.__chunk_1646,
  Rt = n.__chunk_225,
  St = n.__chunk_3254,
  Tt = n.__chunk_7497,
  Ct = n.__chunk_2798,
  Mt = n.__chunk_6828,
  It = n.__chunk_8402,
  Ot = n.__chunk_4360,
  At = n.__chunk_627,
  Ft = n.__chunk_6725,
  Dt = n.__chunk_3916,
  $t = n.__chunk_4505,
  Lt = n.__chunk_4576,
  qt = n.__chunk_9104,
  Bt = n.__chunk_2223,
  Kt = n.__chunk_6299,
  zt = n.__chunk_1478,
  Ut = n.__chunk_8186,
  Wt = n.__chunk_8997,
  Gt = n.__chunk_6575,
  Vt = n.__chunk_5521,
  Ht = n.__chunk_5758,
  Xt = n.__chunk_1349,
  Yt = n.__chunk_4709,
  Jt = n.__chunk_5448,
  Qt = n.__chunk_5401,
  Zt = n.__chunk_614,
  n_ = n.__chunk_4598,
  e_ = n.__chunk_5771,
  t_ = n.__chunk_4833,
  __ = n.__chunk_8799,
  c_ = n.__chunk_9004,
  s_ = n.__chunk_8430,
  a_ = n.__chunk_219,
  o_ = n.__chunk_9334,
  r_ = n.__chunk_2413,
  u_ = n.__chunk_5060,
  i_ = n.__chunk_5365,
  l_ = n.__chunk_6613,
  d_ = n.__chunk_252,
  h_ = n.__chunk_1331,
  k_ = n.__chunk_4180,
  m_ = n.__chunk_6618,
  p_ = n.__chunk_3160,
  f_ = n.__chunk_3972,
  g_ = n.__chunk_282,
  b_ = n.__chunk_4527,
  x_ = n.__chunk_1571,
  y_ = n.__chunk_3573,
  j_ = n.__chunk_1518,
  P_ = n.__chunk_1402,
  E_ = n.__chunk_1067,
  v_ = n.__chunk_2731,
  N_ = n.__chunk_8388,
  w_ = n.__chunk_4350,
  R_ = n.__chunk_8248,
  S_ = n.__chunk_9216,
  T_ = n.__chunk_8836,
  C_ = n.__chunk_4265,
  M_ = n.__chunk_4460,
  I_ = n.__chunk_3821,
  O_ = n.__chunk_9468,
  A_ = n.__chunk_5553,
  F_ = n.__chunk_6385,
  D_ = n.__chunk_2249,
  $_ = n.__chunk_9893,
  L_ = n.__chunk_9161,
  q_ = n.__chunk_3278,
  B_ = n.__chunk_4858,
  K_ = n.__chunk_725,
  z_ = n.__chunk_4273,
  U_ = n.__chunk_9240,
  W_ = n.__chunk_2134,
  G_ = n.__chunk_2418,
  V_ = n.__chunk_6983,
  H_ = n.__chunk_9277,
  X_ = n.__chunk_6905,
  Y_ = n.__chunk_3103,
  J_ = n.__chunk_6364,
  Q_ = n.__chunk_7724,
  Z_ = n.__chunk_1121,
  nc = n.__chunk_4783,
  ec = n.__chunk_5009,
  tc = n.__chunk_70,
  _c = n.__chunk_7376,
  cc = n.__chunk_1261,
  sc = n.__chunk_5075,
  ac = n.__chunk_3408,
  oc = n.__chunk_9563,
  rc = n.__chunk_8904,
  uc = n.__chunk_1223,
  ic = n.__chunk_5761,
  lc = n.__chunk_5941,
  dc = n.__chunk_2054,
  hc = n.__chunk_8394,
  kc = n.__chunk_9724,
  mc = n.__chunk_7779,
  pc = n.__chunk_5000,
  fc = n.__chunk_9090,
  gc = n.__chunk_5542,
  bc = n.__chunk_4,
  xc = n.__chunk_8915,
  yc = n.__chunk_7579,
  jc = n.__chunk_5389,
  Pc = n.__chunk_5336,
  Ec = n.__chunk_6788,
  vc = n.__chunk_2181,
  U = ln(l, l, l),
  Nc = U.__NEXT_FONT_MANIFEST,
  wc = U.__REACT_LOADABLE_MANIFEST,
  Rc = U.__BUILD_MANIFEST,
  Sc = U.__RSC_SERVER_MANIFEST,
  Bc = ((r, m, $) => (
    (m._ENTRIES = {}),
    (r.__RSC_SERVER_MANIFEST = Sc),
    (m.__RSC_MANIFEST = m.__RSC_MANIFEST || {}),
    (m.__RSC_MANIFEST['/[lng]/catalog/page'] = {
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
            '827',
            'static/chunks/827-72d5d87c9eee928c.js',
            '855',
            'static/chunks/855-fae9702efe576cfb.js',
            '18',
            'static/chunks/18-e5f986608a4694e8.js',
            '1',
            'static/chunks/app/%5Blng%5D/catalog/page-eaaad0b14d35dee9.js',
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
          chunks: [
            '655',
            'static/chunks/655-56915f9d114b7f4e.js',
            '43',
            'static/chunks/43-fa995ca364ebf5a6.js',
            '827',
            'static/chunks/827-72d5d87c9eee928c.js',
            '855',
            'static/chunks/855-fae9702efe576cfb.js',
            '18',
            'static/chunks/18-e5f986608a4694e8.js',
            '1',
            'static/chunks/app/%5Blng%5D/catalog/page-eaaad0b14d35dee9.js',
          ],
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
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/catalog/page': [],
      },
    }),
    (r.__BUILD_MANIFEST = Rc),
    (r.__REACT_LOADABLE_MANIFEST = wc),
    (r.__NEXT_FONT_MANIFEST = Nc),
    (r.__INTERCEPTION_ROUTE_REWRITE_MANIFEST = '[]'),
    (r.__PRERENDER_MANIFEST =
      '{"version":4,"routes":{},"dynamicRoutes":{},"notFoundRoutes":[],"preview":{"previewModeId":"process.env.__NEXT_PREVIEW_MODE_ID","previewModeSigningKey":"process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY","previewModeEncryptionKey":"process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY"}}'),
    (() => {
      'use strict';
      var b = {},
        f = {};
      function e(t) {
        var o = f[t];
        if (o !== void 0) return o.exports;
        var s = (f[t] = { exports: {} }),
          h = !0;
        try {
          (b[t](s, s.exports, e), (h = !1));
        } finally {
          h && delete f[t];
        }
        return s.exports;
      }
      ((e.m = b),
        (e.amdO = {}),
        (() => {
          var t = [];
          e.O = (o, s, h, k) => {
            if (s) {
              k = k || 0;
              for (var d = t.length; d > 0 && t[d - 1][2] > k; d--) t[d] = t[d - 1];
              t[d] = [s, h, k];
              return;
            }
            for (var p = 1 / 0, d = 0; d < t.length; d++) {
              for (var [s, h, k] = t[d], g = !0, y = 0; y < s.length; y++)
                p >= k && Object.keys(e.O).every((R) => e.O[R](s[y]))
                  ? s.splice(y--, 1)
                  : ((g = !1), k < p && (p = k));
              if (g) {
                t.splice(d--, 1);
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
            var k = Object.create(null);
            e.r(k);
            var d = {};
            t = t || [null, o({}), o([]), o(o)];
            for (var p = 2 & h && s; typeof p == 'object' && !~t.indexOf(p); p = o(p))
              Object.getOwnPropertyNames(p).forEach((g) => (d[g] = () => s[g]));
            return ((d.default = () => s), e.d(k, d), k);
          };
        })(),
        (e.d = (t, o) => {
          for (var s in o)
            e.o(o, s) && !e.o(t, s) && Object.defineProperty(t, s, { enumerable: !0, get: o[s] });
        }),
        (e.e = () => Promise.resolve()),
        (e.g = (function () {
          if (typeof m == 'object') return m;
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
          var o = (h, k) => {
              var d,
                p,
                [g, y, u] = k,
                N = 0;
              if (g.some((j) => t[j] !== 0)) {
                for (d in y) e.o(y, d) && (e.m[d] = y[d]);
                if (u) var I = u(e);
              }
              for (h && h(k); N < g.length; N++)
                ((p = g[N]), e.o(t, p) && t[p] && t[p][0](), (t[p] = 0));
              return e.O(I);
            },
            s = (r.webpackChunk_N_E = r.webpackChunk_N_E || []);
          (s.forEach(o.bind(null, 0)), (s.push = o.bind(null, s.push.bind(s))));
        })());
    })(),
    (r.webpackChunk_N_E = r.webpackChunk_N_E || []).push([
      [365],
      {
        2181: vc,
        6788: Ec,
        5336: Pc,
        5389: jc,
        7579: yc,
        8915: xc,
        4: bc,
        5542: gc,
        9090: fc,
        5e3: pc,
        7779: mc,
        9724: kc,
        8394: hc,
        2054: dc,
        5941: lc,
        5761: ic,
        1223: uc,
        8904: rc,
        9563: oc,
        3408: ac,
        5075: sc,
        1261: cc,
        7376: _c,
        70: tc,
        5009: ec,
        4783: nc,
        1121: Z_,
        7724: Q_,
        6364: J_,
        3103: Y_,
        6905: X_,
        9277: H_,
        6983: V_,
        2418: G_,
        2134: W_,
        9240: U_,
        4273: z_,
        725: K_,
        4858: B_,
        3278: q_,
        9161: L_,
        9893: $_,
        2249: D_,
        6385: F_,
        5553: A_,
        9468: O_,
        3821: I_,
        4460: M_,
        4265: C_,
        8836: T_,
        9216: S_,
        8248: R_,
        4350: w_,
        8388: N_,
        2731: v_,
        1067: E_,
        1402: P_,
        1518: j_,
        3573: y_,
        1571: x_,
        4527: b_,
        282: g_,
        3972: f_,
        3160: p_,
        6618: m_,
        4180: k_,
        1331: h_,
        252: d_,
        6613: l_,
        5365: i_,
        5060: u_,
        2413: r_,
        9334: o_,
        219: a_,
        8430: s_,
        9004: c_,
        8799: __,
        4833: t_,
        5771: e_,
        4598: n_,
        614: Zt,
        5401: Qt,
        5448: Jt,
        4709: Yt,
        1349: Xt,
        5758: Ht,
        5521: Vt,
        6575: Gt,
        8997: Wt,
        8186: Ut,
        1478: zt,
        6299: Kt,
        2223: Bt,
        9104: qt,
        4576: Lt,
        4505: $t,
        3916: Dt,
        6725: Ft,
        627: At,
        4360: Ot,
        8402: It,
        6828: Mt,
        2798: Ct,
        7497: Tt,
        3254: St,
        225: Rt,
        1646: wt,
        2990: Nt,
        1875: vt,
        151: Et,
        9491: Pt,
        4119: jt,
        6612: yt,
        4497: xt,
        9458: bt,
        5929: gt,
        207: ft,
        6450: pt,
        758: mt,
        8556: kt,
        3746: ht,
        7329: dt,
        5143: lt,
        5159: it,
        5991: ut,
        2041: rt,
        2940: ot,
        4627: at,
        4634: st,
        1502: ct,
        4703: _t,
        291: tt,
        8433: et,
        9154: nt,
        253: Ze,
        8427: Qe,
        1298: Je,
        4977: Ye,
        2222: Xe,
        712: He,
        7185: Ve,
        6482: Ge,
        2161: We,
        3196: Ue,
        1511: ze,
        7700: Ke,
        602: Sn,
        9228: Rn,
        8868: Be,
        935: wn,
        4510: qe,
        4793: Le,
        9145: $e,
        575: De,
        3831: Fe,
        6977: Ae,
        4114: Oe,
        9327: Ie,
        3065: Me,
        5737: Ce,
        4990: Te,
        5318: Se,
        407: Re,
        9212: we,
        7309: Ne,
        3758: ve,
        8712: Ee,
        106: Pe,
        5942: je,
        2714: ye,
        4314: xe,
        3326: be,
        434: ge,
        1209: fe,
        9712: pe,
        1082: me,
        5579: ke,
        8981: he,
        4508: de,
        3435: le,
        4961: ie,
        7850: ue,
        5588: re,
        7042: oe,
        1661: ae,
        9182: se,
        5765: ce,
      },
    ]),
    (r.webpackChunk_N_E = r.webpackChunk_N_E || []).push([[140], { 7140: En, 4742: Pn }]),
    (r.webpackChunk_N_E = r.webpackChunk_N_E || []).push([
      [61],
      {
        7713: _e,
        7130: te,
        3906: ee,
        2208: ne,
        9497: Zn,
        7538: Qn,
        5069: Jn,
        5115: Yn,
        2459: Xn,
        9805: Hn,
        7617: Vn,
        5424: Gn,
        5460: Wn,
        1644: Un,
        696: zn,
        5482: Kn,
        1368: Bn,
        164: qn,
        8741: Ln,
        4085: $n,
        336: Dn,
        4672: Fn,
        4851: An,
        2530: On,
        5530: In,
        8034: Mn,
        8700: Cn,
        9316: Tn,
      },
    ]),
    (r.webpackChunk_N_E = r.webpackChunk_N_E || []).push([
      [1],
      {
        2067: Nn,
        6195: vn,
        2274: (b, f, e) => {
          'use strict';
          (e.r(f), e.d(f, { ComponentMod: () => c, default: () => v }));
          var t,
            o = {};
          (e.r(o),
            e.d(o, {
              AppRouter: () => u.WY,
              ClientPageRoot: () => u.b1,
              GlobalError: () => y.ZP,
              LayoutRouter: () => u.yO,
              NotFoundBoundary: () => u.O4,
              Postpone: () => u.hQ,
              RenderFromTemplateContext: () => u.b5,
              __next_app__: () => C,
              actionAsyncStorage: () => u.Wz,
              createDynamicallyTrackedSearchParams: () => u.rL,
              createUntrackedSearchParams: () => u.S5,
              decodeAction: () => u.Hs,
              decodeFormState: () => u.dH,
              decodeReply: () => u.kf,
              originalPathname: () => j,
              pages: () => I,
              patchFetch: () => u.XH,
              preconnect: () => u.$P,
              preloadFont: () => u.C5,
              preloadStyle: () => u.oH,
              renderToReadableStream: () => u.aW,
              requestAsyncStorage: () => u.Fg,
              routeModule: () => R,
              serverHooks: () => u.GP,
              staticGenerationAsyncStorage: () => u.AT,
              taintObjectReference: () => u.nr,
              tree: () => N,
            }),
            e(4833));
          var s = e(9004),
            h = e(4783),
            k = e(252),
            d = e(3573),
            p = e(3196),
            g = e(2161),
            y = e(4977),
            u = e(6482);
          let N = [
              '',
              {
                children: [
                  '[lng]',
                  {
                    children: [
                      'catalog',
                      {
                        children: [
                          '__PAGE__',
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(e.bind(e, 4401)),
                              '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/catalog/page.tsx',
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
            I = ['/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/catalog/page.tsx'],
            j = '/[lng]/catalog/page',
            C = { require: e, loadChunk: () => Promise.resolve() },
            R = new p.AppPageRouteModule({
              definition: {
                kind: g.x.APP_PAGE,
                page: '/[lng]/catalog/page',
                pathname: '/[lng]/catalog',
                bundlePath: '',
                filename: '',
                appPaths: [],
              },
              userland: { loaderTree: N },
            });
          var L = e(8388),
            q = e(4527),
            F = e(1518);
          let S = (x) => (x ? JSON.parse(x) : void 0),
            D = r.__BUILD_MANIFEST,
            B = S(r.__PRERENDER_MANIFEST),
            E = S(r.__REACT_LOADABLE_MANIFEST),
            w = (t = r.__RSC_MANIFEST) == null ? void 0 : t['/[lng]/catalog/page'],
            P = S(r.__RSC_SERVER_MANIFEST),
            _ = S(r.__NEXT_FONT_MANIFEST),
            i = S(r.__INTERCEPTION_ROUTE_REWRITE_MANIFEST) ?? [];
          w &&
            P &&
            (0, q.Mo)({
              clientReferenceManifest: w,
              serverActionsManifest: P,
              serverModuleMap: (0, F.w)({
                serverActionsManifest: P,
                pageName: '/[lng]/catalog/page',
              }),
            });
          let a = (0, h.d)({
              pagesType: L.s.APP,
              dev: !1,
              page: '/[lng]/catalog/page',
              appMod: null,
              pageMod: o,
              errorMod: null,
              error500Mod: null,
              Document: null,
              buildManifest: D,
              prerenderManifest: B,
              renderToHTML: d.f,
              reactLoadableManifest: E,
              clientReferenceManifest: w,
              serverActionsManifest: P,
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
              interceptionRouteRewrites: i,
            }),
            c = o;
          function v(x) {
            return (0, s.C)({ ...x, IncrementalCache: k.k, handler: a });
          }
        },
        8729: (b, f, e) => {
          (Promise.resolve().then(e.bind(e, 8830)), Promise.resolve().then(e.bind(e, 5069)));
        },
        8830: (b, f, e) => {
          'use strict';
          e.d(f, { CatalogContent: () => I });
          var t = e(3408),
            o = e(9563),
            s = e(9712),
            h = e(3435),
            k = e(2516),
            d = e(4874),
            p = e(66),
            g = e(1746),
            y = e(5424),
            u = e(1368),
            N = e(8586);
          let I = () => {
            let j = (0, s.T_)('catalog'),
              C = (0, s.T_)('common.table'),
              R = (0, h.bU)(),
              L = (0, u.y)('search.enabled', !0),
              q = (0, u.y)('catalog.publicBrowse', !0),
              [F, S] = (0, o.useState)(''),
              [D, B] = (0, o.useState)(''),
              [E, w] = (0, o.useState)(1),
              { data: P, isLoading: _ } = (0, y.rn)(
                { q: F || void 0, category: D || void 0, page: E, pageSize: 20 },
                { query: { placeholderData: (c) => c } },
              ),
              i = (0, o.useMemo)(
                () => [
                  {
                    accessorKey: 'name',
                    header: j('product.overview'),
                    cell: ({ row: c }) =>
                      (0, t.jsxs)('div', {
                        children: [
                          (0, t.jsx)('div', {
                            className: 'font-semibold',
                            children: c.original.name,
                          }),
                          (0, t.jsx)('div', {
                            className: 'text-muted-foreground text-xs',
                            children: c.original.sku,
                          }),
                        ],
                      }),
                  },
                  {
                    accessorKey: 'category',
                    header: j('filters.category'),
                    cell: ({ getValue: c }) =>
                      (0, t.jsx)('span', { className: 'text-sm capitalize', children: c() ?? '-' }),
                  },
                  {
                    accessorKey: 'referencePrice',
                    header: 'Price',
                    cell: ({ row: c }) =>
                      c.original.referencePrice != null
                        ? (0, N.xG)(c.original.referencePrice, c.original.currency ?? 'USD', R)
                        : '-',
                  },
                  {
                    accessorKey: 'leadTimeDays',
                    header: j('product.leadTime'),
                    cell: ({ row: c }) =>
                      c.original.leadTimeDays != null ? `${c.original.leadTimeDays} d` : '-',
                  },
                ],
                [R, j],
              ),
              a = (c) => {
                c < 1 || w(c);
              };
            return q
              ? (0, t.jsxs)('div', {
                  className: 'flex flex-col',
                  children: [
                    (0, t.jsx)(k.m, { title: j('title'), breadcrumbs: [{ label: j('title') }] }),
                    (0, t.jsxs)('div', {
                      className: 'space-y-6 p-6',
                      children: [
                        L
                          ? (0, t.jsxs)('div', {
                              className: 'grid gap-4 md:grid-cols-2 lg:grid-cols-4',
                              children: [
                                (0, t.jsxs)('label', {
                                  className: 'flex flex-col gap-2',
                                  children: [
                                    (0, t.jsx)('span', {
                                      className: 'text-muted-foreground text-sm font-medium',
                                      children: C('search'),
                                    }),
                                    (0, t.jsx)(g.I, {
                                      value: F,
                                      onChange: (c) => {
                                        (S(c.target.value), w(1));
                                      },
                                      placeholder: j('searchPlaceholder'),
                                    }),
                                  ],
                                }),
                                (0, t.jsxs)('label', {
                                  className: 'flex flex-col gap-2',
                                  children: [
                                    (0, t.jsx)('span', {
                                      className: 'text-muted-foreground text-sm font-medium',
                                      children: j('filters.category'),
                                    }),
                                    (0, t.jsx)(g.I, {
                                      value: D,
                                      onChange: (c) => {
                                        (B(c.target.value), w(1));
                                      },
                                      placeholder: j('filters.allCategories'),
                                    }),
                                  ],
                                }),
                              ],
                            })
                          : null,
                        (0, t.jsx)(d.w, {
                          columns: i,
                          data: P?.items ?? [],
                          page: E,
                          pageSize: 20,
                          totalItems: P?.total ?? 0,
                          onPageChange: (c) => a(c),
                          isLoading: _,
                          enableCsvExport: !0,
                          csvFileName: 'catalog',
                          emptyMessage: C('empty'),
                        }),
                      ],
                    }),
                  ],
                })
              : (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)(k.m, {
                      title: j('title'),
                      description: 'Catalog browsing is disabled for this environment.',
                    }),
                    (0, t.jsx)('div', {
                      className: 'p-6',
                      children: (0, t.jsx)(p.u, {
                        title: 'Catalog feature disabled',
                        description: 'Enable catalog.publicBrowse flag to view products.',
                      }),
                    }),
                  ],
                });
          };
        },
        4874: jn,
        66: yn,
        2516: bn,
        1746: fn,
        6405: mn,
        8586: hn,
        4401: (b, f, e) => {
          'use strict';
          (e.r(f), e.d(f, { default: () => y }));
          var t = e(9154),
            o = e(336),
            s = e(253),
            h = e(1298);
          let k = (0, h.D)(
              String.raw`/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/catalog/catalog-content.tsx`,
            ),
            { __esModule: d, $$typeof: p } = k;
          k.default;
          let g = (0, h.D)(
            String.raw`/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/catalog/catalog-content.tsx#CatalogContent`,
          );
          function y() {
            return (0, t.jsx)(o.V, {
              children: (0, t.jsx)(s.Suspense, {
                fallback: (0, t.jsx)('div', { className: 'p-6', children: 'Loading catalog...' }),
                children: (0, t.jsx)(g, {}),
              }),
            });
          }
        },
      },
      (b) => {
        var f = (t) => b((b.s = t));
        b.O(0, [365, 140, 61], () => f(2274));
        var e = b.O();
        (m._ENTRIES = typeof m._ENTRIES > 'u' ? {} : m._ENTRIES)[
          'middleware_app/[lng]/catalog/page'
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
            k = Object.getOwnPropertyNames,
            d = Object.getPrototypeOf,
            p = Object.prototype.hasOwnProperty,
            g = (_) => s(_, '__esModule', { value: !0 }),
            y = (_, i) => {
              g(_);
              for (var a in i) s(_, a, { get: i[a], enumerable: !0 });
            },
            u = (_, i, a) => {
              if ((i && typeof i == 'object') || typeof i == 'function')
                for (let c of k(i))
                  !p.call(_, c) &&
                    c !== 'default' &&
                    s(_, c, { get: () => i[c], enumerable: !(a = h(i, c)) || a.enumerable });
              return _;
            },
            N = (_) =>
              u(
                g(
                  s(
                    _ != null ? o(d(_)) : {},
                    'default',
                    _ && _.__esModule && 'default' in _
                      ? { get: () => _.default, enumerable: !0 }
                      : { value: _, enumerable: !0 },
                  ),
                ),
                _,
              );
          y(t, { default: () => B });
          var I = N((Y(), en(K))),
            j = '@next/request-context',
            C = Symbol.for(j),
            R = Symbol.for('internal.storage');
          function L() {
            let _ = m;
            if (!_[C]) {
              let i = new I.AsyncLocalStorage(),
                a = { get: () => i.getStore(), [R]: i };
              _[C] = a;
            }
            return _[C];
          }
          var q = L();
          function F(_, i) {
            return q[R].run(_, i);
          }
          function S(_) {
            let i = {};
            return (
              _ &&
                _.forEach((a, c) => {
                  ((i[c] = a), c.toLowerCase() === 'set-cookie' && (i[c] = D(a)));
                }),
              i
            );
          }
          function D(_) {
            let i = [],
              a = 0,
              c,
              v,
              x,
              O,
              A;
            function T() {
              for (; a < _.length && /\s/.test(_.charAt(a)); ) a += 1;
              return a < _.length;
            }
            function M() {
              return ((v = _.charAt(a)), v !== '=' && v !== ';' && v !== ',');
            }
            for (; a < _.length; ) {
              for (c = a, A = !1; T(); )
                if (((v = _.charAt(a)), v === ',')) {
                  for (x = a, a += 1, T(), O = a; a < _.length && M(); ) a += 1;
                  a < _.length && _.charAt(a) === '='
                    ? ((A = !0), (a = O), i.push(_.substring(c, x)), (c = a))
                    : (a = x + 1);
                } else a += 1;
              (!A || a >= _.length) && i.push(_.substring(c, _.length));
            }
            return i;
          }
          function B(_) {
            let i = _.staticRoutes.map((c) => ({ regexp: new RegExp(c.namedRegex), page: c.page })),
              a =
                _.dynamicRoutes?.map((c) => ({ regexp: new RegExp(c.namedRegex), page: c.page })) ||
                [];
            return async function (c, v) {
              let x = new URL(c.url).pathname,
                O = {};
              if (
                (_.nextConfig?.basePath &&
                  x.startsWith(_.nextConfig.basePath) &&
                  (x = x.replace(_.nextConfig.basePath, '') || '/'),
                _.nextConfig?.i18n)
              )
                for (let T of _.nextConfig.i18n.locales) {
                  let M = new RegExp(`^/${T}($|/)`, 'i');
                  if (x.match(M)) {
                    x = x.replace(M, '/') || '/';
                    break;
                  }
                }
              for (let T of i)
                if (T.regexp.exec(x)) {
                  O.name = T.page;
                  break;
                }
              if (!O.name) {
                let T = w(x);
                for (let M of a || []) {
                  if (T && !w(M.page)) continue;
                  let H = M.regexp.exec(x);
                  if (H) {
                    O = { name: M.page, params: H.groups };
                    break;
                  }
                }
              }
              let A = await F({ waitUntil: v.waitUntil }, () =>
                m._ENTRIES[`middleware_${_.name}`].default.call(
                  {},
                  {
                    request: {
                      url: c.url,
                      method: c.method,
                      headers: S(c.headers),
                      ip: E(c.headers, P.Ip),
                      geo: {
                        city: E(c.headers, P.City, !0),
                        country: E(c.headers, P.Country, !0),
                        latitude: E(c.headers, P.Latitude),
                        longitude: E(c.headers, P.Longitude),
                        region: E(c.headers, P.Region, !0),
                      },
                      nextConfig: _.nextConfig,
                      page: O,
                      body: c.body,
                    },
                  },
                ),
              );
              return (A.waitUntil && v.waitUntil(A.waitUntil), A.response);
            };
          }
          function E(_, i, a = !1) {
            let c = _.get(i) || void 0;
            return a && c ? decodeURIComponent(c) : c;
          }
          function w(_) {
            return _ === '/api' || _.startsWith('/api/');
          }
          var P;
          (function (_) {
            ((_.City = 'x-vercel-ip-city'),
              (_.Country = 'x-vercel-ip-country'),
              (_.Ip = 'x-real-ip'),
              (_.Latitude = 'x-vercel-ip-latitude'),
              (_.Longitude = 'x-vercel-ip-longitude'),
              (_.Region = 'x-vercel-ip-country-region'));
          })(P || (P = {}));
        })(b, b.exports),
        b.exports
      );
    }
      .call({})
      .default({
        name: 'app/[lng]/catalog/page',
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
  ))(l, l, l);
export { Bc as default };
