var Z = Object.defineProperty;
var ne = Object.getOwnPropertyDescriptor;
var te = Object.getOwnPropertyNames;
var ce = Object.prototype.hasOwnProperty;
var _e = (o, p) => () => (o && (p = o((o = 0))), p);
var Q = (o, p, L, x) => {
    if ((p && typeof p == 'object') || typeof p == 'function')
      for (let g of te(p))
        !ce.call(o, g) &&
          g !== L &&
          Z(o, g, { get: () => p[g], enumerable: !(x = ne(p, g)) || x.enumerable });
    return o;
  },
  Y = (o, p, L) => (Q(o, p, 'default'), L && Q(L, p, 'default'));
var se = (o) => Q(Z({}, '__esModule', { value: !0 }), o);
var W = {};
import * as M_ from 'async_hooks';
var J = _e(() => {
  Y(W, M_);
});
import { __getNamedExports as ae } from '../../../../__next-on-pages-dist__/webpack/8780.js';
import { __getNamedExports as oe } from '../../../../__next-on-pages-dist__/webpack/e2daa575c5ad679c94cfb939c9e42019.js';
import { __getNamedExports as re } from '../../../../__next-on-pages-dist__/webpack/1746.js';
import { __getNamedExports as ue } from '../../../../__next-on-pages-dist__/webpack/3290.js';
import { __getNamedExports as ie } from '../../../../__next-on-pages-dist__/webpack/2516.js';
import { __getNamedExports as le } from '../../../../__next-on-pages-dist__/webpack/7e5b5057542a677d168ef2f7e421c64a.js';
import { __getNamedExports as de } from '../../../../__next-on-pages-dist__/webpack/feaf1bd85f055963b24458fea3223a55.js';
import { __getNamedExports as he } from '../../../../__next-on-pages-dist__/manifest/8979b518535174c7eb8d77a6d5a08905.js';
var k = globalThis.__nextOnPagesRoutesIsolation.getProxyFor('/[lng]/rfq/new'),
  ke = ae(k, k, k),
  me = ke.__chunk_8780,
  G = oe(k, k, k),
  pe = G.__chunk_4475,
  fe = G.__chunk_5274,
  ge = G.__chunk_4537,
  be = G.__chunk_3535,
  xe = G.__chunk_1566,
  ye = re(k, k, k),
  je = ye.__chunk_1746,
  Pe = ue(k, k, k),
  Ee = Pe.__chunk_3290,
  ve = ie(k, k, k),
  we = ve.__chunk_2516,
  H = le(k, k, k),
  Ne = H.__chunk_6195,
  Se = H.__chunk_2067,
  Re = H.__chunk_935,
  Ie = H.__chunk_9228,
  Ce = H.__chunk_602,
  e = de(k, k, k),
  qe = e.__chunk_9316,
  Ae = e.__chunk_8700,
  Me = e.__chunk_8034,
  Te = e.__chunk_5530,
  Oe = e.__chunk_2530,
  Fe = e.__chunk_4851,
  $e = e.__chunk_4672,
  De = e.__chunk_336,
  Le = e.__chunk_4085,
  Be = e.__chunk_8741,
  Ke = e.__chunk_164,
  Ue = e.__chunk_1368,
  ze = e.__chunk_5482,
  We = e.__chunk_696,
  Ge = e.__chunk_1644,
  He = e.__chunk_5460,
  Ve = e.__chunk_5424,
  Xe = e.__chunk_7617,
  Qe = e.__chunk_9805,
  Ye = e.__chunk_2459,
  Ze = e.__chunk_5115,
  Je = e.__chunk_5069,
  en = e.__chunk_7538,
  nn = e.__chunk_9497,
  tn = e.__chunk_2208,
  cn = e.__chunk_3906,
  _n = e.__chunk_7130,
  sn = e.__chunk_7713,
  an = e.__chunk_5765,
  on = e.__chunk_9182,
  rn = e.__chunk_1661,
  un = e.__chunk_7042,
  ln = e.__chunk_5588,
  dn = e.__chunk_7850,
  hn = e.__chunk_4961,
  kn = e.__chunk_3435,
  mn = e.__chunk_4508,
  pn = e.__chunk_8981,
  fn = e.__chunk_5579,
  gn = e.__chunk_1082,
  bn = e.__chunk_9712,
  xn = e.__chunk_1209,
  yn = e.__chunk_434,
  jn = e.__chunk_3326,
  Pn = e.__chunk_4314,
  En = e.__chunk_2714,
  vn = e.__chunk_5942,
  wn = e.__chunk_106,
  Nn = e.__chunk_8712,
  Sn = e.__chunk_3758,
  Rn = e.__chunk_7309,
  In = e.__chunk_9212,
  Cn = e.__chunk_407,
  qn = e.__chunk_5318,
  An = e.__chunk_4990,
  Mn = e.__chunk_5737,
  Tn = e.__chunk_3065,
  On = e.__chunk_9327,
  Fn = e.__chunk_4114,
  $n = e.__chunk_6977,
  Dn = e.__chunk_3831,
  Ln = e.__chunk_575,
  Bn = e.__chunk_9145,
  Kn = e.__chunk_4793,
  Un = e.__chunk_4510,
  zn = e.__chunk_8868,
  Wn = e.__chunk_7700,
  Gn = e.__chunk_1511,
  Hn = e.__chunk_3196,
  Vn = e.__chunk_2161,
  Xn = e.__chunk_6482,
  Qn = e.__chunk_7185,
  Yn = e.__chunk_712,
  Zn = e.__chunk_2222,
  Jn = e.__chunk_4977,
  et = e.__chunk_1298,
  nt = e.__chunk_8427,
  tt = e.__chunk_253,
  ct = e.__chunk_9154,
  _t = e.__chunk_8433,
  st = e.__chunk_291,
  at = e.__chunk_4703,
  ot = e.__chunk_1502,
  rt = e.__chunk_4634,
  ut = e.__chunk_4627,
  it = e.__chunk_2940,
  lt = e.__chunk_2041,
  dt = e.__chunk_5991,
  ht = e.__chunk_5159,
  kt = e.__chunk_5143,
  mt = e.__chunk_7329,
  pt = e.__chunk_3746,
  ft = e.__chunk_8556,
  gt = e.__chunk_758,
  bt = e.__chunk_6450,
  xt = e.__chunk_207,
  yt = e.__chunk_5929,
  jt = e.__chunk_9458,
  Pt = e.__chunk_4497,
  Et = e.__chunk_6612,
  vt = e.__chunk_4119,
  wt = e.__chunk_9491,
  Nt = e.__chunk_151,
  St = e.__chunk_1875,
  Rt = e.__chunk_2990,
  It = e.__chunk_1646,
  Ct = e.__chunk_225,
  qt = e.__chunk_3254,
  At = e.__chunk_7497,
  Mt = e.__chunk_2798,
  Tt = e.__chunk_6828,
  Ot = e.__chunk_8402,
  Ft = e.__chunk_4360,
  $t = e.__chunk_627,
  Dt = e.__chunk_6725,
  Lt = e.__chunk_3916,
  Bt = e.__chunk_4505,
  Kt = e.__chunk_4576,
  Ut = e.__chunk_9104,
  zt = e.__chunk_2223,
  Wt = e.__chunk_6299,
  Gt = e.__chunk_1478,
  Ht = e.__chunk_8186,
  Vt = e.__chunk_8997,
  Xt = e.__chunk_6575,
  Qt = e.__chunk_5521,
  Yt = e.__chunk_5758,
  Zt = e.__chunk_1349,
  Jt = e.__chunk_4709,
  ec = e.__chunk_5448,
  nc = e.__chunk_5401,
  tc = e.__chunk_614,
  cc = e.__chunk_4598,
  _c = e.__chunk_5771,
  sc = e.__chunk_4833,
  ac = e.__chunk_8799,
  oc = e.__chunk_9004,
  rc = e.__chunk_8430,
  uc = e.__chunk_219,
  ic = e.__chunk_9334,
  lc = e.__chunk_2413,
  dc = e.__chunk_5060,
  hc = e.__chunk_5365,
  kc = e.__chunk_6613,
  mc = e.__chunk_252,
  pc = e.__chunk_1331,
  fc = e.__chunk_4180,
  gc = e.__chunk_6618,
  bc = e.__chunk_3160,
  xc = e.__chunk_3972,
  yc = e.__chunk_282,
  jc = e.__chunk_4527,
  Pc = e.__chunk_1571,
  Ec = e.__chunk_3573,
  vc = e.__chunk_1518,
  wc = e.__chunk_1402,
  Nc = e.__chunk_1067,
  Sc = e.__chunk_2731,
  Rc = e.__chunk_8388,
  Ic = e.__chunk_4350,
  Cc = e.__chunk_8248,
  qc = e.__chunk_9216,
  Ac = e.__chunk_8836,
  Mc = e.__chunk_4265,
  Tc = e.__chunk_4460,
  Oc = e.__chunk_3821,
  Fc = e.__chunk_9468,
  $c = e.__chunk_5553,
  Dc = e.__chunk_6385,
  Lc = e.__chunk_2249,
  Bc = e.__chunk_9893,
  Kc = e.__chunk_9161,
  Uc = e.__chunk_3278,
  zc = e.__chunk_4858,
  Wc = e.__chunk_725,
  Gc = e.__chunk_4273,
  Hc = e.__chunk_9240,
  Vc = e.__chunk_2134,
  Xc = e.__chunk_2418,
  Qc = e.__chunk_6983,
  Yc = e.__chunk_9277,
  Zc = e.__chunk_6905,
  Jc = e.__chunk_3103,
  e_ = e.__chunk_6364,
  n_ = e.__chunk_7724,
  t_ = e.__chunk_1121,
  c_ = e.__chunk_4783,
  __ = e.__chunk_5009,
  s_ = e.__chunk_70,
  a_ = e.__chunk_7376,
  o_ = e.__chunk_1261,
  r_ = e.__chunk_5075,
  u_ = e.__chunk_3408,
  i_ = e.__chunk_9563,
  l_ = e.__chunk_8904,
  d_ = e.__chunk_1223,
  h_ = e.__chunk_5761,
  k_ = e.__chunk_5941,
  m_ = e.__chunk_2054,
  p_ = e.__chunk_8394,
  f_ = e.__chunk_9724,
  g_ = e.__chunk_7779,
  b_ = e.__chunk_5000,
  x_ = e.__chunk_9090,
  y_ = e.__chunk_5542,
  j_ = e.__chunk_4,
  P_ = e.__chunk_8915,
  E_ = e.__chunk_7579,
  v_ = e.__chunk_5389,
  w_ = e.__chunk_5336,
  N_ = e.__chunk_6788,
  S_ = e.__chunk_2181,
  V = he(k, k, k),
  R_ = V.__NEXT_FONT_MANIFEST,
  I_ = V.__REACT_LOADABLE_MANIFEST,
  C_ = V.__BUILD_MANIFEST,
  q_ = V.__RSC_SERVER_MANIFEST,
  U_ = ((o, p, L) => (
    (p._ENTRIES = {}),
    (o.__RSC_SERVER_MANIFEST = q_),
    (p.__RSC_MANIFEST = p.__RSC_MANIFEST || {}),
    (p.__RSC_MANIFEST['/[lng]/rfq/new/page'] = {
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
            '924',
            'static/chunks/app/%5Blng%5D/rfq/new/page-a3362226ba502a1f.js',
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
          chunks: [
            '655',
            'static/chunks/655-56915f9d114b7f4e.js',
            '43',
            'static/chunks/43-fa995ca364ebf5a6.js',
            '855',
            'static/chunks/855-fae9702efe576cfb.js',
            '18',
            'static/chunks/18-e5f986608a4694e8.js',
            '658',
            'static/chunks/app/%5Blng%5D/rfq/page-971285276cc96527.js',
          ],
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
            '924',
            'static/chunks/app/%5Blng%5D/rfq/new/page-a3362226ba502a1f.js',
          ],
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
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/rfq/page': [],
        '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/rfq/new/page': [],
      },
    }),
    (o.__BUILD_MANIFEST = C_),
    (o.__REACT_LOADABLE_MANIFEST = I_),
    (o.__NEXT_FONT_MANIFEST = R_),
    (o.__INTERCEPTION_ROUTE_REWRITE_MANIFEST = '[]'),
    (o.__PRERENDER_MANIFEST =
      '{"version":4,"routes":{},"dynamicRoutes":{},"notFoundRoutes":[],"preview":{"previewModeId":"process.env.__NEXT_PREVIEW_MODE_ID","previewModeSigningKey":"process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY","previewModeEncryptionKey":"process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY"}}'),
    (() => {
      'use strict';
      var x = {},
        g = {};
      function t(n) {
        var r = g[n];
        if (r !== void 0) return r.exports;
        var s = (g[n] = { exports: {} }),
          h = !0;
        try {
          (x[n](s, s.exports, t), (h = !1));
        } finally {
          h && delete g[n];
        }
        return s.exports;
      }
      ((t.m = x),
        (t.amdO = {}),
        (() => {
          var n = [];
          t.O = (r, s, h, f) => {
            if (s) {
              f = f || 0;
              for (var d = n.length; d > 0 && n[d - 1][2] > f; d--) n[d] = n[d - 1];
              n[d] = [s, h, f];
              return;
            }
            for (var u = 1 / 0, d = 0; d < n.length; d++) {
              for (var [s, h, f] = n[d], y = !0, E = 0; E < s.length; E++)
                u >= f && Object.keys(t.O).every((F) => t.O[F](s[E]))
                  ? s.splice(E--, 1)
                  : ((y = !1), f < u && (u = f));
              if (y) {
                n.splice(d--, 1);
                var i = h();
                i !== void 0 && (r = i);
              }
            }
            return r;
          };
        })(),
        (t.n = (n) => {
          var r = n && n.__esModule ? () => n.default : () => n;
          return (t.d(r, { a: r }), r);
        }),
        (() => {
          var n,
            r = Object.getPrototypeOf ? (s) => Object.getPrototypeOf(s) : (s) => s.__proto__;
          t.t = function (s, h) {
            if (
              (1 & h && (s = this(s)),
              8 & h ||
                (typeof s == 'object' &&
                  s &&
                  ((4 & h && s.__esModule) || (16 & h && typeof s.then == 'function'))))
            )
              return s;
            var f = Object.create(null);
            t.r(f);
            var d = {};
            n = n || [null, r({}), r([]), r(r)];
            for (var u = 2 & h && s; typeof u == 'object' && !~n.indexOf(u); u = r(u))
              Object.getOwnPropertyNames(u).forEach((y) => (d[y] = () => s[y]));
            return ((d.default = () => s), t.d(f, d), f);
          };
        })(),
        (t.d = (n, r) => {
          for (var s in r)
            t.o(r, s) && !t.o(n, s) && Object.defineProperty(n, s, { enumerable: !0, get: r[s] });
        }),
        (t.e = () => Promise.resolve()),
        (t.g = (function () {
          if (typeof p == 'object') return p;
          try {
            return this || Function('return this')();
          } catch {
            if (typeof window == 'object') return window;
          }
        })()),
        (t.o = (n, r) => Object.prototype.hasOwnProperty.call(n, r)),
        (t.r = (n) => {
          (typeof Symbol < 'u' &&
            Symbol.toStringTag &&
            Object.defineProperty(n, Symbol.toStringTag, { value: 'Module' }),
            Object.defineProperty(n, '__esModule', { value: !0 }));
        }),
        (() => {
          var n = { 993: 0 };
          t.O.j = (h) => n[h] === 0;
          var r = (h, f) => {
              var d,
                u,
                [y, E, i] = f,
                N = 0;
              if (y.some((R) => n[R] !== 0)) {
                for (d in E) t.o(E, d) && (t.m[d] = E[d]);
                if (i) var v = i(t);
              }
              for (h && h(f); N < y.length; N++)
                ((u = y[N]), t.o(n, u) && n[u] && n[u][0](), (n[u] = 0));
              return t.O(v);
            },
            s = (o.webpackChunk_N_E = o.webpackChunk_N_E || []);
          (s.forEach(r.bind(null, 0)), (s.push = r.bind(null, s.push.bind(s))));
        })());
    })(),
    (o.webpackChunk_N_E = o.webpackChunk_N_E || []).push([
      [365],
      {
        2181: S_,
        6788: N_,
        5336: w_,
        5389: v_,
        7579: E_,
        8915: P_,
        4: j_,
        5542: y_,
        9090: x_,
        5e3: b_,
        7779: g_,
        9724: f_,
        8394: p_,
        2054: m_,
        5941: k_,
        5761: h_,
        1223: d_,
        8904: l_,
        9563: i_,
        3408: u_,
        5075: r_,
        1261: o_,
        7376: a_,
        70: s_,
        5009: __,
        4783: c_,
        1121: t_,
        7724: n_,
        6364: e_,
        3103: Jc,
        6905: Zc,
        9277: Yc,
        6983: Qc,
        2418: Xc,
        2134: Vc,
        9240: Hc,
        4273: Gc,
        725: Wc,
        4858: zc,
        3278: Uc,
        9161: Kc,
        9893: Bc,
        2249: Lc,
        6385: Dc,
        5553: $c,
        9468: Fc,
        3821: Oc,
        4460: Tc,
        4265: Mc,
        8836: Ac,
        9216: qc,
        8248: Cc,
        4350: Ic,
        8388: Rc,
        2731: Sc,
        1067: Nc,
        1402: wc,
        1518: vc,
        3573: Ec,
        1571: Pc,
        4527: jc,
        282: yc,
        3972: xc,
        3160: bc,
        6618: gc,
        4180: fc,
        1331: pc,
        252: mc,
        6613: kc,
        5365: hc,
        5060: dc,
        2413: lc,
        9334: ic,
        219: uc,
        8430: rc,
        9004: oc,
        8799: ac,
        4833: sc,
        5771: _c,
        4598: cc,
        614: tc,
        5401: nc,
        5448: ec,
        4709: Jt,
        1349: Zt,
        5758: Yt,
        5521: Qt,
        6575: Xt,
        8997: Vt,
        8186: Ht,
        1478: Gt,
        6299: Wt,
        2223: zt,
        9104: Ut,
        4576: Kt,
        4505: Bt,
        3916: Lt,
        6725: Dt,
        627: $t,
        4360: Ft,
        8402: Ot,
        6828: Tt,
        2798: Mt,
        7497: At,
        3254: qt,
        225: Ct,
        1646: It,
        2990: Rt,
        1875: St,
        151: Nt,
        9491: wt,
        4119: vt,
        6612: Et,
        4497: Pt,
        9458: jt,
        5929: yt,
        207: xt,
        6450: bt,
        758: gt,
        8556: ft,
        3746: pt,
        7329: mt,
        5143: kt,
        5159: ht,
        5991: dt,
        2041: lt,
        2940: it,
        4627: ut,
        4634: rt,
        1502: ot,
        4703: at,
        291: st,
        8433: _t,
        9154: ct,
        253: tt,
        8427: nt,
        1298: et,
        4977: Jn,
        2222: Zn,
        712: Yn,
        7185: Qn,
        6482: Xn,
        2161: Vn,
        3196: Hn,
        1511: Gn,
        7700: Wn,
        602: Ce,
        9228: Ie,
        8868: zn,
        935: Re,
        4510: Un,
        4793: Kn,
        9145: Bn,
        575: Ln,
        3831: Dn,
        6977: $n,
        4114: Fn,
        9327: On,
        3065: Tn,
        5737: Mn,
        4990: An,
        5318: qn,
        407: Cn,
        9212: In,
        7309: Rn,
        3758: Sn,
        8712: Nn,
        106: wn,
        5942: vn,
        2714: En,
        4314: Pn,
        3326: jn,
        434: yn,
        1209: xn,
        9712: bn,
        1082: gn,
        5579: fn,
        8981: pn,
        4508: mn,
        3435: kn,
        4961: hn,
        7850: dn,
        5588: ln,
        7042: un,
        1661: rn,
        9182: on,
        5765: an,
      },
    ]),
    (o.webpackChunk_N_E = o.webpackChunk_N_E || []).push([
      [727],
      { 1566: xe, 3535: be, 4537: ge, 5274: fe },
    ]),
    (o.webpackChunk_N_E = o.webpackChunk_N_E || []).push([
      [61],
      {
        7713: sn,
        7130: _n,
        3906: cn,
        2208: tn,
        9497: nn,
        7538: en,
        5069: Je,
        5115: Ze,
        2459: Ye,
        9805: Qe,
        7617: Xe,
        5424: Ve,
        5460: He,
        1644: Ge,
        696: We,
        5482: ze,
        1368: Ue,
        164: Ke,
        8741: Be,
        4085: Le,
        336: De,
        4672: $e,
        4851: Fe,
        2530: Oe,
        5530: Te,
        8034: Me,
        8700: Ae,
        9316: qe,
      },
    ]),
    (o.webpackChunk_N_E = o.webpackChunk_N_E || []).push([
      [924],
      {
        2067: Se,
        6195: Ne,
        1045: (x, g, t) => {
          'use strict';
          (t.r(g), t.d(g, { ComponentMod: () => a, default: () => w }));
          var n,
            r = {};
          (t.r(r),
            t.d(r, {
              AppRouter: () => i.WY,
              ClientPageRoot: () => i.b1,
              GlobalError: () => E.ZP,
              LayoutRouter: () => i.yO,
              NotFoundBoundary: () => i.O4,
              Postpone: () => i.hQ,
              RenderFromTemplateContext: () => i.b5,
              __next_app__: () => S,
              actionAsyncStorage: () => i.Wz,
              createDynamicallyTrackedSearchParams: () => i.rL,
              createUntrackedSearchParams: () => i.S5,
              decodeAction: () => i.Hs,
              decodeFormState: () => i.dH,
              decodeReply: () => i.kf,
              originalPathname: () => R,
              pages: () => v,
              patchFetch: () => i.XH,
              preconnect: () => i.$P,
              preloadFont: () => i.C5,
              preloadStyle: () => i.oH,
              renderToReadableStream: () => i.aW,
              requestAsyncStorage: () => i.Fg,
              routeModule: () => F,
              serverHooks: () => i.GP,
              staticGenerationAsyncStorage: () => i.AT,
              taintObjectReference: () => i.nr,
              tree: () => N,
            }),
            t(4833));
          var s = t(9004),
            h = t(4783),
            f = t(252),
            d = t(3573),
            u = t(3196),
            y = t(2161),
            E = t(4977),
            i = t(6482);
          let N = [
              '',
              {
                children: [
                  '[lng]',
                  {
                    children: [
                      'rfq',
                      {
                        children: [
                          'new',
                          {
                            children: [
                              '__PAGE__',
                              {},
                              {
                                page: [
                                  () => Promise.resolve().then(t.bind(t, 4926)),
                                  '/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/rfq/new/page.tsx',
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
            v = ['/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/rfq/new/page.tsx'],
            R = '/[lng]/rfq/new/page',
            S = { require: t, loadChunk: () => Promise.resolve() },
            F = new u.AppPageRouteModule({
              definition: {
                kind: y.x.APP_PAGE,
                page: '/[lng]/rfq/new/page',
                pathname: '/[lng]/rfq/new',
                bundlePath: '',
                filename: '',
                appPaths: [],
              },
              userland: { loaderTree: N },
            });
          var D = t(8388),
            B = t(4527),
            K = t(1518);
          let M = (b) => (b ? JSON.parse(b) : void 0),
            U = o.__BUILD_MANIFEST,
            j = M(o.__PRERENDER_MANIFEST),
            I = M(o.__REACT_LOADABLE_MANIFEST),
            $ = (n = o.__RSC_MANIFEST) == null ? void 0 : n['/[lng]/rfq/new/page'],
            P = M(o.__RSC_SERVER_MANIFEST),
            c = M(o.__NEXT_FONT_MANIFEST),
            l = M(o.__INTERCEPTION_ROUTE_REWRITE_MANIFEST) ?? [];
          $ &&
            P &&
            (0, B.Mo)({
              clientReferenceManifest: $,
              serverActionsManifest: P,
              serverModuleMap: (0, K.w)({
                serverActionsManifest: P,
                pageName: '/[lng]/rfq/new/page',
              }),
            });
          let _ = (0, h.d)({
              pagesType: D.s.APP,
              dev: !1,
              page: '/[lng]/rfq/new/page',
              appMod: null,
              pageMod: r,
              errorMod: null,
              error500Mod: null,
              Document: null,
              buildManifest: U,
              prerenderManifest: j,
              renderToHTML: d.f,
              reactLoadableManifest: I,
              clientReferenceManifest: $,
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
              nextFontManifest: c,
              incrementalCacheHandler: null,
              interceptionRouteRewrites: l,
            }),
            a = r;
          function w(b) {
            return (0, s.C)({ ...b, IncrementalCache: f.k, handler: _ });
          }
        },
        5104: (x, g, t) => {
          (Promise.resolve().then(t.bind(t, 585)), Promise.resolve().then(t.bind(t, 5069)));
        },
        585: (x, g, t) => {
          'use strict';
          t.d(g, { RfqCreateForm: () => U });
          var n = t(3408),
            r = t(9563),
            s = t(7376),
            h = t(9712),
            f = t(3435),
            d = t(4537),
            u = t(5274),
            y = t(1566),
            E = t(8981),
            i = t(2516),
            N = t(9805),
            v = t(3290),
            R = t(1746),
            S = t(4475),
            F = t(8780),
            D = t(5424),
            B = t(7617);
          let K = u.Ry({
              description: u.Z_().min(1, 'Description is required'),
              quantity: u.oQ.number().positive('Quantity must be positive'),
              uom: u.Z_().min(1, 'Unit of measure is required'),
              targetPrice: u.oQ
                .number()
                .positive()
                .optional()
                .or(u.i0('').transform(() => {})),
            }),
            M = u.Ry({
              title: u.Z_().min(3, 'Title must be at least 3 characters'),
              notes: u.Z_().optional(),
              autoIssue: u.O7().optional(),
              lines: u.IX(K).min(1, 'Add at least one line item'),
            }),
            U = () => {
              let j = (0, h.T_)('rfq'),
                I = (0, h.T_)('common.actions'),
                $ = (0, s.tv)(),
                P = (0, f.bU)(),
                [c, l] = (0, r.useState)(!1),
                _ = (0, d.cI)({
                  resolver: (0, y.F)(M),
                  defaultValues: {
                    title: '',
                    notes: '',
                    autoIssue: !0,
                    lines: [{ description: '', quantity: 1, uom: 'EA', targetPrice: void 0 }],
                  },
                }),
                {
                  fields: a,
                  append: w,
                  remove: b,
                } = (0, d.Dq)({ control: _.control, name: 'lines' }),
                T = (0, D.dG)(),
                O = (0, D.pk)(),
                C = (0, D.YC)(),
                q = _.handleSubmit(async (A) => {
                  l(!0);
                  try {
                    let [m, ...ee] = A.lines.map((z) => ({
                        ...z,
                        targetPrice: Number.isFinite(z.targetPrice) ? z.targetPrice : void 0,
                      })),
                      X = (
                        await T.mutateAsync({
                          data: { title: A.title, notes: A.notes, lines: m ? [m] : [] },
                        })
                      ).id;
                    if (!X) throw Error('RFQ id missing from response.');
                    for (let z of ee) await O.mutateAsync({ rfqId: X, data: z });
                    (A.autoIssue && (await C.mutateAsync({ rfqId: X })),
                      E.Am.success('RFQ created successfully', {
                        description: A.autoIssue
                          ? 'RFQ issued to suppliers.'
                          : 'RFQ saved as draft.',
                      }),
                      $.push(`/${P}/rfq`));
                  } catch (m) {
                    (0, B.Hv)(m);
                  } finally {
                    l(!1);
                  }
                });
              return (0, n.jsxs)('div', {
                className: 'space-y-6 p-6',
                children: [
                  (0, n.jsx)(i.m, {
                    title: j('new'),
                    breadcrumbs: [{ label: j('title'), href: '/rfq' }, { label: j('new') }],
                  }),
                  (0, n.jsxs)('form', {
                    onSubmit: q,
                    className: 'space-y-6',
                    children: [
                      (0, n.jsxs)(v.Card, {
                        children: [
                          (0, n.jsx)(v.Ol, {
                            children: (0, n.jsx)(v.ll, { children: j('form.title') }),
                          }),
                          (0, n.jsx)(v.CardContent, {
                            className: 'space-y-4',
                            children: (0, n.jsxs)('div', {
                              className: 'grid gap-4 md:grid-cols-2',
                              children: [
                                (0, n.jsxs)('div', {
                                  className: 'flex flex-col gap-2',
                                  children: [
                                    (0, n.jsx)(S._, {
                                      htmlFor: 'title',
                                      children: j('form.title'),
                                    }),
                                    (0, n.jsx)(R.I, { id: 'title', ..._.register('title') }),
                                    _.formState.errors.title
                                      ? (0, n.jsx)('p', {
                                          className: 'text-xs text-danger',
                                          children: _.formState.errors.title.message,
                                        })
                                      : null,
                                  ],
                                }),
                                (0, n.jsxs)('div', {
                                  className: 'flex flex-col gap-2',
                                  children: [
                                    (0, n.jsx)(S._, {
                                      htmlFor: 'notes',
                                      children: j('form.notes'),
                                    }),
                                    (0, n.jsx)(F.g, {
                                      id: 'notes',
                                      rows: 4,
                                      ..._.register('notes'),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                      (0, n.jsxs)(v.Card, {
                        children: [
                          (0, n.jsx)(v.Ol, {
                            children: (0, n.jsx)(v.ll, { children: j('form.lines') }),
                          }),
                          (0, n.jsxs)(v.CardContent, {
                            className: 'space-y-4',
                            children: [
                              a.map((A, m) =>
                                (0, n.jsxs)(
                                  'div',
                                  {
                                    className:
                                      'border-border/70 grid gap-3 rounded-md border p-4 md:grid-cols-4',
                                    children: [
                                      (0, n.jsxs)('div', {
                                        className: 'flex flex-col gap-2 md:col-span-2',
                                        children: [
                                          (0, n.jsx)(S._, {
                                            htmlFor: `lines.${m}.description`,
                                            children: j('form.description'),
                                          }),
                                          (0, n.jsx)(R.I, {
                                            id: `lines.${m}.description`,
                                            ..._.register(`lines.${m}.description`),
                                          }),
                                          _.formState.errors.lines?.[m]?.description
                                            ? (0, n.jsx)('p', {
                                                className: 'text-xs text-danger',
                                                children:
                                                  _.formState.errors.lines[m]?.description?.message,
                                              })
                                            : null,
                                        ],
                                      }),
                                      (0, n.jsxs)('div', {
                                        className: 'flex flex-col gap-2',
                                        children: [
                                          (0, n.jsx)(S._, {
                                            htmlFor: `lines.${m}.quantity`,
                                            children: j('form.quantity'),
                                          }),
                                          (0, n.jsx)(R.I, {
                                            id: `lines.${m}.quantity`,
                                            type: 'number',
                                            step: '0.01',
                                            ..._.register(`lines.${m}.quantity`, {
                                              valueAsNumber: !0,
                                            }),
                                          }),
                                          _.formState.errors.lines?.[m]?.quantity
                                            ? (0, n.jsx)('p', {
                                                className: 'text-xs text-danger',
                                                children:
                                                  _.formState.errors.lines[m]?.quantity?.message,
                                              })
                                            : null,
                                        ],
                                      }),
                                      (0, n.jsxs)('div', {
                                        className: 'flex flex-col gap-2',
                                        children: [
                                          (0, n.jsx)(S._, {
                                            htmlFor: `lines.${m}.uom`,
                                            children: j('form.uom'),
                                          }),
                                          (0, n.jsx)(R.I, {
                                            id: `lines.${m}.uom`,
                                            ..._.register(`lines.${m}.uom`),
                                          }),
                                          _.formState.errors.lines?.[m]?.uom
                                            ? (0, n.jsx)('p', {
                                                className: 'text-xs text-danger',
                                                children: _.formState.errors.lines[m]?.uom?.message,
                                              })
                                            : null,
                                        ],
                                      }),
                                      (0, n.jsxs)('div', {
                                        className: 'flex flex-col gap-2',
                                        children: [
                                          (0, n.jsx)(S._, {
                                            htmlFor: `lines.${m}.targetPrice`,
                                            children: j('form.targetPrice'),
                                          }),
                                          (0, n.jsx)(R.I, {
                                            id: `lines.${m}.targetPrice`,
                                            type: 'number',
                                            step: '0.01',
                                            ..._.register(`lines.${m}.targetPrice`, {
                                              valueAsNumber: !0,
                                            }),
                                          }),
                                          _.formState.errors.lines?.[m]?.targetPrice
                                            ? (0, n.jsx)('p', {
                                                className: 'text-xs text-danger',
                                                children:
                                                  _.formState.errors.lines[m]?.targetPrice?.message,
                                              })
                                            : null,
                                        ],
                                      }),
                                      a.length > 1
                                        ? (0, n.jsx)('div', {
                                            className: 'md:col-span-4',
                                            children: (0, n.jsx)(N.Button, {
                                              type: 'button',
                                              variant: 'outline',
                                              size: 'sm',
                                              onClick: () => b(m),
                                              children: 'Remove',
                                            }),
                                          })
                                        : null,
                                    ],
                                  },
                                  A.id,
                                ),
                              ),
                              _.formState.errors.lines?.root
                                ? (0, n.jsx)('p', {
                                    className: 'text-xs text-danger',
                                    children: _.formState.errors.lines.root.message,
                                  })
                                : null,
                              (0, n.jsx)(N.Button, {
                                type: 'button',
                                variant: 'outline',
                                onClick: () =>
                                  w({
                                    description: '',
                                    quantity: 1,
                                    uom: 'EA',
                                    targetPrice: void 0,
                                  }),
                                children: I('addLine'),
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, n.jsxs)('div', {
                        className: 'flex items-center justify-between',
                        children: [
                          (0, n.jsxs)('label', {
                            className: 'text-muted-foreground flex items-center gap-2 text-sm',
                            children: [
                              (0, n.jsx)('input', { type: 'checkbox', ..._.register('autoIssue') }),
                              j('issueConfirm'),
                            ],
                          }),
                          (0, n.jsx)(N.Button, {
                            type: 'submit',
                            size: 'lg',
                            disabled: c,
                            children: c ? 'Submitting...' : I('submit'),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              });
            };
        },
        2516: we,
        3290: Ee,
        1746: je,
        4475: pe,
        8780: me,
        4926: (x, g, t) => {
          'use strict';
          (t.r(g), t.d(g, { default: () => y }));
          var n = t(9154),
            r = t(336),
            s = t(1298);
          let h = (0, s.D)(
              String.raw`/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/rfq/new/rfq-create-form.tsx`,
            ),
            { __esModule: f, $$typeof: d } = h;
          (h.default,
            (0, s.D)(
              String.raw`/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/rfq/new/rfq-create-form.tsx#rfqLineSchema`,
            ),
            (0, s.D)(
              String.raw`/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/rfq/new/rfq-create-form.tsx#rfqSchema`,
            ));
          let u = (0, s.D)(
            String.raw`/mnt/d/Projects/b2b-marketplace/frontend/app/[lng]/rfq/new/rfq-create-form.tsx#RfqCreateForm`,
          );
          function y() {
            return (0, n.jsx)(r.V, { children: (0, n.jsx)(u, {}) });
          }
        },
      },
      (x) => {
        var g = (n) => x((x.s = n));
        x.O(0, [365, 727, 61], () => g(1045));
        var t = x.O();
        (p._ENTRIES = typeof p._ENTRIES > 'u' ? {} : p._ENTRIES)[
          'middleware_app/[lng]/rfq/new/page'
        ] = t;
      },
    ]),
    function () {
      let x = { exports: {}, loaded: !1 };
      return (
        (function (t, n) {
          var r = Object.create,
            s = Object.defineProperty,
            h = Object.getOwnPropertyDescriptor,
            f = Object.getOwnPropertyNames,
            d = Object.getPrototypeOf,
            u = Object.prototype.hasOwnProperty,
            y = (c) => s(c, '__esModule', { value: !0 }),
            E = (c, l) => {
              y(c);
              for (var _ in l) s(c, _, { get: l[_], enumerable: !0 });
            },
            i = (c, l, _) => {
              if ((l && typeof l == 'object') || typeof l == 'function')
                for (let a of f(l))
                  !u.call(c, a) &&
                    a !== 'default' &&
                    s(c, a, { get: () => l[a], enumerable: !(_ = h(l, a)) || _.enumerable });
              return c;
            },
            N = (c) =>
              i(
                y(
                  s(
                    c != null ? r(d(c)) : {},
                    'default',
                    c && c.__esModule && 'default' in c
                      ? { get: () => c.default, enumerable: !0 }
                      : { value: c, enumerable: !0 },
                  ),
                ),
                c,
              );
          E(n, { default: () => j });
          var v = N((J(), se(W))),
            R = '@next/request-context',
            S = Symbol.for(R),
            F = Symbol.for('internal.storage');
          function D() {
            let c = p;
            if (!c[S]) {
              let l = new v.AsyncLocalStorage(),
                _ = { get: () => l.getStore(), [F]: l };
              c[S] = _;
            }
            return c[S];
          }
          var B = D();
          function K(c, l) {
            return B[F].run(c, l);
          }
          function M(c) {
            let l = {};
            return (
              c &&
                c.forEach((_, a) => {
                  ((l[a] = _), a.toLowerCase() === 'set-cookie' && (l[a] = U(_)));
                }),
              l
            );
          }
          function U(c) {
            let l = [],
              _ = 0,
              a,
              w,
              b,
              T,
              O;
            function C() {
              for (; _ < c.length && /\s/.test(c.charAt(_)); ) _ += 1;
              return _ < c.length;
            }
            function q() {
              return ((w = c.charAt(_)), w !== '=' && w !== ';' && w !== ',');
            }
            for (; _ < c.length; ) {
              for (a = _, O = !1; C(); )
                if (((w = c.charAt(_)), w === ',')) {
                  for (b = _, _ += 1, C(), T = _; _ < c.length && q(); ) _ += 1;
                  _ < c.length && c.charAt(_) === '='
                    ? ((O = !0), (_ = T), l.push(c.substring(a, b)), (a = _))
                    : (_ = b + 1);
                } else _ += 1;
              (!O || _ >= c.length) && l.push(c.substring(a, c.length));
            }
            return l;
          }
          function j(c) {
            let l = c.staticRoutes.map((a) => ({ regexp: new RegExp(a.namedRegex), page: a.page })),
              _ =
                c.dynamicRoutes?.map((a) => ({ regexp: new RegExp(a.namedRegex), page: a.page })) ||
                [];
            return async function (a, w) {
              let b = new URL(a.url).pathname,
                T = {};
              if (
                (c.nextConfig?.basePath &&
                  b.startsWith(c.nextConfig.basePath) &&
                  (b = b.replace(c.nextConfig.basePath, '') || '/'),
                c.nextConfig?.i18n)
              )
                for (let C of c.nextConfig.i18n.locales) {
                  let q = new RegExp(`^/${C}($|/)`, 'i');
                  if (b.match(q)) {
                    b = b.replace(q, '/') || '/';
                    break;
                  }
                }
              for (let C of l)
                if (C.regexp.exec(b)) {
                  T.name = C.page;
                  break;
                }
              if (!T.name) {
                let C = $(b);
                for (let q of _ || []) {
                  if (C && !$(q.page)) continue;
                  let A = q.regexp.exec(b);
                  if (A) {
                    T = { name: q.page, params: A.groups };
                    break;
                  }
                }
              }
              let O = await K({ waitUntil: w.waitUntil }, () =>
                p._ENTRIES[`middleware_${c.name}`].default.call(
                  {},
                  {
                    request: {
                      url: a.url,
                      method: a.method,
                      headers: M(a.headers),
                      ip: I(a.headers, P.Ip),
                      geo: {
                        city: I(a.headers, P.City, !0),
                        country: I(a.headers, P.Country, !0),
                        latitude: I(a.headers, P.Latitude),
                        longitude: I(a.headers, P.Longitude),
                        region: I(a.headers, P.Region, !0),
                      },
                      nextConfig: c.nextConfig,
                      page: T,
                      body: a.body,
                    },
                  },
                ),
              );
              return (O.waitUntil && w.waitUntil(O.waitUntil), O.response);
            };
          }
          function I(c, l, _ = !1) {
            let a = c.get(l) || void 0;
            return _ && a ? decodeURIComponent(a) : a;
          }
          function $(c) {
            return c === '/api' || c.startsWith('/api/');
          }
          var P;
          (function (c) {
            ((c.City = 'x-vercel-ip-city'),
              (c.Country = 'x-vercel-ip-country'),
              (c.Ip = 'x-real-ip'),
              (c.Latitude = 'x-vercel-ip-latitude'),
              (c.Longitude = 'x-vercel-ip-longitude'),
              (c.Region = 'x-vercel-ip-country-region'));
          })(P || (P = {}));
        })(x, x.exports),
        x.exports
      );
    }
      .call({})
      .default({
        name: 'app/[lng]/rfq/new/page',
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
export { U_ as default };
