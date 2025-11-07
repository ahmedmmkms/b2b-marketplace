var V = Object.defineProperty;
var Y = Object.getOwnPropertyDescriptor;
var J = Object.getOwnPropertyNames;
var Q = Object.prototype.hasOwnProperty;
var Z = (u, k) => () => (u && (k = u((u = 0))), k);
var W = (u, k, F, x) => {
    if ((k && typeof k == 'object') || typeof k == 'function')
      for (let f of J(k))
        !Q.call(u, f) &&
          f !== F &&
          V(u, f, { get: () => k[f], enumerable: !(x = Y(k, f)) || x.enumerable });
    return u;
  },
  G = (u, k, F) => (W(u, k, 'default'), F && W(F, k, 'default'));
var nn = (u) => W(V({}, '__esModule', { value: !0 }), u);
var D = {};
import * as x_ from 'async_hooks';
var X = Z(() => {
  G(D, x_);
});
import { __getNamedExports as en } from '../../../../__next-on-pages-dist__/webpack/8586.js';
import { __getNamedExports as tn } from '../../../../__next-on-pages-dist__/webpack/3290.js';
import { __getNamedExports as cn } from '../../../../__next-on-pages-dist__/webpack/2516.js';
import { __getNamedExports as _n } from '../../../../__next-on-pages-dist__/webpack/7e5b5057542a677d168ef2f7e421c64a.js';
import { __getNamedExports as sn } from '../../../../__next-on-pages-dist__/webpack/feaf1bd85f055963b24458fea3223a55.js';
import { __getNamedExports as an } from '../../../../__next-on-pages-dist__/manifest/8979b518535174c7eb8d77a6d5a08905.js';
var g = globalThis.__nextOnPagesRoutesIsolation.getProxyFor('/[lng]/product/[id]'),
  on = en(g, g, g),
  rn = on.__chunk_8586,
  un = tn(g, g, g),
  dn = un.__chunk_3290,
  ln = cn(g, g, g),
  hn = ln.__chunk_2516,
  $ = _n(g, g, g),
  kn = $.__chunk_6195,
  mn = $.__chunk_2067,
  pn = $.__chunk_935,
  fn = $.__chunk_9228,
  gn = $.__chunk_602,
  n = sn(g, g, g),
  bn = n.__chunk_9316,
  xn = n.__chunk_8700,
  yn = n.__chunk_8034,
  jn = n.__chunk_5530,
  Pn = n.__chunk_2530,
  vn = n.__chunk_4851,
  En = n.__chunk_4672,
  Nn = n.__chunk_336,
  wn = n.__chunk_4085,
  Rn = n.__chunk_8741,
  Sn = n.__chunk_164,
  Mn = n.__chunk_1368,
  Tn = n.__chunk_5482,
  In = n.__chunk_696,
  On = n.__chunk_1644,
  Cn = n.__chunk_5460,
  An = n.__chunk_5424,
  Fn = n.__chunk_7617,
  Dn = n.__chunk_9805,
  $n = n.__chunk_2459,
  Ln = n.__chunk_5115,
  Bn = n.__chunk_5069,
  qn = n.__chunk_7538,
  Kn = n.__chunk_9497,
  Un = n.__chunk_2208,
  zn = n.__chunk_3906,
  Wn = n.__chunk_7130,
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
  ce = n.__chunk_5579,
  _e = n.__chunk_1082,
  se = n.__chunk_9712,
  ae = n.__chunk_1209,
  oe = n.__chunk_434,
  re = n.__chunk_3326,
  ue = n.__chunk_4314,
  de = n.__chunk_2714,
  ie = n.__chunk_5942,
  le = n.__chunk_106,
  he = n.__chunk_8712,
  ke = n.__chunk_3758,
  me = n.__chunk_7309,
  pe = n.__chunk_9212,
  fe = n.__chunk_407,
  ge = n.__chunk_5318,
  be = n.__chunk_4990,
  xe = n.__chunk_5737,
  ye = n.__chunk_3065,
  je = n.__chunk_9327,
  Pe = n.__chunk_4114,
  ve = n.__chunk_6977,
  Ee = n.__chunk_3831,
  Ne = n.__chunk_575,
  we = n.__chunk_9145,
  Re = n.__chunk_4793,
  Se = n.__chunk_4510,
  Me = n.__chunk_8868,
  Te = n.__chunk_7700,
  Ie = n.__chunk_1511,
  Oe = n.__chunk_3196,
  Ce = n.__chunk_2161,
  Ae = n.__chunk_6482,
  Fe = n.__chunk_7185,
  De = n.__chunk_712,
  $e = n.__chunk_2222,
  Le = n.__chunk_4977,
  Be = n.__chunk_1298,
  qe = n.__chunk_8427,
  Ke = n.__chunk_253,
  Ue = n.__chunk_9154,
  ze = n.__chunk_8433,
  We = n.__chunk_291,
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
  ct = n.__chunk_8556,
  _t = n.__chunk_758,
  st = n.__chunk_6450,
  at = n.__chunk_207,
  ot = n.__chunk_5929,
  rt = n.__chunk_9458,
  ut = n.__chunk_4497,
  dt = n.__chunk_6612,
  it = n.__chunk_4119,
  lt = n.__chunk_9491,
  ht = n.__chunk_151,
  kt = n.__chunk_1875,
  mt = n.__chunk_2990,
  pt = n.__chunk_1646,
  ft = n.__chunk_225,
  gt = n.__chunk_3254,
  bt = n.__chunk_7497,
  xt = n.__chunk_2798,
  yt = n.__chunk_6828,
  jt = n.__chunk_8402,
  Pt = n.__chunk_4360,
  vt = n.__chunk_627,
  Et = n.__chunk_6725,
  Nt = n.__chunk_3916,
  wt = n.__chunk_4505,
  Rt = n.__chunk_4576,
  St = n.__chunk_9104,
  Mt = n.__chunk_2223,
  Tt = n.__chunk_6299,
  It = n.__chunk_1478,
  Ot = n.__chunk_8186,
  Ct = n.__chunk_8997,
  At = n.__chunk_6575,
  Ft = n.__chunk_5521,
  Dt = n.__chunk_5758,
  $t = n.__chunk_1349,
  Lt = n.__chunk_4709,
  Bt = n.__chunk_5448,
  qt = n.__chunk_5401,
  Kt = n.__chunk_614,
  Ut = n.__chunk_4598,
  zt = n.__chunk_5771,
  Wt = n.__chunk_4833,
  Gt = n.__chunk_8799,
  Ht = n.__chunk_9004,
  Vt = n.__chunk_8430,
  Xt = n.__chunk_219,
  Yt = n.__chunk_9334,
  Jt = n.__chunk_2413,
  Qt = n.__chunk_5060,
  Zt = n.__chunk_5365,
  nc = n.__chunk_6613,
  ec = n.__chunk_252,
  tc = n.__chunk_1331,
  cc = n.__chunk_4180,
  _c = n.__chunk_6618,
  sc = n.__chunk_3160,
  ac = n.__chunk_3972,
  oc = n.__chunk_282,
  rc = n.__chunk_4527,
  uc = n.__chunk_1571,
  dc = n.__chunk_3573,
  ic = n.__chunk_1518,
  lc = n.__chunk_1402,
  hc = n.__chunk_1067,
  kc = n.__chunk_2731,
  mc = n.__chunk_8388,
  pc = n.__chunk_4350,
  fc = n.__chunk_8248,
  gc = n.__chunk_9216,
  bc = n.__chunk_8836,
  xc = n.__chunk_4265,
  yc = n.__chunk_4460,
  jc = n.__chunk_3821,
  Pc = n.__chunk_9468,
  vc = n.__chunk_5553,
  Ec = n.__chunk_6385,
  Nc = n.__chunk_2249,
  wc = n.__chunk_9893,
  Rc = n.__chunk_9161,
  Sc = n.__chunk_3278,
  Mc = n.__chunk_4858,
  Tc = n.__chunk_725,
  Ic = n.__chunk_4273,
  Oc = n.__chunk_9240,
  Cc = n.__chunk_2134,
  Ac = n.__chunk_2418,
  Fc = n.__chunk_6983,
  Dc = n.__chunk_9277,
  $c = n.__chunk_6905,
  Lc = n.__chunk_3103,
  Bc = n.__chunk_6364,
  qc = n.__chunk_7724,
  Kc = n.__chunk_1121,
  Uc = n.__chunk_4783,
  zc = n.__chunk_5009,
  Wc = n.__chunk_70,
  Gc = n.__chunk_7376,
  Hc = n.__chunk_1261,
  Vc = n.__chunk_5075,
  Xc = n.__chunk_3408,
  Yc = n.__chunk_9563,
  Jc = n.__chunk_8904,
  Qc = n.__chunk_1223,
  Zc = n.__chunk_5761,
  n_ = n.__chunk_5941,
  e_ = n.__chunk_2054,
  t_ = n.__chunk_8394,
  c_ = n.__chunk_9724,
  __ = n.__chunk_7779,
  s_ = n.__chunk_5000,
  a_ = n.__chunk_9090,
  o_ = n.__chunk_5542,
  r_ = n.__chunk_4,
  u_ = n.__chunk_8915,
  d_ = n.__chunk_7579,
  i_ = n.__chunk_5389,
  l_ = n.__chunk_5336,
  h_ = n.__chunk_6788,
  k_ = n.__chunk_2181,
  L = an(g, g, g),
  m_ = L.__NEXT_FONT_MANIFEST,
  p_ = L.__REACT_LOADABLE_MANIFEST,
  f_ = L.__BUILD_MANIFEST,
  g_ = L.__RSC_SERVER_MANIFEST,
  w_ = ((u, k, F) => (
    (k._ENTRIES = {}),
    (u.__RSC_SERVER_MANIFEST = g_),
    (k.__RSC_MANIFEST = k.__RSC_MANIFEST || {}),
    (k.__RSC_MANIFEST['/[lng]/product/[id]/page'] = {
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
            '229',
            'static/chunks/app/%5Blng%5D/product/%5Bid%5D/page-80ea6761e6de6417.js',
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
          chunks: [
            '655',
            'static/chunks/655-56915f9d114b7f4e.js',
            '43',
            'static/chunks/43-fa995ca364ebf5a6.js',
            '855',
            'static/chunks/855-fae9702efe576cfb.js',
            '229',
            'static/chunks/app/%5Blng%5D/product/%5Bid%5D/page-80ea6761e6de6417.js',
          ],
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
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/product/[id]/page': [],
      },
    }),
    (u.__BUILD_MANIFEST = f_),
    (u.__REACT_LOADABLE_MANIFEST = p_),
    (u.__NEXT_FONT_MANIFEST = m_),
    (u.__INTERCEPTION_ROUTE_REWRITE_MANIFEST = '[]'),
    (u.__PRERENDER_MANIFEST =
      '{"version":4,"routes":{},"dynamicRoutes":{},"notFoundRoutes":[],"preview":{"previewModeId":"process.env.__NEXT_PREVIEW_MODE_ID","previewModeSigningKey":"process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY","previewModeEncryptionKey":"process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY"}}'),
    (() => {
      'use strict';
      var x = {},
        f = {};
      function t(e) {
        var r = f[e];
        if (r !== void 0) return r.exports;
        var _ = (f[e] = { exports: {} }),
          d = !0;
        try {
          (x[e](_, _.exports, t), (d = !1));
        } finally {
          d && delete f[e];
        }
        return _.exports;
      }
      ((t.m = x),
        (t.amdO = {}),
        (() => {
          var e = [];
          t.O = (r, _, d, m) => {
            if (_) {
              m = m || 0;
              for (var l = e.length; l > 0 && e[l - 1][2] > m; l--) e[l] = e[l - 1];
              e[l] = [_, d, m];
              return;
            }
            for (var p = 1 / 0, l = 0; l < e.length; l++) {
              for (var [_, d, m] = e[l], b = !0, h = 0; h < _.length; h++)
                p >= m && Object.keys(t.O).every((C) => t.O[C](_[h]))
                  ? _.splice(h--, 1)
                  : ((b = !1), m < p && (p = m));
              if (b) {
                e.splice(l--, 1);
                var s = d();
                s !== void 0 && (r = s);
              }
            }
            return r;
          };
        })(),
        (t.n = (e) => {
          var r = e && e.__esModule ? () => e.default : () => e;
          return (t.d(r, { a: r }), r);
        }),
        (() => {
          var e,
            r = Object.getPrototypeOf ? (_) => Object.getPrototypeOf(_) : (_) => _.__proto__;
          t.t = function (_, d) {
            if (
              (1 & d && (_ = this(_)),
              8 & d ||
                (typeof _ == 'object' &&
                  _ &&
                  ((4 & d && _.__esModule) || (16 & d && typeof _.then == 'function'))))
            )
              return _;
            var m = Object.create(null);
            t.r(m);
            var l = {};
            e = e || [null, r({}), r([]), r(r)];
            for (var p = 2 & d && _; typeof p == 'object' && !~e.indexOf(p); p = r(p))
              Object.getOwnPropertyNames(p).forEach((b) => (l[b] = () => _[b]));
            return ((l.default = () => _), t.d(m, l), m);
          };
        })(),
        (t.d = (e, r) => {
          for (var _ in r)
            t.o(r, _) && !t.o(e, _) && Object.defineProperty(e, _, { enumerable: !0, get: r[_] });
        }),
        (t.e = () => Promise.resolve()),
        (t.g = (function () {
          if (typeof k == 'object') return k;
          try {
            return this || Function('return this')();
          } catch {
            if (typeof window == 'object') return window;
          }
        })()),
        (t.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r)),
        (t.r = (e) => {
          (typeof Symbol < 'u' &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
            Object.defineProperty(e, '__esModule', { value: !0 }));
        }),
        (() => {
          var e = { 993: 0 };
          t.O.j = (d) => e[d] === 0;
          var r = (d, m) => {
              var l,
                p,
                [b, h, s] = m,
                v = 0;
              if (b.some((N) => e[N] !== 0)) {
                for (l in h) t.o(h, l) && (t.m[l] = h[l]);
                if (s) var S = s(t);
              }
              for (d && d(m); v < b.length; v++)
                ((p = b[v]), t.o(e, p) && e[p] && e[p][0](), (e[p] = 0));
              return t.O(S);
            },
            _ = (u.webpackChunk_N_E = u.webpackChunk_N_E || []);
          (_.forEach(r.bind(null, 0)), (_.push = r.bind(null, _.push.bind(_))));
        })());
    })(),
    (u.webpackChunk_N_E = u.webpackChunk_N_E || []).push([
      [365],
      {
        2181: k_,
        6788: h_,
        5336: l_,
        5389: i_,
        7579: d_,
        8915: u_,
        4: r_,
        5542: o_,
        9090: a_,
        5e3: s_,
        7779: __,
        9724: c_,
        8394: t_,
        2054: e_,
        5941: n_,
        5761: Zc,
        1223: Qc,
        8904: Jc,
        9563: Yc,
        3408: Xc,
        5075: Vc,
        1261: Hc,
        7376: Gc,
        70: Wc,
        5009: zc,
        4783: Uc,
        1121: Kc,
        7724: qc,
        6364: Bc,
        3103: Lc,
        6905: $c,
        9277: Dc,
        6983: Fc,
        2418: Ac,
        2134: Cc,
        9240: Oc,
        4273: Ic,
        725: Tc,
        4858: Mc,
        3278: Sc,
        9161: Rc,
        9893: wc,
        2249: Nc,
        6385: Ec,
        5553: vc,
        9468: Pc,
        3821: jc,
        4460: yc,
        4265: xc,
        8836: bc,
        9216: gc,
        8248: fc,
        4350: pc,
        8388: mc,
        2731: kc,
        1067: hc,
        1402: lc,
        1518: ic,
        3573: dc,
        1571: uc,
        4527: rc,
        282: oc,
        3972: ac,
        3160: sc,
        6618: _c,
        4180: cc,
        1331: tc,
        252: ec,
        6613: nc,
        5365: Zt,
        5060: Qt,
        2413: Jt,
        9334: Yt,
        219: Xt,
        8430: Vt,
        9004: Ht,
        8799: Gt,
        4833: Wt,
        5771: zt,
        4598: Ut,
        614: Kt,
        5401: qt,
        5448: Bt,
        4709: Lt,
        1349: $t,
        5758: Dt,
        5521: Ft,
        6575: At,
        8997: Ct,
        8186: Ot,
        1478: It,
        6299: Tt,
        2223: Mt,
        9104: St,
        4576: Rt,
        4505: wt,
        3916: Nt,
        6725: Et,
        627: vt,
        4360: Pt,
        8402: jt,
        6828: yt,
        2798: xt,
        7497: bt,
        3254: gt,
        225: ft,
        1646: pt,
        2990: mt,
        1875: kt,
        151: ht,
        9491: lt,
        4119: it,
        6612: dt,
        4497: ut,
        9458: rt,
        5929: ot,
        207: at,
        6450: st,
        758: _t,
        8556: ct,
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
        291: We,
        8433: ze,
        9154: Ue,
        253: Ke,
        8427: qe,
        1298: Be,
        4977: Le,
        2222: $e,
        712: De,
        7185: Fe,
        6482: Ae,
        2161: Ce,
        3196: Oe,
        1511: Ie,
        7700: Te,
        602: gn,
        9228: fn,
        8868: Me,
        935: pn,
        4510: Se,
        4793: Re,
        9145: we,
        575: Ne,
        3831: Ee,
        6977: ve,
        4114: Pe,
        9327: je,
        3065: ye,
        5737: xe,
        4990: be,
        5318: ge,
        407: fe,
        9212: pe,
        7309: me,
        3758: ke,
        8712: he,
        106: le,
        5942: ie,
        2714: de,
        4314: ue,
        3326: re,
        434: oe,
        1209: ae,
        9712: se,
        1082: _e,
        5579: ce,
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
    (u.webpackChunk_N_E = u.webpackChunk_N_E || []).push([
      [61],
      {
        7713: Gn,
        7130: Wn,
        3906: zn,
        2208: Un,
        9497: Kn,
        7538: qn,
        5069: Bn,
        5115: Ln,
        2459: $n,
        9805: Dn,
        7617: Fn,
        5424: An,
        5460: Cn,
        1644: On,
        696: In,
        5482: Tn,
        1368: Mn,
        164: Sn,
        8741: Rn,
        4085: wn,
        336: Nn,
        4672: En,
        4851: vn,
        2530: Pn,
        5530: jn,
        8034: yn,
        8700: xn,
        9316: bn,
      },
    ]),
    (u.webpackChunk_N_E = u.webpackChunk_N_E || []).push([
      [229],
      {
        2067: mn,
        6195: kn,
        9241: (x, f, t) => {
          'use strict';
          (t.r(f), t.d(f, { ComponentMod: () => a, default: () => P }));
          var e,
            r = {};
          (t.r(r),
            t.d(r, {
              AppRouter: () => s.WY,
              ClientPageRoot: () => s.b1,
              GlobalError: () => h.ZP,
              LayoutRouter: () => s.yO,
              NotFoundBoundary: () => s.O4,
              Postpone: () => s.hQ,
              RenderFromTemplateContext: () => s.b5,
              __next_app__: () => M,
              actionAsyncStorage: () => s.Wz,
              createDynamicallyTrackedSearchParams: () => s.rL,
              createUntrackedSearchParams: () => s.S5,
              decodeAction: () => s.Hs,
              decodeFormState: () => s.dH,
              decodeReply: () => s.kf,
              originalPathname: () => N,
              pages: () => S,
              patchFetch: () => s.XH,
              preconnect: () => s.$P,
              preloadFont: () => s.C5,
              preloadStyle: () => s.oH,
              renderToReadableStream: () => s.aW,
              requestAsyncStorage: () => s.Fg,
              routeModule: () => C,
              serverHooks: () => s.GP,
              staticGenerationAsyncStorage: () => s.AT,
              taintObjectReference: () => s.nr,
              tree: () => v,
            }),
            t(4833));
          var _ = t(9004),
            d = t(4783),
            m = t(252),
            l = t(3573),
            p = t(3196),
            b = t(2161),
            h = t(4977),
            s = t(6482);
          let v = [
              '',
              {
                children: [
                  '[lng]',
                  {
                    children: [
                      'product',
                      {
                        children: [
                          '[id]',
                          {
                            children: [
                              '__PAGE__',
                              {},
                              {
                                page: [
                                  () => Promise.resolve().then(t.bind(t, 6786)),
                                  '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/product/[id]/page.tsx',
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
            S = ['/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/product/[id]/page.tsx'],
            N = '/[lng]/product/[id]/page',
            M = { require: t, loadChunk: () => Promise.resolve() },
            C = new p.AppPageRouteModule({
              definition: {
                kind: b.x.APP_PAGE,
                page: '/[lng]/product/[id]/page',
                pathname: '/[lng]/product/[id]',
                bundlePath: '',
                filename: '',
                appPaths: [],
              },
              userland: { loaderTree: v },
            });
          var B = t(8388),
            q = t(4527),
            K = t(1518);
          let T = (y) => (y ? JSON.parse(y) : void 0),
            U = u.__BUILD_MANIFEST,
            z = T(u.__PRERENDER_MANIFEST),
            w = T(u.__REACT_LOADABLE_MANIFEST),
            A = (e = u.__RSC_MANIFEST) == null ? void 0 : e['/[lng]/product/[id]/page'],
            j = T(u.__RSC_SERVER_MANIFEST),
            c = T(u.__NEXT_FONT_MANIFEST),
            i = T(u.__INTERCEPTION_ROUTE_REWRITE_MANIFEST) ?? [];
          A &&
            j &&
            (0, q.Mo)({
              clientReferenceManifest: A,
              serverActionsManifest: j,
              serverModuleMap: (0, K.w)({
                serverActionsManifest: j,
                pageName: '/[lng]/product/[id]/page',
              }),
            });
          let o = (0, d.d)({
              pagesType: B.s.APP,
              dev: !1,
              page: '/[lng]/product/[id]/page',
              appMod: null,
              pageMod: r,
              errorMod: null,
              error500Mod: null,
              Document: null,
              buildManifest: U,
              prerenderManifest: z,
              renderToHTML: l.f,
              reactLoadableManifest: w,
              clientReferenceManifest: A,
              serverActionsManifest: j,
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
              nextFontManifest: c,
              incrementalCacheHandler: null,
              interceptionRouteRewrites: i,
            }),
            a = r;
          function P(y) {
            return (0, _.C)({ ...y, IncrementalCache: m.k, handler: o });
          }
        },
        1844: (x, f, t) => {
          (Promise.resolve().then(t.bind(t, 8140)), Promise.resolve().then(t.bind(t, 5069)));
        },
        8140: (x, f, t) => {
          'use strict';
          t.d(f, { ProductDetail: () => p });
          var e = t(3408),
            r = t(9712),
            _ = t(2516),
            d = t(3290),
            m = t(5424),
            l = t(8586);
          let p = ({ productId: b }) => {
            let h = (0, r.T_)('catalog.product'),
              { data: s, isLoading: v, isError: S } = (0, m.iB)(b, { query: { enabled: !!b } });
            return v
              ? (0, e.jsxs)('div', {
                  className: 'p-6',
                  children: [
                    (0, e.jsx)(_.m, {
                      title: h('overview'),
                      breadcrumbs: [{ label: h('overview') }],
                    }),
                    (0, e.jsx)('p', {
                      className: 'text-muted-foreground mt-6 text-sm',
                      children: 'Loading...',
                    }),
                  ],
                })
              : S || !s
                ? (0, e.jsxs)('div', {
                    className: 'p-6',
                    children: [
                      (0, e.jsx)(_.m, {
                        title: h('overview'),
                        breadcrumbs: [{ label: h('overview') }],
                      }),
                      (0, e.jsx)('p', {
                        className: 'mt-6 text-sm text-danger',
                        children: 'Product not found.',
                      }),
                    ],
                  })
                : (0, e.jsxs)('div', {
                    className: 'space-y-6 p-6',
                    children: [
                      (0, e.jsx)(_.m, {
                        title: s?.name ?? h('overview'),
                        breadcrumbs: [
                          { label: h('overview'), href: '/catalog' },
                          { label: s?.name ?? h('overview') },
                        ],
                      }),
                      (0, e.jsxs)('div', {
                        className: 'grid gap-6 lg:grid-cols-[2fr,1fr]',
                        children: [
                          (0, e.jsxs)(d.Card, {
                            className: 'border-border/70',
                            children: [
                              (0, e.jsx)(d.Ol, {
                                children: (0, e.jsx)(d.ll, { children: h('overview') }),
                              }),
                              (0, e.jsxs)(d.CardContent, {
                                className:
                                  'text-muted-foreground space-y-4 text-sm leading-relaxed',
                                children: [
                                  (0, e.jsx)('p', {
                                    children: s?.description ?? 'No description provided.',
                                  }),
                                  (0, e.jsxs)('div', {
                                    className: 'grid gap-3 md:grid-cols-2',
                                    children: [
                                      (0, e.jsxs)('div', {
                                        children: [
                                          (0, e.jsx)('span', {
                                            className:
                                              'text-muted-foreground/80 block text-xs uppercase tracking-wide',
                                            children: h('leadTime'),
                                          }),
                                          (0, e.jsxs)('span', {
                                            className: 'text-sm text-foreground',
                                            children: [s?.leadTimeDays ?? '-', ' days'],
                                          }),
                                        ],
                                      }),
                                      (0, e.jsxs)('div', {
                                        children: [
                                          (0, e.jsx)('span', {
                                            className:
                                              'text-muted-foreground/80 block text-xs uppercase tracking-wide',
                                            children: h('minimumOrder'),
                                          }),
                                          (0, e.jsx)('span', {
                                            className: 'text-sm text-foreground',
                                            children: s?.minimumOrderQuantity ?? '-',
                                          }),
                                        ],
                                      }),
                                      (0, e.jsxs)('div', {
                                        children: [
                                          (0, e.jsx)('span', {
                                            className:
                                              'text-muted-foreground/80 block text-xs uppercase tracking-wide',
                                            children: 'Price',
                                          }),
                                          (0, e.jsx)('span', {
                                            className: 'text-sm text-foreground',
                                            children:
                                              s?.referencePrice != null
                                                ? (0, l.xG)(s.referencePrice, s.currency ?? 'USD')
                                                : '-',
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, e.jsxs)(d.Card, {
                            className: 'border-border/70',
                            children: [
                              (0, e.jsx)(d.Ol, {
                                children: (0, e.jsx)(d.ll, { children: h('attributes') }),
                              }),
                              (0, e.jsx)(d.CardContent, {
                                className: 'text-muted-foreground space-y-3 text-sm',
                                children: s?.attributes
                                  ? Object.entries(s.attributes).map(([N, M]) =>
                                      (0, e.jsxs)(
                                        'div',
                                        {
                                          className:
                                            'border-border/60 flex items-center justify-between rounded-md border px-3 py-2',
                                          children: [
                                            (0, e.jsx)('span', {
                                              className:
                                                'text-muted-foreground/80 text-xs uppercase tracking-wide',
                                              children: N,
                                            }),
                                            (0, e.jsx)('span', {
                                              className: 'text-sm text-foreground',
                                              children: String(M),
                                            }),
                                          ],
                                        },
                                        N,
                                      ),
                                    )
                                  : (0, e.jsx)('p', { children: 'No attributes provided.' }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  });
          };
        },
        2516: hn,
        3290: dn,
        8586: rn,
        6786: (x, f, t) => {
          'use strict';
          (t.r(f), t.d(f, { default: () => h }));
          var e = t(9154),
            r = t(336),
            _ = t(253),
            d = t(1298);
          let m = (0, d.D)(
              String.raw`/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/product/[id]/product-detail.tsx`,
            ),
            { __esModule: l, $$typeof: p } = m;
          m.default;
          let b = (0, d.D)(
            String.raw`/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/product/[id]/product-detail.tsx#ProductDetail`,
          );
          function h({ params: { id: s } }) {
            return (0, e.jsx)(r.V, {
              children: (0, e.jsx)(_.Suspense, {
                fallback: (0, e.jsx)('div', { className: 'p-6', children: 'Loading product...' }),
                children: (0, e.jsx)(b, { productId: s }),
              }),
            });
          }
        },
      },
      (x) => {
        var f = (e) => x((x.s = e));
        x.O(0, [365, 61], () => f(9241));
        var t = x.O();
        (k._ENTRIES = typeof k._ENTRIES > 'u' ? {} : k._ENTRIES)[
          'middleware_app/[lng]/product/[id]/page'
        ] = t;
      },
    ]),
    function () {
      let x = { exports: {}, loaded: !1 };
      return (
        (function (t, e) {
          var r = Object.create,
            _ = Object.defineProperty,
            d = Object.getOwnPropertyDescriptor,
            m = Object.getOwnPropertyNames,
            l = Object.getPrototypeOf,
            p = Object.prototype.hasOwnProperty,
            b = (c) => _(c, '__esModule', { value: !0 }),
            h = (c, i) => {
              b(c);
              for (var o in i) _(c, o, { get: i[o], enumerable: !0 });
            },
            s = (c, i, o) => {
              if ((i && typeof i == 'object') || typeof i == 'function')
                for (let a of m(i))
                  !p.call(c, a) &&
                    a !== 'default' &&
                    _(c, a, { get: () => i[a], enumerable: !(o = d(i, a)) || o.enumerable });
              return c;
            },
            v = (c) =>
              s(
                b(
                  _(
                    c != null ? r(l(c)) : {},
                    'default',
                    c && c.__esModule && 'default' in c
                      ? { get: () => c.default, enumerable: !0 }
                      : { value: c, enumerable: !0 },
                  ),
                ),
                c,
              );
          h(e, { default: () => z });
          var S = v((X(), nn(D))),
            N = '@next/request-context',
            M = Symbol.for(N),
            C = Symbol.for('internal.storage');
          function B() {
            let c = k;
            if (!c[M]) {
              let i = new S.AsyncLocalStorage(),
                o = { get: () => i.getStore(), [C]: i };
              c[M] = o;
            }
            return c[M];
          }
          var q = B();
          function K(c, i) {
            return q[C].run(c, i);
          }
          function T(c) {
            let i = {};
            return (
              c &&
                c.forEach((o, a) => {
                  ((i[a] = o), a.toLowerCase() === 'set-cookie' && (i[a] = U(o)));
                }),
              i
            );
          }
          function U(c) {
            let i = [],
              o = 0,
              a,
              P,
              y,
              I,
              O;
            function E() {
              for (; o < c.length && /\s/.test(c.charAt(o)); ) o += 1;
              return o < c.length;
            }
            function R() {
              return ((P = c.charAt(o)), P !== '=' && P !== ';' && P !== ',');
            }
            for (; o < c.length; ) {
              for (a = o, O = !1; E(); )
                if (((P = c.charAt(o)), P === ',')) {
                  for (y = o, o += 1, E(), I = o; o < c.length && R(); ) o += 1;
                  o < c.length && c.charAt(o) === '='
                    ? ((O = !0), (o = I), i.push(c.substring(a, y)), (a = o))
                    : (o = y + 1);
                } else o += 1;
              (!O || o >= c.length) && i.push(c.substring(a, c.length));
            }
            return i;
          }
          function z(c) {
            let i = c.staticRoutes.map((a) => ({ regexp: new RegExp(a.namedRegex), page: a.page })),
              o =
                c.dynamicRoutes?.map((a) => ({ regexp: new RegExp(a.namedRegex), page: a.page })) ||
                [];
            return async function (a, P) {
              let y = new URL(a.url).pathname,
                I = {};
              if (
                (c.nextConfig?.basePath &&
                  y.startsWith(c.nextConfig.basePath) &&
                  (y = y.replace(c.nextConfig.basePath, '') || '/'),
                c.nextConfig?.i18n)
              )
                for (let E of c.nextConfig.i18n.locales) {
                  let R = new RegExp(`^/${E}($|/)`, 'i');
                  if (y.match(R)) {
                    y = y.replace(R, '/') || '/';
                    break;
                  }
                }
              for (let E of i)
                if (E.regexp.exec(y)) {
                  I.name = E.page;
                  break;
                }
              if (!I.name) {
                let E = A(y);
                for (let R of o || []) {
                  if (E && !A(R.page)) continue;
                  let H = R.regexp.exec(y);
                  if (H) {
                    I = { name: R.page, params: H.groups };
                    break;
                  }
                }
              }
              let O = await K({ waitUntil: P.waitUntil }, () =>
                k._ENTRIES[`middleware_${c.name}`].default.call(
                  {},
                  {
                    request: {
                      url: a.url,
                      method: a.method,
                      headers: T(a.headers),
                      ip: w(a.headers, j.Ip),
                      geo: {
                        city: w(a.headers, j.City, !0),
                        country: w(a.headers, j.Country, !0),
                        latitude: w(a.headers, j.Latitude),
                        longitude: w(a.headers, j.Longitude),
                        region: w(a.headers, j.Region, !0),
                      },
                      nextConfig: c.nextConfig,
                      page: I,
                      body: a.body,
                    },
                  },
                ),
              );
              return (O.waitUntil && P.waitUntil(O.waitUntil), O.response);
            };
          }
          function w(c, i, o = !1) {
            let a = c.get(i) || void 0;
            return o && a ? decodeURIComponent(a) : a;
          }
          function A(c) {
            return c === '/api' || c.startsWith('/api/');
          }
          var j;
          (function (c) {
            ((c.City = 'x-vercel-ip-city'),
              (c.Country = 'x-vercel-ip-country'),
              (c.Ip = 'x-real-ip'),
              (c.Latitude = 'x-vercel-ip-latitude'),
              (c.Longitude = 'x-vercel-ip-longitude'),
              (c.Region = 'x-vercel-ip-country-region'));
          })(j || (j = {}));
        })(x, x.exports),
        x.exports
      );
    }
      .call({})
      .default({
        name: 'app/[lng]/product/[id]/page',
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
  ))(g, g, g);
export { w_ as default };
