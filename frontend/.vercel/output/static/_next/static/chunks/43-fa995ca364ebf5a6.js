'use strict';
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [43],
  {
    5105: function (e, t, r) {
      r.d(t, {
        default: function () {
          return o.a;
        },
      });
      var n = r(5608),
        o = r.n(n);
    },
    9939: function (e, t, r) {
      var n = r(2570);
      (r.o(n, 'permanentRedirect') &&
        r.d(t, {
          permanentRedirect: function () {
            return n.permanentRedirect;
          },
        }),
        r.o(n, 'redirect') &&
          r.d(t, {
            redirect: function () {
              return n.redirect;
            },
          }),
        r.o(n, 'usePathname') &&
          r.d(t, {
            usePathname: function () {
              return n.usePathname;
            },
          }),
        r.o(n, 'useRouter') &&
          r.d(t, {
            useRouter: function () {
              return n.useRouter;
            },
          }),
        r.o(n, 'useSearchParams') &&
          r.d(t, {
            useSearchParams: function () {
              return n.useSearchParams;
            },
          }));
    },
    8512: function (e, t, r) {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'addLocale', {
          enumerable: !0,
          get: function () {
            return n;
          },
        }),
        r(9637));
      let n = function (e) {
        for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
          r[n - 1] = arguments[n];
        return e;
      };
      ('function' == typeof t.default || ('object' == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, '__esModule', { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    3163: function (e, t, r) {
      function n(e, t, r, n) {
        return !1;
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'getDomainLocale', {
          enumerable: !0,
          get: function () {
            return n;
          },
        }),
        r(9637),
        ('function' == typeof t.default || ('object' == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, '__esModule', { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default)));
    },
    5608: function (e, t, r) {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'default', {
          enumerable: !0,
          get: function () {
            return x;
          },
        }));
      let n = r(8560),
        o = r(6501),
        l = n._(r(8422)),
        i = r(4440),
        a = r(9245),
        s = r(7156),
        u = r(8446),
        c = r(8512),
        d = r(9094),
        f = r(5419),
        p = r(4858),
        h = r(3163),
        m = r(5370),
        b = r(424),
        g = new Set();
      function y(e, t, r, n, o, l) {
        if ('undefined' != typeof window && (l || (0, a.isLocalURL)(t))) {
          if (!n.bypassPrefetchedCheck) {
            let o =
              t +
              '%' +
              r +
              '%' +
              (void 0 !== n.locale ? n.locale : 'locale' in e ? e.locale : void 0);
            if (g.has(o)) return;
            g.add(o);
          }
          (async () => (l ? e.prefetch(t, o) : e.prefetch(t, r, n)))().catch((e) => {});
        }
      }
      function v(e) {
        return 'string' == typeof e ? e : (0, s.formatUrl)(e);
      }
      let x = l.default.forwardRef(function (e, t) {
        let r, n;
        let {
          href: s,
          as: g,
          children: x,
          prefetch: w = null,
          passHref: j,
          replace: P,
          shallow: k,
          scroll: R,
          locale: _,
          onClick: O,
          onMouseEnter: S,
          onTouchStart: E,
          legacyBehavior: C = !1,
          ...N
        } = e;
        ((r = x),
          C &&
            ('string' == typeof r || 'number' == typeof r) &&
            (r = (0, o.jsx)('a', { children: r })));
        let M = l.default.useContext(d.RouterContext),
          z = l.default.useContext(f.AppRouterContext),
          I = null != M ? M : z,
          L = !M,
          A = !1 !== w,
          U = null === w ? b.PrefetchKind.AUTO : b.PrefetchKind.FULL,
          { href: T, as: W } = l.default.useMemo(() => {
            if (!M) {
              let e = v(s);
              return { href: e, as: g ? v(g) : e };
            }
            let [e, t] = (0, i.resolveHref)(M, s, !0);
            return { href: e, as: g ? (0, i.resolveHref)(M, g) : t || e };
          }, [M, s, g]),
          $ = l.default.useRef(T),
          D = l.default.useRef(W);
        C && (n = l.default.Children.only(r));
        let q = C ? n && 'object' == typeof n && n.ref : t,
          [G, K, F] = (0, p.useIntersection)({ rootMargin: '200px' }),
          V = l.default.useCallback(
            (e) => {
              ((D.current !== W || $.current !== T) && (F(), (D.current = W), ($.current = T)),
                G(e),
                q && ('function' == typeof q ? q(e) : 'object' == typeof q && (q.current = e)));
            },
            [W, q, T, F, G],
          );
        l.default.useEffect(() => {
          I && K && A && y(I, T, W, { locale: _ }, { kind: U }, L);
        }, [W, T, K, _, A, null == M ? void 0 : M.locale, I, L, U]);
        let B = {
          ref: V,
          onClick(e) {
            (C || 'function' != typeof O || O(e),
              C && n.props && 'function' == typeof n.props.onClick && n.props.onClick(e),
              I &&
                !e.defaultPrevented &&
                (function (e, t, r, n, o, i, s, u, c) {
                  let { nodeName: d } = e.currentTarget;
                  if (
                    'A' === d.toUpperCase() &&
                    ((function (e) {
                      let t = e.currentTarget.getAttribute('target');
                      return (
                        (t && '_self' !== t) ||
                        e.metaKey ||
                        e.ctrlKey ||
                        e.shiftKey ||
                        e.altKey ||
                        (e.nativeEvent && 2 === e.nativeEvent.which)
                      );
                    })(e) ||
                      (!c && !(0, a.isLocalURL)(r)))
                  )
                    return;
                  e.preventDefault();
                  let f = () => {
                    let e = null == s || s;
                    'beforePopState' in t
                      ? t[o ? 'replace' : 'push'](r, n, { shallow: i, locale: u, scroll: e })
                      : t[o ? 'replace' : 'push'](n || r, { scroll: e });
                  };
                  c ? l.default.startTransition(f) : f();
                })(e, I, T, W, P, k, R, _, L));
          },
          onMouseEnter(e) {
            (C || 'function' != typeof S || S(e),
              C && n.props && 'function' == typeof n.props.onMouseEnter && n.props.onMouseEnter(e),
              I &&
                (A || !L) &&
                y(I, T, W, { locale: _, priority: !0, bypassPrefetchedCheck: !0 }, { kind: U }, L));
          },
          onTouchStart: function (e) {
            (C || 'function' != typeof E || E(e),
              C && n.props && 'function' == typeof n.props.onTouchStart && n.props.onTouchStart(e),
              I &&
                (A || !L) &&
                y(I, T, W, { locale: _, priority: !0, bypassPrefetchedCheck: !0 }, { kind: U }, L));
          },
        };
        if ((0, u.isAbsoluteUrl)(W)) B.href = W;
        else if (!C || j || ('a' === n.type && !('href' in n.props))) {
          let e = void 0 !== _ ? _ : null == M ? void 0 : M.locale,
            t =
              (null == M ? void 0 : M.isLocaleDomain) &&
              (0, h.getDomainLocale)(
                W,
                e,
                null == M ? void 0 : M.locales,
                null == M ? void 0 : M.domainLocales,
              );
          B.href =
            t || (0, m.addBasePath)((0, c.addLocale)(W, e, null == M ? void 0 : M.defaultLocale));
        }
        return C ? l.default.cloneElement(n, B) : (0, o.jsx)('a', { ...N, ...B, children: r });
      });
      ('function' == typeof t.default || ('object' == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, '__esModule', { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    3794: function (e, t) {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (function (e, t) {
          for (var r in t) Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        })(t, {
          cancelIdleCallback: function () {
            return n;
          },
          requestIdleCallback: function () {
            return r;
          },
        }));
      let r =
          ('undefined' != typeof self &&
            self.requestIdleCallback &&
            self.requestIdleCallback.bind(window)) ||
          function (e) {
            let t = Date.now();
            return self.setTimeout(function () {
              e({
                didTimeout: !1,
                timeRemaining: function () {
                  return Math.max(0, 50 - (Date.now() - t));
                },
              });
            }, 1);
          },
        n =
          ('undefined' != typeof self &&
            self.cancelIdleCallback &&
            self.cancelIdleCallback.bind(window)) ||
          function (e) {
            return clearTimeout(e);
          };
      ('function' == typeof t.default || ('object' == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, '__esModule', { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    4440: function (e, t, r) {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'resolveHref', {
          enumerable: !0,
          get: function () {
            return d;
          },
        }));
      let n = r(4705),
        o = r(7156),
        l = r(5766),
        i = r(8446),
        a = r(9637),
        s = r(9245),
        u = r(2650),
        c = r(8419);
      function d(e, t, r) {
        let d;
        let f = 'string' == typeof t ? t : (0, o.formatWithValidation)(t),
          p = f.match(/^[a-zA-Z]{1,}:\/\//),
          h = p ? f.slice(p[0].length) : f;
        if ((h.split('?', 1)[0] || '').match(/(\/\/|\\)/)) {
          console.error(
            "Invalid href '" +
              f +
              "' passed to next/router in page: '" +
              e.pathname +
              "'. Repeated forward-slashes (//) or backslashes \\ are not valid in the href.",
          );
          let t = (0, i.normalizeRepeatedSlashes)(h);
          f = (p ? p[0] : '') + t;
        }
        if (!(0, s.isLocalURL)(f)) return r ? [f] : f;
        try {
          d = new URL(f.startsWith('#') ? e.asPath : e.pathname, 'http://n');
        } catch (e) {
          d = new URL('/', 'http://n');
        }
        try {
          let e = new URL(f, d);
          e.pathname = (0, a.normalizePathTrailingSlash)(e.pathname);
          let t = '';
          if ((0, u.isDynamicRoute)(e.pathname) && e.searchParams && r) {
            let r = (0, n.searchParamsToUrlQuery)(e.searchParams),
              { result: i, params: a } = (0, c.interpolateAs)(e.pathname, e.pathname, r);
            i &&
              (t = (0, o.formatWithValidation)({
                pathname: i,
                hash: e.hash,
                query: (0, l.omit)(r, a),
              }));
          }
          let i = e.origin === d.origin ? e.href.slice(e.origin.length) : e.href;
          return r ? [i, t || i] : i;
        } catch (e) {
          return r ? [f] : f;
        }
      }
      ('function' == typeof t.default || ('object' == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, '__esModule', { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    4858: function (e, t, r) {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'useIntersection', {
          enumerable: !0,
          get: function () {
            return s;
          },
        }));
      let n = r(8422),
        o = r(3794),
        l = 'function' == typeof IntersectionObserver,
        i = new Map(),
        a = [];
      function s(e) {
        let { rootRef: t, rootMargin: r, disabled: s } = e,
          u = s || !l,
          [c, d] = (0, n.useState)(!1),
          f = (0, n.useRef)(null),
          p = (0, n.useCallback)((e) => {
            f.current = e;
          }, []);
        return (
          (0, n.useEffect)(() => {
            if (l) {
              if (u || c) return;
              let e = f.current;
              if (e && e.tagName)
                return (function (e, t, r) {
                  let {
                    id: n,
                    observer: o,
                    elements: l,
                  } = (function (e) {
                    let t;
                    let r = { root: e.root || null, margin: e.rootMargin || '' },
                      n = a.find((e) => e.root === r.root && e.margin === r.margin);
                    if (n && (t = i.get(n))) return t;
                    let o = new Map();
                    return (
                      (t = {
                        id: r,
                        observer: new IntersectionObserver((e) => {
                          e.forEach((e) => {
                            let t = o.get(e.target),
                              r = e.isIntersecting || e.intersectionRatio > 0;
                            t && r && t(r);
                          });
                        }, e),
                        elements: o,
                      }),
                      a.push(r),
                      i.set(r, t),
                      t
                    );
                  })(r);
                  return (
                    l.set(e, t),
                    o.observe(e),
                    function () {
                      if ((l.delete(e), o.unobserve(e), 0 === l.size)) {
                        (o.disconnect(), i.delete(n));
                        let e = a.findIndex((e) => e.root === n.root && e.margin === n.margin);
                        e > -1 && a.splice(e, 1);
                      }
                    }
                  );
                })(e, (e) => e && d(e), { root: null == t ? void 0 : t.current, rootMargin: r });
            } else if (!c) {
              let e = (0, o.requestIdleCallback)(() => d(!0));
              return () => (0, o.cancelIdleCallback)(e);
            }
          }, [u, r, t, c, f.current]),
          [
            p,
            c,
            (0, n.useCallback)(() => {
              d(!1);
            }, []),
          ]
        );
      }
      ('function' == typeof t.default || ('object' == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, '__esModule', { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    7299: function (e, t) {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'escapeStringRegexp', {
          enumerable: !0,
          get: function () {
            return o;
          },
        }));
      let r = /[|\\{}()[\]^$+*?.-]/,
        n = /[|\\{}()[\]^$+*?.-]/g;
      function o(e) {
        return r.test(e) ? e.replace(n, '\\$&') : e;
      }
    },
    9094: function (e, t, r) {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'RouterContext', {
          enumerable: !0,
          get: function () {
            return n;
          },
        }));
      let n = r(8560)._(r(8422)).default.createContext(null);
    },
    7156: function (e, t, r) {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (function (e, t) {
          for (var r in t) Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        })(t, {
          formatUrl: function () {
            return l;
          },
          formatWithValidation: function () {
            return a;
          },
          urlObjectKeys: function () {
            return i;
          },
        }));
      let n = r(8431)._(r(4705)),
        o = /https?|ftp|gopher|file/;
      function l(e) {
        let { auth: t, hostname: r } = e,
          l = e.protocol || '',
          i = e.pathname || '',
          a = e.hash || '',
          s = e.query || '',
          u = !1;
        ((t = t ? encodeURIComponent(t).replace(/%3A/i, ':') + '@' : ''),
          e.host
            ? (u = t + e.host)
            : r && ((u = t + (~r.indexOf(':') ? '[' + r + ']' : r)), e.port && (u += ':' + e.port)),
          s && 'object' == typeof s && (s = String(n.urlQueryToSearchParams(s))));
        let c = e.search || (s && '?' + s) || '';
        return (
          l && !l.endsWith(':') && (l += ':'),
          e.slashes || ((!l || o.test(l)) && !1 !== u)
            ? ((u = '//' + (u || '')), i && '/' !== i[0] && (i = '/' + i))
            : u || (u = ''),
          a && '#' !== a[0] && (a = '#' + a),
          c && '?' !== c[0] && (c = '?' + c),
          '' +
            l +
            u +
            (i = i.replace(/[?#]/g, encodeURIComponent)) +
            (c = c.replace('#', '%23')) +
            a
        );
      }
      let i = [
        'auth',
        'hash',
        'host',
        'hostname',
        'href',
        'path',
        'pathname',
        'port',
        'protocol',
        'query',
        'search',
        'slashes',
      ];
      function a(e) {
        return l(e);
      }
    },
    2650: function (e, t, r) {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (function (e, t) {
          for (var r in t) Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        })(t, {
          getSortedRoutes: function () {
            return n.getSortedRoutes;
          },
          isDynamicRoute: function () {
            return o.isDynamicRoute;
          },
        }));
      let n = r(7700),
        o = r(1745);
    },
    8419: function (e, t, r) {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'interpolateAs', {
          enumerable: !0,
          get: function () {
            return l;
          },
        }));
      let n = r(3214),
        o = r(6884);
      function l(e, t, r) {
        let l = '',
          i = (0, o.getRouteRegex)(e),
          a = i.groups,
          s = (t !== e ? (0, n.getRouteMatcher)(i)(t) : '') || r;
        l = e;
        let u = Object.keys(a);
        return (
          u.every((e) => {
            let t = s[e] || '',
              { repeat: r, optional: n } = a[e],
              o = '[' + (r ? '...' : '') + e + ']';
            return (
              n && (o = (t ? '' : '/') + '[' + o + ']'),
              r && !Array.isArray(t) && (t = [t]),
              (n || e in s) &&
                (l =
                  l.replace(
                    o,
                    r ? t.map((e) => encodeURIComponent(e)).join('/') : encodeURIComponent(t),
                  ) || '/')
            );
          }) || (l = ''),
          { params: u, result: l }
        );
      }
    },
    1745: function (e, t, r) {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'isDynamicRoute', {
          enumerable: !0,
          get: function () {
            return l;
          },
        }));
      let n = r(1904),
        o = /\/\[[^/]+?\](?=\/|$)/;
      function l(e) {
        return (
          (0, n.isInterceptionRouteAppPath)(e) &&
            (e = (0, n.extractInterceptionRouteInformation)(e).interceptedRoute),
          o.test(e)
        );
      }
    },
    9245: function (e, t, r) {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'isLocalURL', {
          enumerable: !0,
          get: function () {
            return l;
          },
        }));
      let n = r(8446),
        o = r(1150);
      function l(e) {
        if (!(0, n.isAbsoluteUrl)(e)) return !0;
        try {
          let t = (0, n.getLocationOrigin)(),
            r = new URL(e, t);
          return r.origin === t && (0, o.hasBasePath)(r.pathname);
        } catch (e) {
          return !1;
        }
      }
    },
    5766: function (e, t) {
      function r(e, t) {
        let r = {};
        return (
          Object.keys(e).forEach((n) => {
            t.includes(n) || (r[n] = e[n]);
          }),
          r
        );
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'omit', {
          enumerable: !0,
          get: function () {
            return r;
          },
        }));
    },
    4705: function (e, t) {
      function r(e) {
        let t = {};
        return (
          e.forEach((e, r) => {
            void 0 === t[r] ? (t[r] = e) : Array.isArray(t[r]) ? t[r].push(e) : (t[r] = [t[r], e]);
          }),
          t
        );
      }
      function n(e) {
        return 'string' != typeof e && ('number' != typeof e || isNaN(e)) && 'boolean' != typeof e
          ? ''
          : String(e);
      }
      function o(e) {
        let t = new URLSearchParams();
        return (
          Object.entries(e).forEach((e) => {
            let [r, o] = e;
            Array.isArray(o) ? o.forEach((e) => t.append(r, n(e))) : t.set(r, n(o));
          }),
          t
        );
      }
      function l(e) {
        for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
          r[n - 1] = arguments[n];
        return (
          r.forEach((t) => {
            (Array.from(t.keys()).forEach((t) => e.delete(t)), t.forEach((t, r) => e.append(r, t)));
          }),
          e
        );
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (function (e, t) {
          for (var r in t) Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        })(t, {
          assign: function () {
            return l;
          },
          searchParamsToUrlQuery: function () {
            return r;
          },
          urlQueryToSearchParams: function () {
            return o;
          },
        }));
    },
    3214: function (e, t, r) {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'getRouteMatcher', {
          enumerable: !0,
          get: function () {
            return o;
          },
        }));
      let n = r(8446);
      function o(e) {
        let { re: t, groups: r } = e;
        return (e) => {
          let o = t.exec(e);
          if (!o) return !1;
          let l = (e) => {
              try {
                return decodeURIComponent(e);
              } catch (e) {
                throw new n.DecodeError('failed to decode param');
              }
            },
            i = {};
          return (
            Object.keys(r).forEach((e) => {
              let t = r[e],
                n = o[t.pos];
              void 0 !== n &&
                (i[e] = ~n.indexOf('/') ? n.split('/').map((e) => l(e)) : t.repeat ? [l(n)] : l(n));
            }),
            i
          );
        };
      }
    },
    6884: function (e, t, r) {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (function (e, t) {
          for (var r in t) Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        })(t, {
          getNamedMiddlewareRegex: function () {
            return f;
          },
          getNamedRouteRegex: function () {
            return d;
          },
          getRouteRegex: function () {
            return s;
          },
        }));
      let n = r(1904),
        o = r(7299),
        l = r(7419);
      function i(e) {
        let t = e.startsWith('[') && e.endsWith(']');
        t && (e = e.slice(1, -1));
        let r = e.startsWith('...');
        return (r && (e = e.slice(3)), { key: e, repeat: r, optional: t });
      }
      function a(e) {
        let t = (0, l.removeTrailingSlash)(e).slice(1).split('/'),
          r = {},
          a = 1;
        return {
          parameterizedRoute: t
            .map((e) => {
              let t = n.INTERCEPTION_ROUTE_MARKERS.find((t) => e.startsWith(t)),
                l = e.match(/\[((?:\[.*\])|.+)\]/);
              if (t && l) {
                let { key: e, optional: n, repeat: s } = i(l[1]);
                return (
                  (r[e] = { pos: a++, repeat: s, optional: n }),
                  '/' + (0, o.escapeStringRegexp)(t) + '([^/]+?)'
                );
              }
              if (!l) return '/' + (0, o.escapeStringRegexp)(e);
              {
                let { key: e, repeat: t, optional: n } = i(l[1]);
                return (
                  (r[e] = { pos: a++, repeat: t, optional: n }),
                  t ? (n ? '(?:/(.+?))?' : '/(.+?)') : '/([^/]+?)'
                );
              }
            })
            .join(''),
          groups: r,
        };
      }
      function s(e) {
        let { parameterizedRoute: t, groups: r } = a(e);
        return { re: RegExp('^' + t + '(?:/)?$'), groups: r };
      }
      function u(e) {
        let {
            interceptionMarker: t,
            getSafeRouteKey: r,
            segment: n,
            routeKeys: l,
            keyPrefix: a,
          } = e,
          { key: s, optional: u, repeat: c } = i(n),
          d = s.replace(/\W/g, '');
        a && (d = '' + a + d);
        let f = !1;
        ((0 === d.length || d.length > 30) && (f = !0),
          isNaN(parseInt(d.slice(0, 1))) || (f = !0),
          f && (d = r()),
          a ? (l[d] = '' + a + s) : (l[d] = s));
        let p = t ? (0, o.escapeStringRegexp)(t) : '';
        return c
          ? u
            ? '(?:/' + p + '(?<' + d + '>.+?))?'
            : '/' + p + '(?<' + d + '>.+?)'
          : '/' + p + '(?<' + d + '>[^/]+?)';
      }
      function c(e, t) {
        let r;
        let i = (0, l.removeTrailingSlash)(e).slice(1).split('/'),
          a =
            ((r = 0),
            () => {
              let e = '',
                t = ++r;
              for (; t > 0; )
                ((e += String.fromCharCode(97 + ((t - 1) % 26))), (t = Math.floor((t - 1) / 26)));
              return e;
            }),
          s = {};
        return {
          namedParameterizedRoute: i
            .map((e) => {
              let r = n.INTERCEPTION_ROUTE_MARKERS.some((t) => e.startsWith(t)),
                l = e.match(/\[((?:\[.*\])|.+)\]/);
              if (r && l) {
                let [r] = e.split(l[0]);
                return u({
                  getSafeRouteKey: a,
                  interceptionMarker: r,
                  segment: l[1],
                  routeKeys: s,
                  keyPrefix: t ? 'nxtI' : void 0,
                });
              }
              return l
                ? u({
                    getSafeRouteKey: a,
                    segment: l[1],
                    routeKeys: s,
                    keyPrefix: t ? 'nxtP' : void 0,
                  })
                : '/' + (0, o.escapeStringRegexp)(e);
            })
            .join(''),
          routeKeys: s,
        };
      }
      function d(e, t) {
        let r = c(e, t);
        return {
          ...s(e),
          namedRegex: '^' + r.namedParameterizedRoute + '(?:/)?$',
          routeKeys: r.routeKeys,
        };
      }
      function f(e, t) {
        let { parameterizedRoute: r } = a(e),
          { catchAll: n = !0 } = t;
        if ('/' === r) return { namedRegex: '^/' + (n ? '.*' : '') + '$' };
        let { namedParameterizedRoute: o } = c(e, !1);
        return { namedRegex: '^' + o + (n ? '(?:(/.*)?)' : '') + '$' };
      }
    },
    7700: function (e, t) {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'getSortedRoutes', {
          enumerable: !0,
          get: function () {
            return n;
          },
        }));
      class r {
        insert(e) {
          this._insert(e.split('/').filter(Boolean), [], !1);
        }
        smoosh() {
          return this._smoosh();
        }
        _smoosh(e) {
          void 0 === e && (e = '/');
          let t = [...this.children.keys()].sort();
          (null !== this.slugName && t.splice(t.indexOf('[]'), 1),
            null !== this.restSlugName && t.splice(t.indexOf('[...]'), 1),
            null !== this.optionalRestSlugName && t.splice(t.indexOf('[[...]]'), 1));
          let r = t
            .map((t) => this.children.get(t)._smoosh('' + e + t + '/'))
            .reduce((e, t) => [...e, ...t], []);
          if (
            (null !== this.slugName &&
              r.push(...this.children.get('[]')._smoosh(e + '[' + this.slugName + ']/')),
            !this.placeholder)
          ) {
            let t = '/' === e ? '/' : e.slice(0, -1);
            if (null != this.optionalRestSlugName)
              throw Error(
                'You cannot define a route with the same specificity as a optional catch-all route ("' +
                  t +
                  '" and "' +
                  t +
                  '[[...' +
                  this.optionalRestSlugName +
                  ']]").',
              );
            r.unshift(t);
          }
          return (
            null !== this.restSlugName &&
              r.push(...this.children.get('[...]')._smoosh(e + '[...' + this.restSlugName + ']/')),
            null !== this.optionalRestSlugName &&
              r.push(
                ...this.children
                  .get('[[...]]')
                  ._smoosh(e + '[[...' + this.optionalRestSlugName + ']]/'),
              ),
            r
          );
        }
        _insert(e, t, n) {
          if (0 === e.length) {
            this.placeholder = !1;
            return;
          }
          if (n) throw Error('Catch-all must be the last part of the URL.');
          let o = e[0];
          if (o.startsWith('[') && o.endsWith(']')) {
            let r = o.slice(1, -1),
              i = !1;
            if (
              (r.startsWith('[') && r.endsWith(']') && ((r = r.slice(1, -1)), (i = !0)),
              r.startsWith('...') && ((r = r.substring(3)), (n = !0)),
              r.startsWith('[') || r.endsWith(']'))
            )
              throw Error("Segment names may not start or end with extra brackets ('" + r + "').");
            if (r.startsWith('.'))
              throw Error("Segment names may not start with erroneous periods ('" + r + "').");
            function l(e, r) {
              if (null !== e && e !== r)
                throw Error(
                  "You cannot use different slug names for the same dynamic path ('" +
                    e +
                    "' !== '" +
                    r +
                    "').",
                );
              (t.forEach((e) => {
                if (e === r)
                  throw Error(
                    'You cannot have the same slug name "' +
                      r +
                      '" repeat within a single dynamic path',
                  );
                if (e.replace(/\W/g, '') === o.replace(/\W/g, ''))
                  throw Error(
                    'You cannot have the slug names "' +
                      e +
                      '" and "' +
                      r +
                      '" differ only by non-word symbols within a single dynamic path',
                  );
              }),
                t.push(r));
            }
            if (n) {
              if (i) {
                if (null != this.restSlugName)
                  throw Error(
                    'You cannot use both an required and optional catch-all route at the same level ("[...' +
                      this.restSlugName +
                      ']" and "' +
                      e[0] +
                      '" ).',
                  );
                (l(this.optionalRestSlugName, r), (this.optionalRestSlugName = r), (o = '[[...]]'));
              } else {
                if (null != this.optionalRestSlugName)
                  throw Error(
                    'You cannot use both an optional and required catch-all route at the same level ("[[...' +
                      this.optionalRestSlugName +
                      ']]" and "' +
                      e[0] +
                      '").',
                  );
                (l(this.restSlugName, r), (this.restSlugName = r), (o = '[...]'));
              }
            } else {
              if (i)
                throw Error('Optional route parameters are not yet supported ("' + e[0] + '").');
              (l(this.slugName, r), (this.slugName = r), (o = '[]'));
            }
          }
          (this.children.has(o) || this.children.set(o, new r()),
            this.children.get(o)._insert(e.slice(1), t, n));
        }
        constructor() {
          ((this.placeholder = !0),
            (this.children = new Map()),
            (this.slugName = null),
            (this.restSlugName = null),
            (this.optionalRestSlugName = null));
        }
      }
      function n(e) {
        let t = new r();
        return (e.forEach((e) => t.insert(e)), t.smoosh());
      }
    },
    8446: function (e, t) {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (function (e, t) {
          for (var r in t) Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        })(t, {
          DecodeError: function () {
            return h;
          },
          MiddlewareNotFoundError: function () {
            return y;
          },
          MissingStaticPage: function () {
            return g;
          },
          NormalizeError: function () {
            return m;
          },
          PageNotFoundError: function () {
            return b;
          },
          SP: function () {
            return f;
          },
          ST: function () {
            return p;
          },
          WEB_VITALS: function () {
            return r;
          },
          execOnce: function () {
            return n;
          },
          getDisplayName: function () {
            return s;
          },
          getLocationOrigin: function () {
            return i;
          },
          getURL: function () {
            return a;
          },
          isAbsoluteUrl: function () {
            return l;
          },
          isResSent: function () {
            return u;
          },
          loadGetInitialProps: function () {
            return d;
          },
          normalizeRepeatedSlashes: function () {
            return c;
          },
          stringifyError: function () {
            return v;
          },
        }));
      let r = ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'];
      function n(e) {
        let t,
          r = !1;
        return function () {
          for (var n = arguments.length, o = Array(n), l = 0; l < n; l++) o[l] = arguments[l];
          return (r || ((r = !0), (t = e(...o))), t);
        };
      }
      let o = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
        l = (e) => o.test(e);
      function i() {
        let { protocol: e, hostname: t, port: r } = window.location;
        return e + '//' + t + (r ? ':' + r : '');
      }
      function a() {
        let { href: e } = window.location,
          t = i();
        return e.substring(t.length);
      }
      function s(e) {
        return 'string' == typeof e ? e : e.displayName || e.name || 'Unknown';
      }
      function u(e) {
        return e.finished || e.headersSent;
      }
      function c(e) {
        let t = e.split('?');
        return (
          t[0].replace(/\\/g, '/').replace(/\/\/+/g, '/') + (t[1] ? '?' + t.slice(1).join('?') : '')
        );
      }
      async function d(e, t) {
        let r = t.res || (t.ctx && t.ctx.res);
        if (!e.getInitialProps)
          return t.ctx && t.Component ? { pageProps: await d(t.Component, t.ctx) } : {};
        let n = await e.getInitialProps(t);
        if (r && u(r)) return n;
        if (!n)
          throw Error(
            '"' +
              s(e) +
              '.getInitialProps()" should resolve to an object. But found "' +
              n +
              '" instead.',
          );
        return n;
      }
      let f = 'undefined' != typeof performance,
        p =
          f &&
          ['mark', 'measure', 'getEntriesByName'].every((e) => 'function' == typeof performance[e]);
      class h extends Error {}
      class m extends Error {}
      class b extends Error {
        constructor(e) {
          (super(),
            (this.code = 'ENOENT'),
            (this.name = 'PageNotFoundError'),
            (this.message = 'Cannot find module for page: ' + e));
        }
      }
      class g extends Error {
        constructor(e, t) {
          (super(), (this.message = 'Failed to load static file for page: ' + e + ' ' + t));
        }
      }
      class y extends Error {
        constructor() {
          (super(), (this.code = 'ENOENT'), (this.message = 'Cannot find the middleware module'));
        }
      }
      function v(e) {
        return JSON.stringify({ message: e.message, stack: e.stack });
      }
    },
    2619: function (e, t, r) {
      r.d(t, {
        g7: function () {
          return d;
        },
        Z8: function () {
          return c;
        },
      });
      var n = r(8422),
        o = r.t(n, 2);
      function l(e, t) {
        if ('function' == typeof e) return e(t);
        null != e && (e.current = t);
      }
      var i = r(6501),
        a = Symbol.for('react.lazy'),
        s = o[' use '.trim().toString()];
      function u(e) {
        var t;
        return (
          null != e &&
          'object' == typeof e &&
          '$$typeof' in e &&
          e.$$typeof === a &&
          '_payload' in e &&
          'object' == typeof (t = e._payload) &&
          null !== t &&
          'then' in t
        );
      }
      function c(e) {
        let t = (function (e) {
            let t = n.forwardRef((e, t) => {
              let { children: r, ...o } = e;
              if ((u(r) && 'function' == typeof s && (r = s(r._payload)), n.isValidElement(r))) {
                var i;
                let e, a;
                let s =
                    ((i = r),
                    (e = Object.getOwnPropertyDescriptor(i.props, 'ref')?.get) &&
                    'isReactWarning' in e &&
                    e.isReactWarning
                      ? i.ref
                      : (e = Object.getOwnPropertyDescriptor(i, 'ref')?.get) &&
                          'isReactWarning' in e &&
                          e.isReactWarning
                        ? i.props.ref
                        : i.props.ref || i.ref),
                  u = (function (e, t) {
                    let r = { ...t };
                    for (let n in t) {
                      let o = e[n],
                        l = t[n];
                      /^on[A-Z]/.test(n)
                        ? o && l
                          ? (r[n] = (...e) => {
                              let t = l(...e);
                              return (o(...e), t);
                            })
                          : o && (r[n] = o)
                        : 'style' === n
                          ? (r[n] = { ...o, ...l })
                          : 'className' === n && (r[n] = [o, l].filter(Boolean).join(' '));
                    }
                    return { ...e, ...r };
                  })(o, r.props);
                return (
                  r.type !== n.Fragment &&
                    (u.ref = t
                      ? (function (...e) {
                          return (t) => {
                            let r = !1,
                              n = e.map((e) => {
                                let n = l(e, t);
                                return (r || 'function' != typeof n || (r = !0), n);
                              });
                            if (r)
                              return () => {
                                for (let t = 0; t < n.length; t++) {
                                  let r = n[t];
                                  'function' == typeof r ? r() : l(e[t], null);
                                }
                              };
                          };
                        })(t, s)
                      : s),
                  n.cloneElement(r, u)
                );
              }
              return n.Children.count(r) > 1 ? n.Children.only(null) : null;
            });
            return ((t.displayName = `${e}.SlotClone`), t);
          })(e),
          r = n.forwardRef((e, r) => {
            let { children: o, ...l } = e;
            u(o) && 'function' == typeof s && (o = s(o._payload));
            let a = n.Children.toArray(o),
              c = a.find(p);
            if (c) {
              let e = c.props.children,
                o = a.map((t) =>
                  t !== c
                    ? t
                    : n.Children.count(e) > 1
                      ? n.Children.only(null)
                      : n.isValidElement(e)
                        ? e.props.children
                        : null,
                );
              return (0, i.jsx)(t, {
                ...l,
                ref: r,
                children: n.isValidElement(e) ? n.cloneElement(e, void 0, o) : null,
              });
            }
            return (0, i.jsx)(t, { ...l, ref: r, children: o });
          });
        return ((r.displayName = `${e}.Slot`), r);
      }
      var d = c('Slot'),
        f = Symbol('radix.slottable');
      function p(e) {
        return (
          n.isValidElement(e) &&
          'function' == typeof e.type &&
          '__radixId' in e.type &&
          e.type.__radixId === f
        );
      }
    },
    7561: function (e, t, r) {
      r.d(t, {
        j: function () {
          return i;
        },
      });
      var n = r(9007);
      let o = (e) => ('boolean' == typeof e ? `${e}` : 0 === e ? '0' : e),
        l = n.W,
        i = (e, t) => (r) => {
          var n;
          if ((null == t ? void 0 : t.variants) == null)
            return l(e, null == r ? void 0 : r.class, null == r ? void 0 : r.className);
          let { variants: i, defaultVariants: a } = t,
            s = Object.keys(i).map((e) => {
              let t = null == r ? void 0 : r[e],
                n = null == a ? void 0 : a[e];
              if (null === t) return null;
              let l = o(t) || o(n);
              return i[e][l];
            }),
            u =
              r &&
              Object.entries(r).reduce((e, t) => {
                let [r, n] = t;
                return (void 0 === n || (e[r] = n), e);
              }, {});
          return l(
            e,
            s,
            null == t
              ? void 0
              : null === (n = t.compoundVariants) || void 0 === n
                ? void 0
                : n.reduce((e, t) => {
                    let { class: r, className: n, ...o } = t;
                    return Object.entries(o).every((e) => {
                      let [t, r] = e;
                      return Array.isArray(r)
                        ? r.includes({ ...a, ...u }[t])
                        : { ...a, ...u }[t] === r;
                    })
                      ? [...e, r, n]
                      : e;
                  }, []),
            null == r ? void 0 : r.class,
            null == r ? void 0 : r.className,
          );
        };
    },
    9007: function (e, t, r) {
      r.d(t, {
        W: function () {
          return n;
        },
      });
      function n() {
        for (var e, t, r = 0, n = '', o = arguments.length; r < o; r++)
          (e = arguments[r]) &&
            (t = (function e(t) {
              var r,
                n,
                o = '';
              if ('string' == typeof t || 'number' == typeof t) o += t;
              else if ('object' == typeof t) {
                if (Array.isArray(t)) {
                  var l = t.length;
                  for (r = 0; r < l; r++) t[r] && (n = e(t[r])) && (o && (o += ' '), (o += n));
                } else for (n in t) t[n] && (o && (o += ' '), (o += n));
              }
              return o;
            })(e)) &&
            (n && (n += ' '), (n += t));
        return n;
      }
    },
    8090: function (e, t, r) {
      r.d(t, {
        Z: function () {
          return R;
        },
      });
      var n = r(9939),
        o = r(8422),
        l = r.t(o, 2),
        i = r(9056),
        a = l['use'.trim()],
        s = r(1060);
      function u(e) {
        return (
          ('object' == typeof e ? null == e.host && null == e.hostname : !/^[a-z]+:/i.test(e)) &&
          !(function (e) {
            let t = 'object' == typeof e ? e.pathname : e;
            return null != t && !t.startsWith('/');
          })(e)
        );
      }
      function c(e, t) {
        return e.replace(RegExp(`^${t}`), '') || '/';
      }
      function d(e, t) {
        return t === e || t.startsWith(`${e}/`);
      }
      function f(e, t, r) {
        return 'string' == typeof e ? e : e[t] || r;
      }
      function p(e) {
        let t = (function () {
            try {
              return 'true' === s.env._next_intl_trailing_slash;
            } catch {
              return !1;
            }
          })(),
          [r, ...n] = e.split('#'),
          o = n.join('#'),
          l = r;
        if ('/' !== l) {
          let e = l.endsWith('/');
          t && !e ? (l += '/') : !t && e && (l = l.slice(0, -1));
        }
        return (o && (l += '#' + o), l);
      }
      function h(e, t) {
        let r = p(e),
          n = p(t);
        return (function (e) {
          let t = e
            .replace(/\[\[(\.\.\.[^\]]+)\]\]/g, '?(.*)')
            .replace(/\[(\.\.\.[^\]]+)\]/g, '(.+)')
            .replace(/\[([^\]]+)\]/g, '([^/]+)');
          return RegExp(`^${t}$`);
        })(r).test(n);
      }
      function m(e, t) {
        return ('never' !== t.mode && t.prefixes?.[e]) || '/' + e;
      }
      function b(e) {
        return e.includes('[[...');
      }
      function g(e) {
        return e.includes('[...');
      }
      function y(e) {
        return e.includes('[');
      }
      function v(e, t) {
        let r = e.split('/'),
          n = t.split('/'),
          o = Math.max(r.length, n.length);
        for (let e = 0; e < o; e++) {
          let t = r[e],
            o = n[e];
          if (!t && o) return -1;
          if (t && !o) return 1;
          if (t || o) {
            if (!y(t) && y(o)) return -1;
            if (y(t) && !y(o)) return 1;
            if (!g(t) && g(o)) return -1;
            if (g(t) && !g(o)) return 1;
            if (!b(t) && b(o)) return -1;
            if (b(t) && !b(o)) return 1;
          }
        }
        return 0;
      }
      var x = r(5105);
      function w(e) {
        let t = new URLSearchParams();
        for (let [r, n] of Object.entries(e))
          Array.isArray(n)
            ? n.forEach((e) => {
                t.append(r, String(e));
              })
            : t.set(r, String(n));
        return '?' + t.toString();
      }
      function j(e, t, r, n) {
        if (!e || !(n !== r && null != n) || !t) return;
        let o = (function (e, t = window.location.pathname) {
            return '/' === e ? t : t.replace(e, '');
          })(t),
          { name: l, ...i } = e;
        i.path || (i.path = '' !== o ? o : '/');
        let a = `${l}=${n};`;
        for (let [e, t] of Object.entries(i))
          ((a += `${'maxAge' === e ? 'max-age' : e}`),
            'boolean' != typeof t && (a += '=' + t),
            (a += ';'));
        document.cookie = a;
      }
      var P = r(6501),
        k = (0, o.forwardRef)(function (e, t) {
          let { href: r, locale: o, localeCookie: l, onClick: a, prefetch: s, ...u } = e,
            c = (0, i.bU)(),
            d = null != o && o !== c,
            f = (0, n.usePathname)();
          return (
            d && (s = !1),
            (0, P.jsx)(x.default, {
              ref: t,
              href: r,
              hrefLang: d ? o : void 0,
              onClick: function (e) {
                (j(l, f, c, o), a && a(e));
              },
              prefetch: s,
              ...u,
            })
          );
        });
      function R(e) {
        let {
          Link: t,
          config: r,
          getPathname: l,
          ...s
        } = (function (e, t) {
          var r, l, i;
          let s = {
              ...(r = t || {}),
              localePrefix: 'object' == typeof (i = r.localePrefix) ? i : { mode: i || 'always' },
              localeCookie: !!((l = r.localeCookie) ?? 1) && {
                name: 'NEXT_LOCALE',
                sameSite: 'lax',
                ...('object' == typeof l && l),
              },
              localeDetection: r.localeDetection ?? !0,
              alternateLinks: r.alternateLinks ?? !0,
            },
            c = s.pathnames,
            d = (0, o.forwardRef)(function ({ href: t, locale: r, ...n }, o) {
              let l, i;
              'object' == typeof t ? ((l = t.pathname), (i = t.params)) : (l = t);
              let d = u(t),
                f = e(),
                p = 'function' == typeof f.then ? a(f) : f,
                m = d
                  ? h({
                      locale: r || p,
                      href: null == c ? l : { pathname: l, params: i },
                      forcePrefix: null != r || void 0,
                    })
                  : l;
              return (0, P.jsx)(k, {
                ref: o,
                href: 'object' == typeof t ? { ...t, pathname: m } : m,
                locale: r,
                localeCookie: s.localeCookie,
                ...n,
              });
            });
          function h(e) {
            let t;
            let { forcePrefix: r, href: n, locale: o } = e;
            return (
              null == c
                ? 'object' == typeof n
                  ? ((t = n.pathname), n.query && (t += w(n.query)))
                  : (t = n)
                : (t = (function ({ pathname: e, locale: t, params: r, pathnames: n, query: o }) {
                    function l(e) {
                      let l;
                      let i = n[e];
                      return (
                        i
                          ? ((l = f(i, t, e)),
                            r &&
                              Object.entries(r).forEach(([e, t]) => {
                                let r, n;
                                (Array.isArray(t)
                                  ? ((r = `(\\[)?\\[...${e}\\](\\])?`),
                                    (n = t.map((e) => String(e)).join('/')))
                                  : ((r = `\\[${e}\\]`), (n = String(t))),
                                  (l = l.replace(RegExp(r, 'g'), n)));
                              }),
                            (l = new URL((l = l.replace(/\[\[\.\.\..+\]\]/g, '')), 'http://l')
                              .pathname))
                          : (l = e),
                        (l = p(l)),
                        o && (l += w(o)),
                        l
                      );
                    }
                    if ('string' == typeof e) return l(e);
                    {
                      let { pathname: t, ...r } = e;
                      return { ...r, pathname: l(t) };
                    }
                  })({
                    locale: o,
                    ...('string' == typeof n ? { pathname: n } : n),
                    pathnames: s.pathnames,
                  })),
              (function (e, t, r, n) {
                var o, l;
                let i, a;
                let { mode: s } = r.localePrefix;
                return (
                  void 0 !== n
                    ? (i = n)
                    : u(e) &&
                      ('always' === s
                        ? (i = !0)
                        : 'as-needed' === s &&
                          (i = r.domains
                            ? !r.domains.some((e) => e.defaultLocale === t)
                            : t !== r.defaultLocale)),
                  i
                    ? ((o = m(t, r.localePrefix)),
                      (l = e),
                      (a = o),
                      /^\/(\?.*)?$/.test(l) && (l = l.slice(1)),
                      (a += l))
                    : e
                );
              })(t, o, s, r)
            );
          }
          function b(e) {
            return function (t, ...r) {
              return e(h(t), ...r);
            };
          }
          return {
            config: s,
            Link: d,
            redirect: b(n.redirect),
            permanentRedirect: b(n.permanentRedirect),
            getPathname: h,
          };
        })(i.bU, e);
        return {
          ...s,
          Link: t,
          usePathname: function () {
            let e = (function (e) {
                let t = (0, n.usePathname)(),
                  r = (0, i.bU)();
                return (0, o.useMemo)(() => {
                  if (!t) return t;
                  let n = t,
                    o = m(r, e.localePrefix);
                  if (d(o, t)) n = c(t, o);
                  else if ('never' !== e.localePrefix.mode && e.localePrefix.prefixes) {
                    let e = '/' + r;
                    d(e, t) && (n = c(t, e));
                  }
                  return n;
                }, [e.localePrefix, r, t]);
              })(r),
              t = (0, i.bU)();
            return (0, o.useMemo)(
              () =>
                e && r.pathnames
                  ? (function (e, t, r) {
                      let n = Object.keys(r).sort(v),
                        o = decodeURI(t);
                      for (let t of n) {
                        let n = r[t];
                        if ('string' == typeof n) {
                          if (h(n, o)) return t;
                        } else if (h(f(n, e, t), o)) return t;
                      }
                      return t;
                    })(t, e, r.pathnames)
                  : e,
              [t, e],
            );
          },
          useRouter: function () {
            let e = (0, n.useRouter)(),
              t = (0, i.bU)(),
              a = (0, n.usePathname)();
            return (0, o.useMemo)(() => {
              function n(e) {
                return function (n, o) {
                  let { locale: i, ...s } = o || {},
                    u = [l({ href: n, locale: i || t, forcePrefix: null != i || void 0 })];
                  (Object.keys(s).length > 0 && u.push(s), j(r.localeCookie, a, t, i), e(...u));
                };
              }
              return { ...e, push: n(e.push), replace: n(e.replace), prefetch: n(e.prefetch) };
            }, [t, a, e]);
          },
          getPathname: l,
        };
      }
    },
    1894: function (e, t, r) {
      r.d(t, {
        T_: function () {
          return l;
        },
      });
      var n = r(9056);
      function o(e, t) {
        return (...e) => {
          try {
            return t(...e);
          } catch {
            throw Error(void 0);
          }
        };
      }
      let l = o(0, n.T_);
      o(0, n.Gb);
    },
    2786: function (e, t, r) {
      r.d(t, {
        m6: function () {
          return Z;
        },
      });
      let n = (e) => {
          let t = a(e),
            { conflictingClassGroups: r, conflictingClassGroupModifiers: n } = e;
          return {
            getClassGroupId: (e) => {
              let r = e.split('-');
              return ('' === r[0] && 1 !== r.length && r.shift(), o(r, t) || i(e));
            },
            getConflictingClassGroupIds: (e, t) => {
              let o = r[e] || [];
              return t && n[e] ? [...o, ...n[e]] : o;
            },
          };
        },
        o = (e, t) => {
          if (0 === e.length) return t.classGroupId;
          let r = e[0],
            n = t.nextPart.get(r),
            l = n ? o(e.slice(1), n) : void 0;
          if (l) return l;
          if (0 === t.validators.length) return;
          let i = e.join('-');
          return t.validators.find(({ validator: e }) => e(i))?.classGroupId;
        },
        l = /^\[(.+)\]$/,
        i = (e) => {
          if (l.test(e)) {
            let t = l.exec(e)[1],
              r = t?.substring(0, t.indexOf(':'));
            if (r) return 'arbitrary..' + r;
          }
        },
        a = (e) => {
          let { theme: t, prefix: r } = e,
            n = { nextPart: new Map(), validators: [] };
          return (
            d(Object.entries(e.classGroups), r).forEach(([e, r]) => {
              s(r, n, e, t);
            }),
            n
          );
        },
        s = (e, t, r, n) => {
          e.forEach((e) => {
            if ('string' == typeof e) {
              ('' === e ? t : u(t, e)).classGroupId = r;
              return;
            }
            if ('function' == typeof e) {
              if (c(e)) {
                s(e(n), t, r, n);
                return;
              }
              t.validators.push({ validator: e, classGroupId: r });
              return;
            }
            Object.entries(e).forEach(([e, o]) => {
              s(o, u(t, e), r, n);
            });
          });
        },
        u = (e, t) => {
          let r = e;
          return (
            t.split('-').forEach((e) => {
              (r.nextPart.has(e) || r.nextPart.set(e, { nextPart: new Map(), validators: [] }),
                (r = r.nextPart.get(e)));
            }),
            r
          );
        },
        c = (e) => e.isThemeGetter,
        d = (e, t) =>
          t
            ? e.map(([e, r]) => [
                e,
                r.map((e) =>
                  'string' == typeof e
                    ? t + e
                    : 'object' == typeof e
                      ? Object.fromEntries(Object.entries(e).map(([e, r]) => [t + e, r]))
                      : e,
                ),
              ])
            : e,
        f = (e) => {
          if (e < 1) return { get: () => void 0, set: () => {} };
          let t = 0,
            r = new Map(),
            n = new Map(),
            o = (o, l) => {
              (r.set(o, l), ++t > e && ((t = 0), (n = r), (r = new Map())));
            };
          return {
            get(e) {
              let t = r.get(e);
              return void 0 !== t ? t : void 0 !== (t = n.get(e)) ? (o(e, t), t) : void 0;
            },
            set(e, t) {
              r.has(e) ? r.set(e, t) : o(e, t);
            },
          };
        },
        p = (e) => {
          let { separator: t, experimentalParseClassName: r } = e,
            n = 1 === t.length,
            o = t[0],
            l = t.length,
            i = (e) => {
              let r;
              let i = [],
                a = 0,
                s = 0;
              for (let u = 0; u < e.length; u++) {
                let c = e[u];
                if (0 === a) {
                  if (c === o && (n || e.slice(u, u + l) === t)) {
                    (i.push(e.slice(s, u)), (s = u + l));
                    continue;
                  }
                  if ('/' === c) {
                    r = u;
                    continue;
                  }
                }
                '[' === c ? a++ : ']' === c && a--;
              }
              let u = 0 === i.length ? e : e.substring(s),
                c = u.startsWith('!'),
                d = c ? u.substring(1) : u;
              return {
                modifiers: i,
                hasImportantModifier: c,
                baseClassName: d,
                maybePostfixModifierPosition: r && r > s ? r - s : void 0,
              };
            };
          return r ? (e) => r({ className: e, parseClassName: i }) : i;
        },
        h = (e) => {
          if (e.length <= 1) return e;
          let t = [],
            r = [];
          return (
            e.forEach((e) => {
              '[' === e[0] ? (t.push(...r.sort(), e), (r = [])) : r.push(e);
            }),
            t.push(...r.sort()),
            t
          );
        },
        m = (e) => ({ cache: f(e.cacheSize), parseClassName: p(e), ...n(e) }),
        b = /\s+/,
        g = (e, t) => {
          let { parseClassName: r, getClassGroupId: n, getConflictingClassGroupIds: o } = t,
            l = [],
            i = e.trim().split(b),
            a = '';
          for (let e = i.length - 1; e >= 0; e -= 1) {
            let t = i[e],
              {
                modifiers: s,
                hasImportantModifier: u,
                baseClassName: c,
                maybePostfixModifierPosition: d,
              } = r(t),
              f = !!d,
              p = n(f ? c.substring(0, d) : c);
            if (!p) {
              if (!f || !(p = n(c))) {
                a = t + (a.length > 0 ? ' ' + a : a);
                continue;
              }
              f = !1;
            }
            let m = h(s).join(':'),
              b = u ? m + '!' : m,
              g = b + p;
            if (l.includes(g)) continue;
            l.push(g);
            let y = o(p, f);
            for (let e = 0; e < y.length; ++e) {
              let t = y[e];
              l.push(b + t);
            }
            a = t + (a.length > 0 ? ' ' + a : a);
          }
          return a;
        };
      function y() {
        let e,
          t,
          r = 0,
          n = '';
        for (; r < arguments.length; )
          (e = arguments[r++]) && (t = v(e)) && (n && (n += ' '), (n += t));
        return n;
      }
      let v = (e) => {
          let t;
          if ('string' == typeof e) return e;
          let r = '';
          for (let n = 0; n < e.length; n++) e[n] && (t = v(e[n])) && (r && (r += ' '), (r += t));
          return r;
        },
        x = (e) => {
          let t = (t) => t[e] || [];
          return ((t.isThemeGetter = !0), t);
        },
        w = /^\[(?:([a-z-]+):)?(.+)\]$/i,
        j = /^\d+\/\d+$/,
        P = new Set(['px', 'full', 'screen']),
        k = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
        R =
          /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
        _ = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
        O = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
        S =
          /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
        E = (e) => N(e) || P.has(e) || j.test(e),
        C = (e) => K(e, 'length', F),
        N = (e) => !!e && !Number.isNaN(Number(e)),
        M = (e) => K(e, 'number', N),
        z = (e) => !!e && Number.isInteger(Number(e)),
        I = (e) => e.endsWith('%') && N(e.slice(0, -1)),
        L = (e) => w.test(e),
        A = (e) => k.test(e),
        U = new Set(['length', 'size', 'percentage']),
        T = (e) => K(e, U, V),
        W = (e) => K(e, 'position', V),
        $ = new Set(['image', 'url']),
        D = (e) => K(e, $, Y),
        q = (e) => K(e, '', B),
        G = () => !0,
        K = (e, t, r) => {
          let n = w.exec(e);
          return !!n && (n[1] ? ('string' == typeof t ? n[1] === t : t.has(n[1])) : r(n[2]));
        },
        F = (e) => R.test(e) && !_.test(e),
        V = () => !1,
        B = (e) => O.test(e),
        Y = (e) => S.test(e),
        Z = (function (e, ...t) {
          let r, n, o;
          let l = function (a) {
            return (
              (n = (r = m(t.reduce((e, t) => t(e), e()))).cache.get),
              (o = r.cache.set),
              (l = i),
              i(a)
            );
          };
          function i(e) {
            let t = n(e);
            if (t) return t;
            let l = g(e, r);
            return (o(e, l), l);
          }
          return function () {
            return l(y.apply(null, arguments));
          };
        })(() => {
          let e = x('colors'),
            t = x('spacing'),
            r = x('blur'),
            n = x('brightness'),
            o = x('borderColor'),
            l = x('borderRadius'),
            i = x('borderSpacing'),
            a = x('borderWidth'),
            s = x('contrast'),
            u = x('grayscale'),
            c = x('hueRotate'),
            d = x('invert'),
            f = x('gap'),
            p = x('gradientColorStops'),
            h = x('gradientColorStopPositions'),
            m = x('inset'),
            b = x('margin'),
            g = x('opacity'),
            y = x('padding'),
            v = x('saturate'),
            w = x('scale'),
            j = x('sepia'),
            P = x('skew'),
            k = x('space'),
            R = x('translate'),
            _ = () => ['auto', 'contain', 'none'],
            O = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
            S = () => ['auto', L, t],
            U = () => [L, t],
            $ = () => ['', E, C],
            K = () => ['auto', N, L],
            F = () => [
              'bottom',
              'center',
              'left',
              'left-bottom',
              'left-top',
              'right',
              'right-bottom',
              'right-top',
              'top',
            ],
            V = () => ['solid', 'dashed', 'dotted', 'double', 'none'],
            B = () => [
              'normal',
              'multiply',
              'screen',
              'overlay',
              'darken',
              'lighten',
              'color-dodge',
              'color-burn',
              'hard-light',
              'soft-light',
              'difference',
              'exclusion',
              'hue',
              'saturation',
              'color',
              'luminosity',
            ],
            Y = () => ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'],
            Z = () => ['', '0', L],
            Q = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'],
            H = () => [N, L];
          return {
            cacheSize: 500,
            separator: ':',
            theme: {
              colors: [G],
              spacing: [E, C],
              blur: ['none', '', A, L],
              brightness: H(),
              borderColor: [e],
              borderRadius: ['none', '', 'full', A, L],
              borderSpacing: U(),
              borderWidth: $(),
              contrast: H(),
              grayscale: Z(),
              hueRotate: H(),
              invert: Z(),
              gap: U(),
              gradientColorStops: [e],
              gradientColorStopPositions: [I, C],
              inset: S(),
              margin: S(),
              opacity: H(),
              padding: U(),
              saturate: H(),
              scale: H(),
              sepia: Z(),
              skew: H(),
              space: U(),
              translate: U(),
            },
            classGroups: {
              aspect: [{ aspect: ['auto', 'square', 'video', L] }],
              container: ['container'],
              columns: [{ columns: [A] }],
              'break-after': [{ 'break-after': Q() }],
              'break-before': [{ 'break-before': Q() }],
              'break-inside': [{ 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] }],
              'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
              box: [{ box: ['border', 'content'] }],
              display: [
                'block',
                'inline-block',
                'inline',
                'flex',
                'inline-flex',
                'table',
                'inline-table',
                'table-caption',
                'table-cell',
                'table-column',
                'table-column-group',
                'table-footer-group',
                'table-header-group',
                'table-row-group',
                'table-row',
                'flow-root',
                'grid',
                'inline-grid',
                'contents',
                'list-item',
                'hidden',
              ],
              float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
              clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
              isolation: ['isolate', 'isolation-auto'],
              'object-fit': [{ object: ['contain', 'cover', 'fill', 'none', 'scale-down'] }],
              'object-position': [{ object: [...F(), L] }],
              overflow: [{ overflow: O() }],
              'overflow-x': [{ 'overflow-x': O() }],
              'overflow-y': [{ 'overflow-y': O() }],
              overscroll: [{ overscroll: _() }],
              'overscroll-x': [{ 'overscroll-x': _() }],
              'overscroll-y': [{ 'overscroll-y': _() }],
              position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
              inset: [{ inset: [m] }],
              'inset-x': [{ 'inset-x': [m] }],
              'inset-y': [{ 'inset-y': [m] }],
              start: [{ start: [m] }],
              end: [{ end: [m] }],
              top: [{ top: [m] }],
              right: [{ right: [m] }],
              bottom: [{ bottom: [m] }],
              left: [{ left: [m] }],
              visibility: ['visible', 'invisible', 'collapse'],
              z: [{ z: ['auto', z, L] }],
              basis: [{ basis: S() }],
              'flex-direction': [{ flex: ['row', 'row-reverse', 'col', 'col-reverse'] }],
              'flex-wrap': [{ flex: ['wrap', 'wrap-reverse', 'nowrap'] }],
              flex: [{ flex: ['1', 'auto', 'initial', 'none', L] }],
              grow: [{ grow: Z() }],
              shrink: [{ shrink: Z() }],
              order: [{ order: ['first', 'last', 'none', z, L] }],
              'grid-cols': [{ 'grid-cols': [G] }],
              'col-start-end': [{ col: ['auto', { span: ['full', z, L] }, L] }],
              'col-start': [{ 'col-start': K() }],
              'col-end': [{ 'col-end': K() }],
              'grid-rows': [{ 'grid-rows': [G] }],
              'row-start-end': [{ row: ['auto', { span: [z, L] }, L] }],
              'row-start': [{ 'row-start': K() }],
              'row-end': [{ 'row-end': K() }],
              'grid-flow': [{ 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] }],
              'auto-cols': [{ 'auto-cols': ['auto', 'min', 'max', 'fr', L] }],
              'auto-rows': [{ 'auto-rows': ['auto', 'min', 'max', 'fr', L] }],
              gap: [{ gap: [f] }],
              'gap-x': [{ 'gap-x': [f] }],
              'gap-y': [{ 'gap-y': [f] }],
              'justify-content': [{ justify: ['normal', ...Y()] }],
              'justify-items': [{ 'justify-items': ['start', 'end', 'center', 'stretch'] }],
              'justify-self': [{ 'justify-self': ['auto', 'start', 'end', 'center', 'stretch'] }],
              'align-content': [{ content: ['normal', ...Y(), 'baseline'] }],
              'align-items': [{ items: ['start', 'end', 'center', 'baseline', 'stretch'] }],
              'align-self': [{ self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline'] }],
              'place-content': [{ 'place-content': [...Y(), 'baseline'] }],
              'place-items': [{ 'place-items': ['start', 'end', 'center', 'baseline', 'stretch'] }],
              'place-self': [{ 'place-self': ['auto', 'start', 'end', 'center', 'stretch'] }],
              p: [{ p: [y] }],
              px: [{ px: [y] }],
              py: [{ py: [y] }],
              ps: [{ ps: [y] }],
              pe: [{ pe: [y] }],
              pt: [{ pt: [y] }],
              pr: [{ pr: [y] }],
              pb: [{ pb: [y] }],
              pl: [{ pl: [y] }],
              m: [{ m: [b] }],
              mx: [{ mx: [b] }],
              my: [{ my: [b] }],
              ms: [{ ms: [b] }],
              me: [{ me: [b] }],
              mt: [{ mt: [b] }],
              mr: [{ mr: [b] }],
              mb: [{ mb: [b] }],
              ml: [{ ml: [b] }],
              'space-x': [{ 'space-x': [k] }],
              'space-x-reverse': ['space-x-reverse'],
              'space-y': [{ 'space-y': [k] }],
              'space-y-reverse': ['space-y-reverse'],
              w: [{ w: ['auto', 'min', 'max', 'fit', 'svw', 'lvw', 'dvw', L, t] }],
              'min-w': [{ 'min-w': [L, t, 'min', 'max', 'fit'] }],
              'max-w': [
                {
                  'max-w': [L, t, 'none', 'full', 'min', 'max', 'fit', 'prose', { screen: [A] }, A],
                },
              ],
              h: [{ h: [L, t, 'auto', 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
              'min-h': [{ 'min-h': [L, t, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
              'max-h': [{ 'max-h': [L, t, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
              size: [{ size: [L, t, 'auto', 'min', 'max', 'fit'] }],
              'font-size': [{ text: ['base', A, C] }],
              'font-smoothing': ['antialiased', 'subpixel-antialiased'],
              'font-style': ['italic', 'not-italic'],
              'font-weight': [
                {
                  font: [
                    'thin',
                    'extralight',
                    'light',
                    'normal',
                    'medium',
                    'semibold',
                    'bold',
                    'extrabold',
                    'black',
                    M,
                  ],
                },
              ],
              'font-family': [{ font: [G] }],
              'fvn-normal': ['normal-nums'],
              'fvn-ordinal': ['ordinal'],
              'fvn-slashed-zero': ['slashed-zero'],
              'fvn-figure': ['lining-nums', 'oldstyle-nums'],
              'fvn-spacing': ['proportional-nums', 'tabular-nums'],
              'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
              tracking: [
                { tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest', L] },
              ],
              'line-clamp': [{ 'line-clamp': ['none', N, M] }],
              leading: [{ leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', E, L] }],
              'list-image': [{ 'list-image': ['none', L] }],
              'list-style-type': [{ list: ['none', 'disc', 'decimal', L] }],
              'list-style-position': [{ list: ['inside', 'outside'] }],
              'placeholder-color': [{ placeholder: [e] }],
              'placeholder-opacity': [{ 'placeholder-opacity': [g] }],
              'text-alignment': [{ text: ['left', 'center', 'right', 'justify', 'start', 'end'] }],
              'text-color': [{ text: [e] }],
              'text-opacity': [{ 'text-opacity': [g] }],
              'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
              'text-decoration-style': [{ decoration: [...V(), 'wavy'] }],
              'text-decoration-thickness': [{ decoration: ['auto', 'from-font', E, C] }],
              'underline-offset': [{ 'underline-offset': ['auto', E, L] }],
              'text-decoration-color': [{ decoration: [e] }],
              'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
              'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
              'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
              indent: [{ indent: U() }],
              'vertical-align': [
                {
                  align: [
                    'baseline',
                    'top',
                    'middle',
                    'bottom',
                    'text-top',
                    'text-bottom',
                    'sub',
                    'super',
                    L,
                  ],
                },
              ],
              whitespace: [
                { whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces'] },
              ],
              break: [{ break: ['normal', 'words', 'all', 'keep'] }],
              hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
              content: [{ content: ['none', L] }],
              'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
              'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
              'bg-opacity': [{ 'bg-opacity': [g] }],
              'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
              'bg-position': [{ bg: [...F(), W] }],
              'bg-repeat': [{ bg: ['no-repeat', { repeat: ['', 'x', 'y', 'round', 'space'] }] }],
              'bg-size': [{ bg: ['auto', 'cover', 'contain', T] }],
              'bg-image': [
                {
                  bg: ['none', { 'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] }, D],
                },
              ],
              'bg-color': [{ bg: [e] }],
              'gradient-from-pos': [{ from: [h] }],
              'gradient-via-pos': [{ via: [h] }],
              'gradient-to-pos': [{ to: [h] }],
              'gradient-from': [{ from: [p] }],
              'gradient-via': [{ via: [p] }],
              'gradient-to': [{ to: [p] }],
              rounded: [{ rounded: [l] }],
              'rounded-s': [{ 'rounded-s': [l] }],
              'rounded-e': [{ 'rounded-e': [l] }],
              'rounded-t': [{ 'rounded-t': [l] }],
              'rounded-r': [{ 'rounded-r': [l] }],
              'rounded-b': [{ 'rounded-b': [l] }],
              'rounded-l': [{ 'rounded-l': [l] }],
              'rounded-ss': [{ 'rounded-ss': [l] }],
              'rounded-se': [{ 'rounded-se': [l] }],
              'rounded-ee': [{ 'rounded-ee': [l] }],
              'rounded-es': [{ 'rounded-es': [l] }],
              'rounded-tl': [{ 'rounded-tl': [l] }],
              'rounded-tr': [{ 'rounded-tr': [l] }],
              'rounded-br': [{ 'rounded-br': [l] }],
              'rounded-bl': [{ 'rounded-bl': [l] }],
              'border-w': [{ border: [a] }],
              'border-w-x': [{ 'border-x': [a] }],
              'border-w-y': [{ 'border-y': [a] }],
              'border-w-s': [{ 'border-s': [a] }],
              'border-w-e': [{ 'border-e': [a] }],
              'border-w-t': [{ 'border-t': [a] }],
              'border-w-r': [{ 'border-r': [a] }],
              'border-w-b': [{ 'border-b': [a] }],
              'border-w-l': [{ 'border-l': [a] }],
              'border-opacity': [{ 'border-opacity': [g] }],
              'border-style': [{ border: [...V(), 'hidden'] }],
              'divide-x': [{ 'divide-x': [a] }],
              'divide-x-reverse': ['divide-x-reverse'],
              'divide-y': [{ 'divide-y': [a] }],
              'divide-y-reverse': ['divide-y-reverse'],
              'divide-opacity': [{ 'divide-opacity': [g] }],
              'divide-style': [{ divide: V() }],
              'border-color': [{ border: [o] }],
              'border-color-x': [{ 'border-x': [o] }],
              'border-color-y': [{ 'border-y': [o] }],
              'border-color-s': [{ 'border-s': [o] }],
              'border-color-e': [{ 'border-e': [o] }],
              'border-color-t': [{ 'border-t': [o] }],
              'border-color-r': [{ 'border-r': [o] }],
              'border-color-b': [{ 'border-b': [o] }],
              'border-color-l': [{ 'border-l': [o] }],
              'divide-color': [{ divide: [o] }],
              'outline-style': [{ outline: ['', ...V()] }],
              'outline-offset': [{ 'outline-offset': [E, L] }],
              'outline-w': [{ outline: [E, C] }],
              'outline-color': [{ outline: [e] }],
              'ring-w': [{ ring: $() }],
              'ring-w-inset': ['ring-inset'],
              'ring-color': [{ ring: [e] }],
              'ring-opacity': [{ 'ring-opacity': [g] }],
              'ring-offset-w': [{ 'ring-offset': [E, C] }],
              'ring-offset-color': [{ 'ring-offset': [e] }],
              shadow: [{ shadow: ['', 'inner', 'none', A, q] }],
              'shadow-color': [{ shadow: [G] }],
              opacity: [{ opacity: [g] }],
              'mix-blend': [{ 'mix-blend': [...B(), 'plus-lighter', 'plus-darker'] }],
              'bg-blend': [{ 'bg-blend': B() }],
              filter: [{ filter: ['', 'none'] }],
              blur: [{ blur: [r] }],
              brightness: [{ brightness: [n] }],
              contrast: [{ contrast: [s] }],
              'drop-shadow': [{ 'drop-shadow': ['', 'none', A, L] }],
              grayscale: [{ grayscale: [u] }],
              'hue-rotate': [{ 'hue-rotate': [c] }],
              invert: [{ invert: [d] }],
              saturate: [{ saturate: [v] }],
              sepia: [{ sepia: [j] }],
              'backdrop-filter': [{ 'backdrop-filter': ['', 'none'] }],
              'backdrop-blur': [{ 'backdrop-blur': [r] }],
              'backdrop-brightness': [{ 'backdrop-brightness': [n] }],
              'backdrop-contrast': [{ 'backdrop-contrast': [s] }],
              'backdrop-grayscale': [{ 'backdrop-grayscale': [u] }],
              'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [c] }],
              'backdrop-invert': [{ 'backdrop-invert': [d] }],
              'backdrop-opacity': [{ 'backdrop-opacity': [g] }],
              'backdrop-saturate': [{ 'backdrop-saturate': [v] }],
              'backdrop-sepia': [{ 'backdrop-sepia': [j] }],
              'border-collapse': [{ border: ['collapse', 'separate'] }],
              'border-spacing': [{ 'border-spacing': [i] }],
              'border-spacing-x': [{ 'border-spacing-x': [i] }],
              'border-spacing-y': [{ 'border-spacing-y': [i] }],
              'table-layout': [{ table: ['auto', 'fixed'] }],
              caption: [{ caption: ['top', 'bottom'] }],
              transition: [
                { transition: ['none', 'all', '', 'colors', 'opacity', 'shadow', 'transform', L] },
              ],
              duration: [{ duration: H() }],
              ease: [{ ease: ['linear', 'in', 'out', 'in-out', L] }],
              delay: [{ delay: H() }],
              animate: [{ animate: ['none', 'spin', 'ping', 'pulse', 'bounce', L] }],
              transform: [{ transform: ['', 'gpu', 'none'] }],
              scale: [{ scale: [w] }],
              'scale-x': [{ 'scale-x': [w] }],
              'scale-y': [{ 'scale-y': [w] }],
              rotate: [{ rotate: [z, L] }],
              'translate-x': [{ 'translate-x': [R] }],
              'translate-y': [{ 'translate-y': [R] }],
              'skew-x': [{ 'skew-x': [P] }],
              'skew-y': [{ 'skew-y': [P] }],
              'transform-origin': [
                {
                  origin: [
                    'center',
                    'top',
                    'top-right',
                    'right',
                    'bottom-right',
                    'bottom',
                    'bottom-left',
                    'left',
                    'top-left',
                    L,
                  ],
                },
              ],
              accent: [{ accent: ['auto', e] }],
              appearance: [{ appearance: ['none', 'auto'] }],
              cursor: [
                {
                  cursor: [
                    'auto',
                    'default',
                    'pointer',
                    'wait',
                    'text',
                    'move',
                    'help',
                    'not-allowed',
                    'none',
                    'context-menu',
                    'progress',
                    'cell',
                    'crosshair',
                    'vertical-text',
                    'alias',
                    'copy',
                    'no-drop',
                    'grab',
                    'grabbing',
                    'all-scroll',
                    'col-resize',
                    'row-resize',
                    'n-resize',
                    'e-resize',
                    's-resize',
                    'w-resize',
                    'ne-resize',
                    'nw-resize',
                    'se-resize',
                    'sw-resize',
                    'ew-resize',
                    'ns-resize',
                    'nesw-resize',
                    'nwse-resize',
                    'zoom-in',
                    'zoom-out',
                    L,
                  ],
                },
              ],
              'caret-color': [{ caret: [e] }],
              'pointer-events': [{ 'pointer-events': ['none', 'auto'] }],
              resize: [{ resize: ['none', 'y', 'x', ''] }],
              'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
              'scroll-m': [{ 'scroll-m': U() }],
              'scroll-mx': [{ 'scroll-mx': U() }],
              'scroll-my': [{ 'scroll-my': U() }],
              'scroll-ms': [{ 'scroll-ms': U() }],
              'scroll-me': [{ 'scroll-me': U() }],
              'scroll-mt': [{ 'scroll-mt': U() }],
              'scroll-mr': [{ 'scroll-mr': U() }],
              'scroll-mb': [{ 'scroll-mb': U() }],
              'scroll-ml': [{ 'scroll-ml': U() }],
              'scroll-p': [{ 'scroll-p': U() }],
              'scroll-px': [{ 'scroll-px': U() }],
              'scroll-py': [{ 'scroll-py': U() }],
              'scroll-ps': [{ 'scroll-ps': U() }],
              'scroll-pe': [{ 'scroll-pe': U() }],
              'scroll-pt': [{ 'scroll-pt': U() }],
              'scroll-pr': [{ 'scroll-pr': U() }],
              'scroll-pb': [{ 'scroll-pb': U() }],
              'scroll-pl': [{ 'scroll-pl': U() }],
              'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
              'snap-stop': [{ snap: ['normal', 'always'] }],
              'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
              'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
              touch: [{ touch: ['auto', 'none', 'manipulation'] }],
              'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
              'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
              'touch-pz': ['touch-pinch-zoom'],
              select: [{ select: ['none', 'text', 'all', 'auto'] }],
              'will-change': [{ 'will-change': ['auto', 'scroll', 'contents', 'transform', L] }],
              fill: [{ fill: [e, 'none'] }],
              'stroke-w': [{ stroke: [E, C, M] }],
              stroke: [{ stroke: [e, 'none'] }],
              sr: ['sr-only', 'not-sr-only'],
              'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }],
            },
            conflictingClassGroups: {
              overflow: ['overflow-x', 'overflow-y'],
              overscroll: ['overscroll-x', 'overscroll-y'],
              inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
              'inset-x': ['right', 'left'],
              'inset-y': ['top', 'bottom'],
              flex: ['basis', 'grow', 'shrink'],
              gap: ['gap-x', 'gap-y'],
              p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
              px: ['pr', 'pl'],
              py: ['pt', 'pb'],
              m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
              mx: ['mr', 'ml'],
              my: ['mt', 'mb'],
              size: ['w', 'h'],
              'font-size': ['leading'],
              'fvn-normal': [
                'fvn-ordinal',
                'fvn-slashed-zero',
                'fvn-figure',
                'fvn-spacing',
                'fvn-fraction',
              ],
              'fvn-ordinal': ['fvn-normal'],
              'fvn-slashed-zero': ['fvn-normal'],
              'fvn-figure': ['fvn-normal'],
              'fvn-spacing': ['fvn-normal'],
              'fvn-fraction': ['fvn-normal'],
              'line-clamp': ['display', 'overflow'],
              rounded: [
                'rounded-s',
                'rounded-e',
                'rounded-t',
                'rounded-r',
                'rounded-b',
                'rounded-l',
                'rounded-ss',
                'rounded-se',
                'rounded-ee',
                'rounded-es',
                'rounded-tl',
                'rounded-tr',
                'rounded-br',
                'rounded-bl',
              ],
              'rounded-s': ['rounded-ss', 'rounded-es'],
              'rounded-e': ['rounded-se', 'rounded-ee'],
              'rounded-t': ['rounded-tl', 'rounded-tr'],
              'rounded-r': ['rounded-tr', 'rounded-br'],
              'rounded-b': ['rounded-br', 'rounded-bl'],
              'rounded-l': ['rounded-tl', 'rounded-bl'],
              'border-spacing': ['border-spacing-x', 'border-spacing-y'],
              'border-w': [
                'border-w-s',
                'border-w-e',
                'border-w-t',
                'border-w-r',
                'border-w-b',
                'border-w-l',
              ],
              'border-w-x': ['border-w-r', 'border-w-l'],
              'border-w-y': ['border-w-t', 'border-w-b'],
              'border-color': [
                'border-color-s',
                'border-color-e',
                'border-color-t',
                'border-color-r',
                'border-color-b',
                'border-color-l',
              ],
              'border-color-x': ['border-color-r', 'border-color-l'],
              'border-color-y': ['border-color-t', 'border-color-b'],
              'scroll-m': [
                'scroll-mx',
                'scroll-my',
                'scroll-ms',
                'scroll-me',
                'scroll-mt',
                'scroll-mr',
                'scroll-mb',
                'scroll-ml',
              ],
              'scroll-mx': ['scroll-mr', 'scroll-ml'],
              'scroll-my': ['scroll-mt', 'scroll-mb'],
              'scroll-p': [
                'scroll-px',
                'scroll-py',
                'scroll-ps',
                'scroll-pe',
                'scroll-pt',
                'scroll-pr',
                'scroll-pb',
                'scroll-pl',
              ],
              'scroll-px': ['scroll-pr', 'scroll-pl'],
              'scroll-py': ['scroll-pt', 'scroll-pb'],
              touch: ['touch-x', 'touch-y', 'touch-pz'],
              'touch-x': ['touch'],
              'touch-y': ['touch'],
              'touch-pz': ['touch'],
            },
            conflictingClassGroupModifiers: { 'font-size': ['leading'] },
          };
        });
    },
  },
]);
