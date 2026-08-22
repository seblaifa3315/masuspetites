"use strict";
var __dsPreview = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <define:import.meta.env>
  var init_define_import_meta_env = __esm({
    "<define:import.meta.env>"() {
    }
  });

  // ds-raw:__ds_raw__
  var require_ds_raw = __commonJS({
    "ds-raw:__ds_raw__"(exports, module) {
      init_define_import_meta_env();
      module.exports = window.MasusPetites;
    }
  });

  // shim:react-shim
  var require_react_shim = __commonJS({
    "shim:react-shim"(exports, module) {
      init_define_import_meta_env();
      var R = window.React;
      function np(p, k) {
        var o = {};
        for (var x in p) if (x !== "children") o[x] = p[x];
        if (k !== void 0) o.key = k;
        return o;
      }
      function jsx2(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx2;
      module.exports.jsxs = jsxs;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs : jsx2)(t, p, k);
      };
      module.exports.Fragment = R.Fragment;
    }
  });

  // .design-sync/previews/ProductCard.tsx
  var ProductCard_exports = {};
  __export(ProductCard_exports, {
    NoImage: () => NoImage,
    WithImage: () => WithImage
  });
  init_define_import_meta_env();

  // ds-shim:ds
  var ds_exports = {};
  __export(ds_exports, {
    default: () => ds_default
  });
  init_define_import_meta_env();
  __reExport(ds_exports, __toESM(require_ds_raw()));
  var g = window.MasusPetites;
  var ds_default = "default" in g ? g.default : g;

  // .design-sync/previews/_placeholder-image.ts
  init_define_import_meta_env();
  function svg(stroke) {
    const markup = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750">
    <rect width="600" height="750" fill="#161616"/>
    <g fill="none" stroke="${stroke}" stroke-width="1.5" opacity="0.8">
      <circle cx="300" cy="330" r="140"/>
      <path d="M180 330 Q300 180 420 330 Q300 480 180 330 Z"/>
      <path d="M300 190 L300 470"/>
      <path d="M160 330 L440 330"/>
    </g>
  </svg>`;
    return `data:image/svg+xml,${encodeURIComponent(markup)}`;
  }
  var PLACEHOLDER_IMAGE = svg("#EC4899");
  var PLACEHOLDER_IMAGE_MUTED = svg("#737373");

  // .design-sync/previews/ProductCard.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var WithImage = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-64", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ds_exports.ProductCard,
    {
      id: "prod-1",
      name: "Serpent & Rose",
      slug: "serpent-and-rose",
      imageUrl: PLACEHOLDER_IMAGE,
      priceCents: 4800,
      variantId: "var-1",
      aspectRatio: "3/4"
    }
  ) });
  var NoImage = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-64", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ds_exports.ProductCard,
    {
      id: "prod-2",
      name: "Anchor Study",
      slug: "anchor-study",
      imageUrl: null,
      priceCents: 3600,
      variantId: "var-2",
      aspectRatio: "3/4"
    }
  ) });
  return __toCommonJS(ProductCard_exports);
})();
