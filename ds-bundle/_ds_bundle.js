/* @ds-bundle: {"namespace":"MasusPetites","components":[{"name":"About","sourcePath":"components/storefront/About/About.jsx"},{"name":"CartContent","sourcePath":"components/cart/CartContent/CartContent.jsx"},{"name":"Contact","sourcePath":"components/storefront/Contact/Contact.jsx"},{"name":"Faq","sourcePath":"components/storefront/Faq/Faq.jsx"},{"name":"Footer","sourcePath":"components/storefront/Footer/Footer.jsx"},{"name":"Hero","sourcePath":"components/storefront/Hero/Hero.jsx"},{"name":"InstagramIcon","sourcePath":"components/storefront/InstagramIcon/InstagramIcon.jsx"},{"name":"Navbar","sourcePath":"components/storefront/Navbar/Navbar.jsx"},{"name":"ProductCard","sourcePath":"components/storefront/ProductCard/ProductCard.jsx"},{"name":"ProductDetail","sourcePath":"components/storefront/ProductDetail/ProductDetail.jsx"},{"name":"ProductGrid","sourcePath":"components/storefront/ProductGrid/ProductGrid.jsx"},{"name":"SuccessContent","sourcePath":"components/cart/SuccessContent/SuccessContent.jsx"},{"name":"TattooCarousel","sourcePath":"components/storefront/TattooCarousel/TattooCarousel.jsx"},{"name":"TikTokIcon","sourcePath":"components/storefront/TikTokIcon/TikTokIcon.jsx"},{"name":"XIcon","sourcePath":"components/storefront/XIcon/XIcon.jsx"}],"sourceHashes":{"components/storefront/About/About.jsx":"a4c63165780e","components/storefront/About/About.d.ts":"5e91493d804f","components/storefront/About/About.prompt.md":"160c3f317e03","components/cart/CartContent/CartContent.jsx":"e761b60b9a0b","components/cart/CartContent/CartContent.d.ts":"7fb9eda1884b","components/cart/CartContent/CartContent.prompt.md":"4397fe3e53c7","components/storefront/Contact/Contact.jsx":"b7ab541b2f27","components/storefront/Contact/Contact.d.ts":"409e01fcf7b3","components/storefront/Contact/Contact.prompt.md":"4aaccaf8a900","components/storefront/Faq/Faq.jsx":"51d58514e8a3","components/storefront/Faq/Faq.d.ts":"a943275ad0d4","components/storefront/Faq/Faq.prompt.md":"6846174ca9ce","components/storefront/Footer/Footer.jsx":"46cc180580db","components/storefront/Footer/Footer.d.ts":"4dfd04a9cc70","components/storefront/Footer/Footer.prompt.md":"1c98e474fead","components/storefront/Hero/Hero.jsx":"27eaf1e9c8ed","components/storefront/Hero/Hero.d.ts":"27e6f292f608","components/storefront/Hero/Hero.prompt.md":"ec93ff1cb710","components/storefront/InstagramIcon/InstagramIcon.jsx":"96c34227eb0a","components/storefront/InstagramIcon/InstagramIcon.d.ts":"b51f33cc43c2","components/storefront/InstagramIcon/InstagramIcon.prompt.md":"9b7534920ac7","components/storefront/Navbar/Navbar.jsx":"85b48d62644d","components/storefront/Navbar/Navbar.d.ts":"82f231831c02","components/storefront/Navbar/Navbar.prompt.md":"0ce74559c274","components/storefront/ProductCard/ProductCard.jsx":"721b49e55114","components/storefront/ProductCard/ProductCard.d.ts":"7fa71b4f3b59","components/storefront/ProductCard/ProductCard.prompt.md":"91f7cdb70d7d","components/storefront/ProductDetail/ProductDetail.jsx":"58c2d4cc466e","components/storefront/ProductDetail/ProductDetail.d.ts":"cf1a42657832","components/storefront/ProductDetail/ProductDetail.prompt.md":"3d0e0fdc4b32","components/storefront/ProductGrid/ProductGrid.jsx":"481608f4f1c0","components/storefront/ProductGrid/ProductGrid.d.ts":"7db4e03dff11","components/storefront/ProductGrid/ProductGrid.prompt.md":"18fd2af87f49","components/cart/SuccessContent/SuccessContent.jsx":"973a1da02d7e","components/cart/SuccessContent/SuccessContent.d.ts":"c3fcccdc1f12","components/cart/SuccessContent/SuccessContent.prompt.md":"f44daeaa2708","components/storefront/TattooCarousel/TattooCarousel.jsx":"9f53e26da6d1","components/storefront/TattooCarousel/TattooCarousel.d.ts":"2b4a761b0fde","components/storefront/TattooCarousel/TattooCarousel.prompt.md":"1e7c755c2535","components/storefront/TikTokIcon/TikTokIcon.jsx":"66b0ef8df19a","components/storefront/TikTokIcon/TikTokIcon.d.ts":"6be8fb49f8a3","components/storefront/TikTokIcon/TikTokIcon.prompt.md":"abe4eab602d7","components/storefront/XIcon/XIcon.jsx":"70dffc8689c9","components/storefront/XIcon/XIcon.d.ts":"01bd37007296","components/storefront/XIcon/XIcon.prompt.md":"2d79d90639dd"},"inlinedExternals":["lucide-react","zustand"],"builtBy":"cc-design-sync"} */
"use strict";
var MasusPetites = (() => {
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
      function jsx(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx;
      module.exports.jsxs = jsxs;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs : jsx)(t, p, k);
      };
      module.exports.Fragment = R.Fragment;
    }
  });

  // .design-sync/synth-src/entry.mjs
  var entry_exports = {};
  __export(entry_exports, {
    About: () => About,
    CartContent: () => CartContent,
    Contact: () => Contact,
    Faq: () => FAQ,
    Footer: () => Footer,
    Hero: () => Hero,
    InstagramIcon: () => InstagramIcon,
    Navbar: () => Navbar,
    ProductCard: () => ProductCard,
    ProductDetail: () => ProductDetail,
    ProductGrid: () => ProductGrid,
    SuccessContent: () => SuccessContent,
    TattooCarousel: () => TattooCarousel,
    TikTokIcon: () => TikTokIcon,
    XIcon: () => XIcon
  });
  init_define_import_meta_env();

  // src/components/storefront/about.tsx
  init_define_import_meta_env();

  // .design-sync/shims/next-image.tsx
  init_define_import_meta_env();
  var React2 = __toESM(require_react_shim());
  function Image({
    src,
    alt,
    fill,
    width,
    height,
    className,
    style,
    priority,
    sizes,
    ...rest
  }) {
    void priority;
    void sizes;
    const fillStyle = fill ? { position: "absolute", inset: 0, width: "100%", height: "100%" } : {};
    return /* @__PURE__ */ React2.createElement(
      "img",
      {
        src,
        alt,
        width: fill ? void 0 : width,
        height: fill ? void 0 : height,
        className,
        style: { ...fillStyle, ...style },
        ...rest
      }
    );
  }

  // .design-sync/shims/node-fs.tsx
  init_define_import_meta_env();
  if (typeof globalThis.process === "undefined") {
    globalThis.process = {
      cwd: () => "",
      env: {}
    };
  }
  var FILES = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg"
  ];
  function existsSync() {
    return true;
  }
  function readdirSync() {
    return FILES;
  }
  var node_fs_default = { existsSync, readdirSync };

  // .design-sync/shims/node-path.tsx
  init_define_import_meta_env();
  function join(...parts) {
    return parts.join("/");
  }
  var node_path_default = { join };

  // src/components/storefront/tattoo-carousel.tsx
  init_define_import_meta_env();
  var import_react4 = __toESM(require_react_shim());

  // node_modules/lucide-react/dist/esm/lucide-react.mjs
  init_define_import_meta_env();

  // node_modules/lucide-react/dist/esm/createLucideIcon.mjs
  init_define_import_meta_env();
  var import_react3 = __toESM(require_react_shim(), 1);

  // node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
  init_define_import_meta_env();
  var mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
  }).join(" ").trim();

  // node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
  init_define_import_meta_env();
  var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

  // node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
  init_define_import_meta_env();

  // node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
  init_define_import_meta_env();
  var toCamelCase = (string) => string.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
  );

  // node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
  var toPascalCase = (string) => {
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  };

  // node_modules/lucide-react/dist/esm/Icon.mjs
  init_define_import_meta_env();
  var import_react2 = __toESM(require_react_shim(), 1);

  // node_modules/lucide-react/dist/esm/defaultAttributes.mjs
  init_define_import_meta_env();
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  // node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
  init_define_import_meta_env();
  var hasA11yProp = (props) => {
    for (const prop in props) {
      if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
        return true;
      }
    }
    return false;
  };

  // node_modules/lucide-react/dist/esm/context.mjs
  init_define_import_meta_env();
  var import_react = __toESM(require_react_shim(), 1);
  var LucideContext = (0, import_react.createContext)({});
  var useLucideContext = () => (0, import_react.useContext)(LucideContext);

  // node_modules/lucide-react/dist/esm/Icon.mjs
  var Icon = (0, import_react2.forwardRef)(
    ({ color, size, strokeWidth, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => {
      const {
        size: contextSize = 24,
        strokeWidth: contextStrokeWidth = 2,
        absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
        color: contextColor = "currentColor",
        className: contextClass = ""
      } = useLucideContext() ?? {};
      const calculatedStrokeWidth = absoluteStrokeWidth ?? contextAbsoluteStrokeWidth ? Number(strokeWidth ?? contextStrokeWidth) * 24 / Number(size ?? contextSize) : strokeWidth ?? contextStrokeWidth;
      return (0, import_react2.createElement)(
        "svg",
        {
          ref,
          ...defaultAttributes,
          width: size ?? contextSize ?? defaultAttributes.width,
          height: size ?? contextSize ?? defaultAttributes.height,
          stroke: color ?? contextColor,
          strokeWidth: calculatedStrokeWidth,
          className: mergeClasses("lucide", contextClass, className),
          ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
          ...rest
        },
        [
          ...iconNode.map(([tag, attrs]) => (0, import_react2.createElement)(tag, attrs)),
          ...Array.isArray(children) ? children : [children]
        ]
      );
    }
  );

  // node_modules/lucide-react/dist/esm/createLucideIcon.mjs
  var createLucideIcon = (iconName, iconNode) => {
    const Component = (0, import_react3.forwardRef)(
      ({ className, ...props }, ref) => (0, import_react3.createElement)(Icon, {
        ref,
        iconNode,
        className: mergeClasses(
          `lucide-${toKebabCase(toPascalCase(iconName))}`,
          `lucide-${iconName}`,
          className
        ),
        ...props
      })
    );
    Component.displayName = toPascalCase(iconName);
    return Component;
  };

  // node_modules/lucide-react/dist/esm/icons/arrow-left.mjs
  init_define_import_meta_env();
  var __iconNode = [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ];
  var ArrowLeft = createLucideIcon("arrow-left", __iconNode);

  // node_modules/lucide-react/dist/esm/icons/check.mjs
  init_define_import_meta_env();
  var __iconNode2 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
  var Check = createLucideIcon("check", __iconNode2);

  // node_modules/lucide-react/dist/esm/icons/chevron-down.mjs
  init_define_import_meta_env();
  var __iconNode3 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
  var ChevronDown = createLucideIcon("chevron-down", __iconNode3);

  // node_modules/lucide-react/dist/esm/icons/chevron-left.mjs
  init_define_import_meta_env();
  var __iconNode4 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
  var ChevronLeft = createLucideIcon("chevron-left", __iconNode4);

  // node_modules/lucide-react/dist/esm/icons/chevron-right.mjs
  init_define_import_meta_env();
  var __iconNode5 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
  var ChevronRight = createLucideIcon("chevron-right", __iconNode5);

  // node_modules/lucide-react/dist/esm/icons/circle-check-big.mjs
  init_define_import_meta_env();
  var __iconNode6 = [
    ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
    ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
  ];
  var CircleCheckBig = createLucideIcon("circle-check-big", __iconNode6);

  // node_modules/lucide-react/dist/esm/icons/loader-circle.mjs
  init_define_import_meta_env();
  var __iconNode7 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
  var LoaderCircle = createLucideIcon("loader-circle", __iconNode7);

  // node_modules/lucide-react/dist/esm/icons/mail.mjs
  init_define_import_meta_env();
  var __iconNode8 = [
    ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
    ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
  ];
  var Mail = createLucideIcon("mail", __iconNode8);

  // node_modules/lucide-react/dist/esm/icons/menu.mjs
  init_define_import_meta_env();
  var __iconNode9 = [
    ["path", { d: "M4 5h16", key: "1tepv9" }],
    ["path", { d: "M4 12h16", key: "1lakjw" }],
    ["path", { d: "M4 19h16", key: "1djgab" }]
  ];
  var Menu = createLucideIcon("menu", __iconNode9);

  // node_modules/lucide-react/dist/esm/icons/minus.mjs
  init_define_import_meta_env();
  var __iconNode10 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
  var Minus = createLucideIcon("minus", __iconNode10);

  // node_modules/lucide-react/dist/esm/icons/plus.mjs
  init_define_import_meta_env();
  var __iconNode11 = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ];
  var Plus = createLucideIcon("plus", __iconNode11);

  // node_modules/lucide-react/dist/esm/icons/send.mjs
  init_define_import_meta_env();
  var __iconNode12 = [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3"
      }
    ],
    ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
  ];
  var Send = createLucideIcon("send", __iconNode12);

  // node_modules/lucide-react/dist/esm/icons/shopping-bag.mjs
  init_define_import_meta_env();
  var __iconNode13 = [
    ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }],
    ["path", { d: "M3.103 6.034h17.794", key: "awc11p" }],
    [
      "path",
      {
        d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
        key: "o988cm"
      }
    ]
  ];
  var ShoppingBag = createLucideIcon("shopping-bag", __iconNode13);

  // node_modules/lucide-react/dist/esm/icons/trash-2.mjs
  init_define_import_meta_env();
  var __iconNode14 = [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
  ];
  var Trash2 = createLucideIcon("trash-2", __iconNode14);

  // node_modules/lucide-react/dist/esm/icons/x.mjs
  init_define_import_meta_env();
  var __iconNode15 = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ];
  var X = createLucideIcon("x", __iconNode15);

  // src/components/storefront/tattoo-carousel.tsx
  function TattooCarousel({ images }) {
    const [offset, setOffset] = (0, import_react4.useState)(0);
    const maxVisible = Math.min(3, images.length);
    const maxOffset = Math.max(0, images.length - maxVisible);
    const next = (0, import_react4.useCallback)(() => {
      setOffset((o) => o >= maxOffset ? 0 : o + 1);
    }, [maxOffset]);
    const prev = (0, import_react4.useCallback)(() => {
      setOffset((o) => o <= 0 ? maxOffset : o - 1);
    }, [maxOffset]);
    if (images.length === 0) return null;
    const visibleImages = images.slice(offset, offset + maxVisible);
    if (visibleImages.length < maxVisible) {
      visibleImages.push(...images.slice(0, maxVisible - visibleImages.length));
    }
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginTop: "2rem"
        }
      },
      images.length > maxVisible && /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: prev,
          className: "text-muted hover:text-foreground transition-colors cursor-pointer",
          "aria-label": "Previous",
          style: { flexShrink: 0 }
        },
        /* @__PURE__ */ React.createElement(ChevronLeft, { className: "w-5 h-5" })
      ),
      /* @__PURE__ */ React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: "0.75rem",
            overflow: "hidden"
          }
        },
        visibleImages.map((src, i) => /* @__PURE__ */ React.createElement(
          "div",
          {
            key: `${src}-${i}`,
            style: {
              width: "10rem",
              height: "10rem",
              borderRadius: "0.75rem",
              overflow: "hidden",
              flexShrink: 0
            }
          },
          /* @__PURE__ */ React.createElement(
            "img",
            {
              src,
              alt: "Tattoo work",
              width: 112,
              height: 112,
              style: {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block"
              }
            }
          )
        ))
      ),
      images.length > maxVisible && /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: next,
          className: "text-muted hover:text-foreground transition-colors cursor-pointer",
          "aria-label": "Next",
          style: { flexShrink: 0 }
        },
        /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-5 h-5" })
      )
    );
  }

  // src/components/storefront/about.tsx
  function getTattooWorks() {
    const dir = node_path_default.join(process.cwd(), "public", "tatoo-works");
    if (!node_fs_default.existsSync(dir)) return [];
    return node_fs_default.readdirSync(dir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f)).sort().map((f) => `/tatoo-works/${f}`);
  }
  function pickRandom(arr, count) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
  function About() {
    const tattooWorks = getTattooWorks();
    const bgImages = pickRandom(tattooWorks, 3);
    return /* @__PURE__ */ React.createElement(
      "section",
      {
        id: "about",
        className: "scroll-mt-20 py-20 px-4 sm:px-6 lg:px-8",
        style: { position: "relative", overflow: "hidden", background: "var(--surface)" }
      },
      bgImages.length > 0 && /* @__PURE__ */ React.createElement(
        "div",
        {
          style: {
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            opacity: 0.06,
            pointerEvents: "none"
          },
          "aria-hidden": "true"
        },
        bgImages.map((src) => /* @__PURE__ */ React.createElement(
          "img",
          {
            key: src,
            src,
            alt: "",
            style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }
          }
        ))
      ),
      /* @__PURE__ */ React.createElement("div", { style: { position: "relative" }, className: "max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center" }, /* @__PURE__ */ React.createElement("div", { className: "relative aspect-square rounded-2xl overflow-hidden bg-background" }, /* @__PURE__ */ React.createElement(
        Image,
        {
          src: "/portrait.jpg",
          alt: "The artist",
          fill: true,
          className: "object-cover",
          sizes: "(max-width: 768px) 100vw, 50vw"
        }
      )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "font-heading text-3xl md:text-4xl  mb-6" }, "About the Artist"), /* @__PURE__ */ React.createElement("div", { className: "space-y-4 text-muted leading-relaxed" }, /* @__PURE__ */ React.createElement("p", null, "With years of experience in the tattoo industry, every design starts as a hand-drawn piece of art. Each print captures the raw energy and detail of original tattoo artwork."), /* @__PURE__ */ React.createElement("p", null, "These prints bring tattoo art off the skin and onto your walls \u2014 bold lines, intricate details, and designs that tell a story."), /* @__PURE__ */ React.createElement("p", null, "Every piece is printed on premium archival paper to ensure lasting quality and vivid detail.")), /* @__PURE__ */ React.createElement(TattooCarousel, { images: tattooWorks })))
    );
  }

  // src/components/storefront/contact.tsx
  init_define_import_meta_env();
  var import_react5 = __toESM(require_react_shim());

  // src/components/storefront/icons.tsx
  init_define_import_meta_env();
  function InstagramIcon({ className }) {
    return /* @__PURE__ */ React.createElement(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className,
        "aria-hidden": "true"
      },
      /* @__PURE__ */ React.createElement("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5", ry: "5" }),
      /* @__PURE__ */ React.createElement("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
      /* @__PURE__ */ React.createElement("line", { x1: "17.5", y1: "6.5", x2: "17.51", y2: "6.5" })
    );
  }
  function TikTokIcon({ className }) {
    return /* @__PURE__ */ React.createElement(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "currentColor",
        className,
        "aria-hidden": "true"
      },
      /* @__PURE__ */ React.createElement("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.18 8.18 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.13z" })
    );
  }
  function XIcon({ className }) {
    return /* @__PURE__ */ React.createElement(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "currentColor",
        className,
        "aria-hidden": "true"
      },
      /* @__PURE__ */ React.createElement("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
    );
  }

  // .design-sync/shims/app-actions.tsx
  init_define_import_meta_env();
  async function submitContactForm(_prevState, _formData) {
    return { success: true };
  }

  // src/components/storefront/contact.tsx
  var socials = [
    { label: "Instagram", href: "https://instagram.com/", icon: InstagramIcon },
    { label: "TikTok", href: "https://tiktok.com/@", icon: TikTokIcon },
    { label: "X", href: "https://x.com/", icon: XIcon }
  ];
  function Contact() {
    const [state, formAction, pending] = (0, import_react5.useActionState)(submitContactForm, null);
    return /* @__PURE__ */ React.createElement("section", { id: "contact", className: "scroll-mt-20 bg-surface py-20 px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("h2", { className: "font-heading text-3xl md:text-4xl text-center mb-12" }, "Get in Touch"), /* @__PURE__ */ React.createElement("div", { className: "grid md:grid-cols-2 gap-12 max-w-4xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-heading text-lg mb-2" }, "Email"), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "mailto:hello@masuspetites.com",
        className: "inline-flex items-center gap-2 text-muted hover:text-accent transition-colors"
      },
      /* @__PURE__ */ React.createElement(Mail, { className: "w-4 h-4" }),
      "hello@masuspetites.com"
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-heading text-lg mb-3" }, "Follow Us"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, socials.map((s) => /* @__PURE__ */ React.createElement(
      "a",
      {
        key: s.label,
        href: s.href,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "p-2 rounded-lg bg-background hover:bg-accent hover:text-white text-muted transition-colors",
        "aria-label": s.label
      },
      /* @__PURE__ */ React.createElement(s.icon, { className: "w-5 h-5" })
    ))))), /* @__PURE__ */ React.createElement("form", { action: formAction, className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { htmlFor: "name", className: "block text-sm font-medium mb-1" }, "Name"), /* @__PURE__ */ React.createElement(
      "input",
      {
        id: "name",
        name: "name",
        type: "text",
        required: true,
        className: "w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent text-sm",
        placeholder: "Your name"
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { htmlFor: "email", className: "block text-sm font-medium mb-1" }, "Email"), /* @__PURE__ */ React.createElement(
      "input",
      {
        id: "email",
        name: "email",
        type: "email",
        required: true,
        className: "w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent text-sm",
        placeholder: "you@example.com"
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { htmlFor: "message", className: "block text-sm font-medium mb-1" }, "Message"), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        id: "message",
        name: "message",
        required: true,
        rows: 4,
        className: "w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent text-sm resize-none",
        placeholder: "Your message..."
      }
    )), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "submit",
        disabled: pending,
        className: "inline-flex items-center gap-2 px-6 py-2.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors disabled:opacity-50 text-sm"
      },
      /* @__PURE__ */ React.createElement(Send, { className: "w-4 h-4" }),
      pending ? "Sending..." : "Send Message"
    ), state?.success && /* @__PURE__ */ React.createElement("p", { className: "text-green-400 text-sm" }, "Message sent! We'll get back to you soon."), state?.error && /* @__PURE__ */ React.createElement("p", { className: "text-red-400 text-sm" }, state.error)))));
  }

  // src/components/storefront/faq.tsx
  init_define_import_meta_env();
  var import_react6 = __toESM(require_react_shim());
  var faqs = [
    {
      question: "What paper are the prints on?",
      answer: "All prints are produced on premium 300gsm archival matte paper with a smooth finish, ensuring vibrant colors and lasting quality."
    },
    {
      question: "How long does shipping take?",
      answer: "Orders are typically processed within 2\u20133 business days. Standard shipping takes 5\u20137 business days. Express options are available at checkout."
    },
    {
      question: "Do you accept returns?",
      answer: "We accept returns within 14 days of delivery for unused, undamaged prints in their original packaging. Contact us to start a return."
    },
    {
      question: "Do you take custom orders?",
      answer: "Yes! Reach out through the contact form below with your idea and we'll discuss options, sizing, and pricing."
    }
  ];
  function FAQItem({
    faq,
    isOpen,
    onToggle
  }) {
    const contentRef = (0, import_react6.useRef)(null);
    const [height, setHeight] = (0, import_react6.useState)(0);
    (0, import_react6.useEffect)(() => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    }, [isOpen]);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          borderLeft: isOpen ? "2px solid var(--accent)" : "2px solid transparent",
          transition: "border-color 0.2s"
        },
        className: "border border-border rounded-lg overflow-hidden"
      },
      /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: onToggle,
          className: "w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium hover:bg-surface/50 transition-colors cursor-pointer"
        },
        faq.question,
        /* @__PURE__ */ React.createElement(
          ChevronDown,
          {
            className: `w-4 h-4 text-muted shrink-0 ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`
          }
        )
      ),
      /* @__PURE__ */ React.createElement(
        "div",
        {
          style: {
            height: isOpen ? height : 0,
            overflow: "hidden",
            transition: "height 0.25s ease"
          }
        },
        /* @__PURE__ */ React.createElement("div", { ref: contentRef, className: "px-5 pb-4 text-sm text-muted leading-relaxed" }, faq.answer)
      )
    );
  }
  function FAQ() {
    const [openIndex, setOpenIndex] = (0, import_react6.useState)(null);
    return /* @__PURE__ */ React.createElement("section", { id: "faq", className: "scroll-mt-20 py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto" }, /* @__PURE__ */ React.createElement("h2", { className: "font-heading text-3xl md:text-4xl text-center mb-12" }, "Frequently Asked Questions"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, faqs.map((faq, i) => /* @__PURE__ */ React.createElement(
      FAQItem,
      {
        key: i,
        faq,
        isOpen: openIndex === i,
        onToggle: () => setOpenIndex(openIndex === i ? null : i)
      }
    ))));
  }

  // src/components/storefront/footer.tsx
  init_define_import_meta_env();

  // .design-sync/shims/next-link.tsx
  init_define_import_meta_env();
  var React3 = __toESM(require_react_shim());
  function Link({ href, children, ...rest }) {
    return /* @__PURE__ */ React3.createElement("a", { href, ...rest }, children);
  }

  // src/components/storefront/footer.tsx
  var quickLinks = [
    { label: "Shop", href: "/#collection" },
    { label: "About", href: "/#about" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" }
  ];
  var socials2 = [
    { label: "Instagram", href: "https://instagram.com/", icon: InstagramIcon },
    { label: "TikTok", href: "https://tiktok.com/@", icon: TikTokIcon },
    { label: "X", href: "https://x.com/", icon: XIcon }
  ];
  function Footer() {
    return /* @__PURE__ */ React.createElement("footer", { className: "border-t border-border py-12 px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto grid sm:grid-cols-3 gap-8" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Link, { href: "/", className: "font-heading text-lg font-semibold" }, "Masus Petites"), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-sm text-muted leading-relaxed" }, "Original tattoo art prints \u2014 designed by hand, made for your walls.")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "font-heading text-sm font-semibold mb-3" }, "Quick Links"), /* @__PURE__ */ React.createElement("ul", { className: "space-y-2" }, quickLinks.map((link) => /* @__PURE__ */ React.createElement("li", { key: link.href }, /* @__PURE__ */ React.createElement(
      "a",
      {
        href: link.href,
        className: "text-sm text-muted hover:text-foreground transition-colors"
      },
      link.label
    ))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "font-heading text-sm font-semibold mb-3" }, "Follow Us"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, socials2.map((s) => /* @__PURE__ */ React.createElement(
      "a",
      {
        key: s.label,
        href: s.href,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "p-2 rounded-lg bg-surface hover:bg-accent hover:text-white text-muted transition-colors",
        "aria-label": s.label
      },
      /* @__PURE__ */ React.createElement(s.icon, { className: "w-5 h-5" })
    ))))), /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto mt-8 pt-6 border-t border-border text-center text-xs text-muted" }, "\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " Masus Petites. All rights reserved."));
  }

  // src/components/storefront/hero.tsx
  init_define_import_meta_env();
  function Hero() {
    return /* @__PURE__ */ React.createElement("section", { className: "relative h-[80vh] min-h-150 flex items-center justify-center overflow-hidden bg-linear-to-br from-background via-surface to-background" }, /* @__PURE__ */ React.createElement(
      Image,
      {
        src: "/hero.png",
        alt: "Tattoo art prints",
        fill: true,
        priority: true,
        className: "object-cover"
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-black/75" }), /* @__PURE__ */ React.createElement("div", { className: "relative z-10 text-center px-4 max-w-3xl mx-auto" }, /* @__PURE__ */ React.createElement(
      "h1",
      {
        className: "font-heading text-5xl md:text-7xl font-thin tracking-tight mb-6",
        style: { animation: "breathe 5s ease-in-out infinite, flicker 3s step-end infinite" }
      },
      "Art That Lives",
      /* @__PURE__ */ React.createElement("br", null),
      /* @__PURE__ */ React.createElement("span", { className: "text-accent" }, "Beyond the Skin")
    ), /* @__PURE__ */ React.createElement("p", { className: "text-lg md:text-xl text-foreground/80 mb-8 max-w-xl mx-auto" }, "Original tattoo art prints \u2014 designed by hand, made for your walls."), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "#collection",
        className: "inline-flex px-8 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-all duration-300 text-lg hero-glow-btn"
      },
      "Shop the Collection"
    )));
  }

  // src/components/storefront/navbar.tsx
  init_define_import_meta_env();
  var import_react8 = __toESM(require_react_shim());

  // .design-sync/shims/next-navigation.tsx
  init_define_import_meta_env();
  function useRouter() {
    return {
      push: () => {
      },
      replace: () => {
      },
      back: () => {
      },
      forward: () => {
      },
      refresh: () => {
      },
      prefetch: () => {
      }
    };
  }

  // src/lib/store/cart.ts
  init_define_import_meta_env();

  // node_modules/zustand/esm/vanilla.mjs
  init_define_import_meta_env();
  var createStoreImpl = (createState) => {
    let state;
    const listeners = /* @__PURE__ */ new Set();
    const setState = (partial, replace) => {
      const nextState = typeof partial === "function" ? partial(state) : partial;
      if (!Object.is(nextState, state)) {
        const previousState = state;
        state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
        listeners.forEach((listener) => listener(state, previousState));
      }
    };
    const getState = () => state;
    const getInitialState = () => initialState;
    const subscribe = (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    };
    const api = { setState, getState, getInitialState, subscribe };
    const initialState = state = createState(setState, getState, api);
    return api;
  };
  var createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);

  // node_modules/zustand/esm/react.mjs
  init_define_import_meta_env();
  var import_react7 = __toESM(require_react_shim(), 1);
  var identity = (arg) => arg;
  function useStore(api, selector = identity) {
    const slice = import_react7.default.useSyncExternalStore(
      api.subscribe,
      import_react7.default.useCallback(() => selector(api.getState()), [api, selector]),
      import_react7.default.useCallback(() => selector(api.getInitialState()), [api, selector])
    );
    import_react7.default.useDebugValue(slice);
    return slice;
  }
  var createImpl = (createState) => {
    const api = createStore(createState);
    const useBoundStore = (selector) => useStore(api, selector);
    Object.assign(useBoundStore, api);
    return useBoundStore;
  };
  var create = ((createState) => createState ? createImpl(createState) : createImpl);

  // node_modules/zustand/esm/middleware.mjs
  init_define_import_meta_env();
  function createJSONStorage(getStorage, options) {
    let storage;
    try {
      storage = getStorage();
    } catch (e) {
      return;
    }
    const persistStorage = {
      getItem: (name) => {
        var _a;
        const parse = (str2) => {
          if (str2 === null) {
            return null;
          }
          return JSON.parse(str2, options == null ? void 0 : options.reviver);
        };
        const str = (_a = storage.getItem(name)) != null ? _a : null;
        if (str instanceof Promise) {
          return str.then(parse);
        }
        return parse(str);
      },
      setItem: (name, newValue) => storage.setItem(name, JSON.stringify(newValue, options == null ? void 0 : options.replacer)),
      removeItem: (name) => storage.removeItem(name)
    };
    return persistStorage;
  }
  var toThenable = (fn) => (input) => {
    try {
      const result = fn(input);
      if (result instanceof Promise) {
        return result;
      }
      return {
        then(onFulfilled) {
          return toThenable(onFulfilled)(result);
        },
        catch(_onRejected) {
          return this;
        }
      };
    } catch (e) {
      return {
        then(_onFulfilled) {
          return this;
        },
        catch(onRejected) {
          return toThenable(onRejected)(e);
        }
      };
    }
  };
  var persistImpl = (config, baseOptions) => (set, get, api) => {
    let options = {
      storage: createJSONStorage(() => window.localStorage),
      partialize: (state) => state,
      version: 0,
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState
      }),
      ...baseOptions
    };
    let hasHydrated = false;
    let hydrationVersion = 0;
    const hydrationListeners = /* @__PURE__ */ new Set();
    const finishHydrationListeners = /* @__PURE__ */ new Set();
    let storage = options.storage;
    if (!storage) {
      return config(
        (...args) => {
          console.warn(
            `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
          );
          set(...args);
        },
        get,
        api
      );
    }
    const setItem = () => {
      const state = options.partialize({ ...get() });
      return storage.setItem(options.name, {
        state,
        version: options.version
      });
    };
    const savedSetState = api.setState;
    api.setState = (state, replace) => {
      savedSetState(state, replace);
      return setItem();
    };
    const configResult = config(
      (...args) => {
        set(...args);
        return setItem();
      },
      get,
      api
    );
    api.getInitialState = () => configResult;
    let stateFromStorage;
    const hydrate = () => {
      var _a, _b;
      if (!storage) return;
      const currentVersion = ++hydrationVersion;
      hasHydrated = false;
      hydrationListeners.forEach((cb) => {
        var _a2;
        return cb((_a2 = get()) != null ? _a2 : configResult);
      });
      const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
      return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
        if (deserializedStorageValue) {
          if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
            if (options.migrate) {
              const migration = options.migrate(
                deserializedStorageValue.state,
                deserializedStorageValue.version
              );
              if (migration instanceof Promise) {
                return migration.then((result) => [true, result]);
              }
              return [true, migration];
            }
            console.error(
              `State loaded from storage couldn't be migrated since no migrate function was provided`
            );
          } else {
            return [false, deserializedStorageValue.state];
          }
        }
        return [false, void 0];
      }).then((migrationResult) => {
        var _a2;
        if (currentVersion !== hydrationVersion) {
          return;
        }
        const [migrated, migratedState] = migrationResult;
        stateFromStorage = options.merge(
          migratedState,
          (_a2 = get()) != null ? _a2 : configResult
        );
        set(stateFromStorage, true);
        if (migrated) {
          return setItem();
        }
      }).then(() => {
        if (currentVersion !== hydrationVersion) {
          return;
        }
        postRehydrationCallback == null ? void 0 : postRehydrationCallback(get(), void 0);
        stateFromStorage = get();
        hasHydrated = true;
        finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
      }).catch((e) => {
        if (currentVersion !== hydrationVersion) {
          return;
        }
        postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
      });
    };
    api.persist = {
      setOptions: (newOptions) => {
        options = {
          ...options,
          ...newOptions
        };
        if (newOptions.storage) {
          storage = newOptions.storage;
        }
      },
      clearStorage: () => {
        storage == null ? void 0 : storage.removeItem(options.name);
      },
      getOptions: () => options,
      rehydrate: () => hydrate(),
      hasHydrated: () => hasHydrated,
      onHydrate: (cb) => {
        hydrationListeners.add(cb);
        return () => {
          hydrationListeners.delete(cb);
        };
      },
      onFinishHydration: (cb) => {
        finishHydrationListeners.add(cb);
        return () => {
          finishHydrationListeners.delete(cb);
        };
      }
    };
    if (!options.skipHydration) {
      hydrate();
    }
    return stateFromStorage || configResult;
  };
  var persist = persistImpl;

  // src/lib/store/cart.ts
  var useCartStore = create()(
    persist(
      (set) => ({
        items: [],
        addItem: (item) => set((state) => {
          const existing = state.items.find(
            (i) => i.variantId === item.variantId
          );
          if (existing) {
            return {
              items: state.items.map(
                (i) => i.variantId === item.variantId ? { ...i, quantity: i.quantity + 1 } : i
              )
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
        removeItem: (variantId) => set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId)
        })),
        updateQuantity: (variantId, quantity) => set((state) => ({
          items: quantity <= 0 ? state.items.filter((i) => i.variantId !== variantId) : state.items.map(
            (i) => i.variantId === variantId ? { ...i, quantity } : i
          )
        })),
        clearCart: () => set({ items: [] })
      }),
      { name: "cart-storage" }
    )
  );

  // src/components/storefront/navbar.tsx
  var navLinks = [
    { label: "Shop", href: "#collection" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" }
  ];
  function Navbar() {
    const [mobileOpen, setMobileOpen] = (0, import_react8.useState)(false);
    const [mounted, setMounted] = (0, import_react8.useState)(false);
    const router = useRouter();
    const itemCount = useCartStore(
      (s) => s.items.reduce((sum, i) => sum + i.quantity, 0)
    );
    (0, import_react8.useEffect)(() => setMounted(true), []);
    function navigateTo(hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/${hash}`);
      }
    }
    return /* @__PURE__ */ React.createElement("nav", { className: "sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between h-16" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          if (window.location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            router.push("/");
          }
        },
        className: "font-heading text-xl font-bold tracking-tight cursor-pointer"
      },
      "Masus Petites"
    ), /* @__PURE__ */ React.createElement("div", { className: "hidden md:flex items-center gap-8" }, navLinks.map((link) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: link.href,
        onClick: () => navigateTo(link.href),
        className: "text-sm text-muted hover:text-foreground transition-colors cursor-pointer"
      },
      link.label
    ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(Link, { href: "/cart", className: "relative p-2 text-muted hover:text-foreground transition-colors" }, /* @__PURE__ */ React.createElement(ShoppingBag, { className: "w-5 h-5" }), mounted && itemCount > 0 && /* @__PURE__ */ React.createElement("span", { className: "absolute -top-0.5 -right-0.5 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center" }, itemCount)), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => navigateTo("#collection"),
        className: "hidden sm:inline-flex px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
      },
      "Shop Now"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setMobileOpen(!mobileOpen),
        className: "md:hidden p-2 text-muted hover:text-foreground transition-colors",
        "aria-label": "Toggle menu"
      },
      mobileOpen ? /* @__PURE__ */ React.createElement(X, { className: "w-5 h-5" }) : /* @__PURE__ */ React.createElement(Menu, { className: "w-5 h-5" })
    )))), mobileOpen && /* @__PURE__ */ React.createElement("div", { className: "md:hidden border-t border-border bg-background/95 backdrop-blur-md" }, /* @__PURE__ */ React.createElement("div", { className: "px-4 py-4 flex flex-col gap-3" }, navLinks.map((link) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: link.href,
        onClick: () => {
          navigateTo(link.href);
          setMobileOpen(false);
        },
        className: "text-left text-sm text-muted hover:text-foreground transition-colors py-2"
      },
      link.label
    )))));
  }

  // src/components/storefront/product-card.tsx
  init_define_import_meta_env();
  var import_react9 = __toESM(require_react_shim());
  function ProductCard({
    id,
    name,
    slug,
    imageUrl,
    priceCents,
    variantId,
    aspectRatio = "3/4"
  }) {
    const addItem = useCartStore((s) => s.addItem);
    const [added, setAdded] = (0, import_react9.useState)(false);
    const cardRef = (0, import_react9.useRef)(null);
    const [transform, setTransform] = (0, import_react9.useState)("");
    const [glareStyle, setGlareStyle] = (0, import_react9.useState)({ opacity: 0, x: 50, y: 50 });
    const handleMouseMove = (0, import_react9.useCallback)((e) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (y - 0.5) * -12;
      const rotateY = (x - 0.5) * 12;
      setTransform(`perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`);
      setGlareStyle({ opacity: 0.15, x: x * 100, y: y * 100 });
    }, []);
    const handleMouseLeave = (0, import_react9.useCallback)(() => {
      setTransform("");
      setGlareStyle({ opacity: 0, x: 50, y: 50 });
    }, []);
    function handleAdd(e) {
      e.preventDefault();
      addItem({
        productId: id,
        variantId,
        name,
        slug,
        imageUrl,
        priceCents
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
    const price = (priceCents / 100).toFixed(2);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        ref: cardRef,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        className: "group will-change-transform transition-transform duration-200 ease-out",
        style: { transform }
      },
      /* @__PURE__ */ React.createElement(
        Link,
        {
          href: `/product/${slug}`,
          className: "relative overflow-hidden rounded-lg bg-surface block",
          style: { aspectRatio }
        },
        imageUrl ? /* @__PURE__ */ React.createElement(
          Image,
          {
            src: imageUrl,
            alt: name,
            fill: true,
            className: "object-cover",
            sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          }
        ) : /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex items-center justify-center text-muted" }, "No image"),
        /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "absolute inset-0 pointer-events-none transition-opacity duration-200",
            style: {
              opacity: glareStyle.opacity,
              background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(255,255,255,0.5) 0%, transparent 60%)`
            }
          }
        ),
        /* @__PURE__ */ React.createElement("div", { className: "absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" }),
        /* @__PURE__ */ React.createElement("div", { className: "absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "min-w-0" }, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-medium text-white line-clamp-1" }, name), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-white/70" }, "$", price)), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: handleAdd,
            disabled: added,
            className: `shrink-0 p-2.5 rounded-full translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer ${added ? "bg-green-600 text-white" : "bg-accent hover:bg-accent-hover text-white"}`,
            "aria-label": added ? "Added to cart" : "Add to cart"
          },
          added ? /* @__PURE__ */ React.createElement(Check, { className: "w-4 h-4" }) : /* @__PURE__ */ React.createElement(ShoppingBag, { className: "w-4 h-4" })
        ))
      )
    );
  }

  // src/components/storefront/product-detail.tsx
  init_define_import_meta_env();
  var import_react10 = __toESM(require_react_shim());
  function ProductDetail({ product }) {
    const addItem = useCartStore((s) => s.addItem);
    const [quantity, setQuantity] = (0, import_react10.useState)(1);
    const [added, setAdded] = (0, import_react10.useState)(false);
    const imgRef = (0, import_react10.useRef)(null);
    const [objectPosition, setObjectPosition] = (0, import_react10.useState)("center");
    const [isZoomed, setIsZoomed] = (0, import_react10.useState)(false);
    const [isDesktop, setIsDesktop] = (0, import_react10.useState)(false);
    (0, import_react10.useEffect)(() => {
      const mq = window.matchMedia("(min-width: 768px)");
      setIsDesktop(mq.matches);
      const handler = (e) => setIsDesktop(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }, []);
    const variant = product.variants[0];
    const price = variant ? (variant.priceCents / 100).toFixed(2) : "0.00";
    const handleMouseMove = (0, import_react10.useCallback)((e) => {
      const container = imgRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 100;
      const y = (e.clientY - rect.top) / rect.height * 100;
      setObjectPosition(`${x}% ${y}%`);
    }, []);
    function handleAdd() {
      if (!variant) return;
      for (let i = 0; i < quantity; i++) {
        addItem({
          productId: product.id,
          variantId: variant.id,
          name: product.name,
          slug: product.slug,
          imageUrl: product.imageUrl,
          priceCents: variant.priceCents
        });
      }
      setAdded(true);
      setQuantity(1);
      setTimeout(() => setAdded(false), 1500);
    }
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          gap: isDesktop ? "3rem" : "2rem",
          maxWidth: "64rem",
          marginLeft: "auto",
          marginRight: "auto"
        }
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          ref: imgRef,
          style: {
            width: isDesktop ? "28rem" : "18rem",
            flexShrink: 0,
            marginLeft: isDesktop ? 0 : "auto",
            marginRight: isDesktop ? 0 : "auto",
            borderRadius: "0.5rem",
            overflow: "hidden",
            cursor: "zoom-in"
          },
          onMouseMove: handleMouseMove,
          onMouseEnter: () => setIsZoomed(true),
          onMouseLeave: () => {
            setIsZoomed(false);
            setObjectPosition("center");
          }
        },
        product.imageUrl ? /* @__PURE__ */ React.createElement(
          "img",
          {
            src: product.imageUrl,
            alt: product.name,
            width: 448,
            height: 597,
            style: {
              display: "block",
              width: "100%",
              height: "auto",
              objectFit: "cover",
              transition: "transform 0.3s",
              transformOrigin: "center",
              transform: isZoomed ? "scale(1.5)" : "scale(1)",
              objectPosition
            }
          }
        ) : /* @__PURE__ */ React.createElement("div", { className: "aspect-[3/4] flex items-center justify-center text-muted" }, "No image")
      ),
      /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "1.5rem" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "font-heading text-3xl lg:text-4xl font-bold" }, product.name), /* @__PURE__ */ React.createElement("p", { className: "mt-2 text-2xl text-accent font-semibold" }, "$", price)), product.description && /* @__PURE__ */ React.createElement("p", { className: "text-muted leading-relaxed" }, product.description), variant && /* @__PURE__ */ React.createElement("div", { className: "text-sm flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-muted" }, "Size:"), /* @__PURE__ */ React.createElement("span", { className: "text-foreground font-medium" }, variant.sizeLabel, " \u2014 ", variant.dimensions)), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm text-muted" }, "Quantity"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center border border-border rounded-lg" }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setQuantity((q) => Math.max(1, q - 1)),
          className: "p-2 text-muted hover:text-foreground transition-colors cursor-pointer",
          "aria-label": "Decrease quantity"
        },
        /* @__PURE__ */ React.createElement(Minus, { className: "w-4 h-4" })
      ), /* @__PURE__ */ React.createElement("span", { className: "w-10 text-center text-sm font-medium" }, quantity), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setQuantity((q) => Math.min(10, q + 1)),
          className: "p-2 text-muted hover:text-foreground transition-colors cursor-pointer",
          "aria-label": "Increase quantity"
        },
        /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4" })
      ))), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: handleAdd,
          disabled: added || !variant,
          className: `hero-glow-btn w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-white font-medium transition-all cursor-pointer ${added ? "bg-green-600" : "bg-accent hover:bg-accent-hover"}`
        },
        added ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Check, { className: "w-5 h-5" }), "Added!") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ShoppingBag, { className: "w-5 h-5" }), "Add to Cart")
      ))
    );
  }

  // src/components/storefront/product-grid.tsx
  init_define_import_meta_env();
  var aspectRatios = ["3/4", "4/5", "2/3", "1/1", "3/5"];
  function ProductGrid({ products }) {
    return /* @__PURE__ */ React.createElement("section", { id: "collection", className: "scroll-mt-20 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("h2", { className: "font-heading text-3xl md:text-4xl text-center mb-12" }, "Our Collection"), products.length === 0 ? /* @__PURE__ */ React.createElement("p", { className: "text-center text-muted text-lg" }, "No products available yet. Check back soon!") : /* @__PURE__ */ React.createElement("div", { className: "columns-[220px] gap-12 [column-fill:balance]" }, products.map((product, i) => /* @__PURE__ */ React.createElement("div", { key: product.id, className: "mb-12 break-inside-avoid" }, /* @__PURE__ */ React.createElement(
      ProductCard,
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        imageUrl: product.imageUrl,
        priceCents: product.variants[0]?.priceCents ?? 0,
        variantId: product.variants[0]?.id ?? "",
        aspectRatio: aspectRatios[i % aspectRatios.length]
      }
    )))));
  }

  // src/components/cart/cart-content.tsx
  init_define_import_meta_env();
  var import_react11 = __toESM(require_react_shim());

  // .design-sync/shims/cart-actions.tsx
  init_define_import_meta_env();
  async function createCheckoutSession(_items) {
    return;
  }

  // src/components/cart/cart-content.tsx
  function CartContent() {
    const [mounted, setMounted] = (0, import_react11.useState)(false);
    const [isDesktop, setIsDesktop] = (0, import_react11.useState)(false);
    const [isWide, setIsWide] = (0, import_react11.useState)(false);
    const [pending, startTransition] = (0, import_react11.useTransition)();
    const items = useCartStore((s) => s.items);
    const removeItem = useCartStore((s) => s.removeItem);
    const updateQuantity = useCartStore((s) => s.updateQuantity);
    (0, import_react11.useEffect)(() => {
      setMounted(true);
      const lgMq = window.matchMedia("(min-width: 1024px)");
      const smMq = window.matchMedia("(min-width: 640px)");
      setIsDesktop(lgMq.matches);
      setIsWide(smMq.matches);
      const lgHandler = (e) => setIsDesktop(e.matches);
      const smHandler = (e) => setIsWide(e.matches);
      lgMq.addEventListener("change", lgHandler);
      smMq.addEventListener("change", smHandler);
      return () => {
        lgMq.removeEventListener("change", lgHandler);
        smMq.removeEventListener("change", smHandler);
      };
    }, []);
    if (!mounted) {
      return null;
    }
    const subtotalCents = items.reduce(
      (sum, item) => sum + item.priceCents * item.quantity,
      0
    );
    if (items.length === 0) {
      return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center justify-center py-24 text-center" }, /* @__PURE__ */ React.createElement(ShoppingBag, { className: "w-16 h-16 text-muted mb-4" }), /* @__PURE__ */ React.createElement("h2", { className: "font-heading text-2xl font-bold mb-2" }, "Your cart is empty"), /* @__PURE__ */ React.createElement("p", { className: "text-muted mb-6" }, "Looks like you haven't added any prints yet."), /* @__PURE__ */ React.createElement(
        Link,
        {
          href: "/#collection",
          className: "inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors"
        },
        "Continue Shopping"
      ));
    }
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", { className: "font-heading text-3xl font-bold", style: { marginBottom: "1.5rem" } }, "Your Cart"), /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          gap: "2rem"
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-4" }, items.map((item) => {
        const lineTotal = (item.priceCents * item.quantity / 100).toFixed(2);
        const unitPrice = (item.priceCents / 100).toFixed(2);
        return /* @__PURE__ */ React.createElement(
          "div",
          {
            key: item.variantId,
            className: "bg-surface border border-border rounded-lg",
            style: {
              display: "flex",
              flexDirection: isWide ? "row" : "column",
              gap: "1rem",
              padding: "1rem"
            }
          },
          /* @__PURE__ */ React.createElement(
            Link,
            {
              href: `/product/${item.slug}`,
              className: "rounded-md overflow-hidden",
              style: {
                flexShrink: 0,
                width: isWide ? "6rem" : "100%",
                height: isWide ? "6rem" : "12rem"
              }
            },
            item.imageUrl ? /* @__PURE__ */ React.createElement(
              "img",
              {
                src: item.imageUrl,
                alt: item.name,
                style: {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block"
                }
              }
            ) : /* @__PURE__ */ React.createElement("div", { className: "w-full h-full bg-background flex items-center justify-center text-muted text-sm" }, "No image")
          ),
          /* @__PURE__ */ React.createElement(
            "div",
            {
              style: {
                flex: 1,
                minWidth: 0,
                display: "flex",
                flexDirection: isWide ? "row" : "column",
                alignItems: isWide ? "center" : "flex-start",
                gap: "0.75rem"
              }
            },
            /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement(
              Link,
              {
                href: `/product/${item.slug}`,
                className: "font-medium hover:text-accent transition-colors"
              },
              item.name
            ), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-muted", style: { marginTop: "0.125rem" } }, "$", unitPrice)),
            /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center border border-border rounded-lg" }, /* @__PURE__ */ React.createElement(
              "button",
              {
                onClick: () => updateQuantity(item.variantId, item.quantity - 1),
                className: "p-2 text-muted hover:text-foreground transition-colors cursor-pointer",
                "aria-label": "Decrease quantity"
              },
              /* @__PURE__ */ React.createElement(Minus, { className: "w-4 h-4" })
            ), /* @__PURE__ */ React.createElement("span", { className: "w-10 text-center text-sm font-medium" }, item.quantity), /* @__PURE__ */ React.createElement(
              "button",
              {
                onClick: () => updateQuantity(
                  item.variantId,
                  Math.min(10, item.quantity + 1)
                ),
                className: "p-2 text-muted hover:text-foreground transition-colors cursor-pointer",
                "aria-label": "Increase quantity"
              },
              /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4" })
            )), /* @__PURE__ */ React.createElement(
              "button",
              {
                onClick: () => removeItem(item.variantId),
                className: "p-2 text-muted hover:text-red-500 transition-colors cursor-pointer",
                "aria-label": "Remove item"
              },
              /* @__PURE__ */ React.createElement(Trash2, { className: "w-4 h-4" })
            )),
            /* @__PURE__ */ React.createElement(
              "p",
              {
                className: "text-sm font-semibold",
                style: {
                  width: isWide ? "5rem" : "auto",
                  textAlign: isWide ? "right" : "left"
                }
              },
              "$",
              lineTotal
            )
          )
        );
      }))),
      /* @__PURE__ */ React.createElement("div", { style: { width: isDesktop ? "20rem" : "100%", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { className: "bg-surface border border-border rounded-lg p-6", style: { position: isDesktop ? "sticky" : "static", top: "6rem" } }, /* @__PURE__ */ React.createElement("h2", { className: "font-heading text-lg font-bold mb-4" }, "Order Summary"), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-sm mb-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-muted" }, "Subtotal"), /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, "$", (subtotalCents / 100).toFixed(2))), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-muted mb-6" }, "Shipping & taxes calculated at checkout"), /* @__PURE__ */ React.createElement(
        "button",
        {
          disabled: pending,
          onClick: () => startTransition(
            () => createCheckoutSession(
              items.map((i) => ({ variantId: i.variantId, quantity: i.quantity }))
            )
          ),
          className: `w-full flex items-center justify-center gap-2 py-3 px-6 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors cursor-pointer ${pending ? "opacity-50 cursor-not-allowed" : ""}`
        },
        pending ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(LoaderCircle, { className: "w-5 h-5 animate-spin" }), "Redirecting\u2026") : "Proceed to Checkout"
      ), /* @__PURE__ */ React.createElement(
        Link,
        {
          href: "/#collection",
          className: "mt-4 w-full inline-flex items-center justify-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
        },
        /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-4 h-4" }),
        "Continue Shopping"
      )))
    ));
  }

  // src/components/cart/success-content.tsx
  init_define_import_meta_env();
  var import_react12 = __toESM(require_react_shim());
  function SuccessContent() {
    const clearCart = useCartStore((s) => s.clearCart);
    (0, import_react12.useEffect)(() => {
      clearCart();
    }, [clearCart]);
    return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center justify-center py-24 text-center" }, /* @__PURE__ */ React.createElement(
      CircleCheckBig,
      {
        className: "w-16 h-16 mb-4",
        style: { color: "var(--accent)" }
      }
    ), /* @__PURE__ */ React.createElement("h1", { className: "font-heading text-3xl font-bold mb-2" }, "Thank you for your order!"), /* @__PURE__ */ React.createElement("p", { className: "text-muted mb-8", style: { maxWidth: "28rem" } }, "Your payment was successful. You'll receive a confirmation email shortly with your order details."), /* @__PURE__ */ React.createElement(
      Link,
      {
        href: "/#collection",
        className: "inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors"
      },
      "Continue Shopping"
    ));
  }
  return __toCommonJS(entry_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs:
lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs:
lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs:
lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs:
lucide-react/dist/esm/defaultAttributes.mjs:
lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs:
lucide-react/dist/esm/context.mjs:
lucide-react/dist/esm/Icon.mjs:
lucide-react/dist/esm/createLucideIcon.mjs:
lucide-react/dist/esm/icons/arrow-left.mjs:
lucide-react/dist/esm/icons/check.mjs:
lucide-react/dist/esm/icons/chevron-down.mjs:
lucide-react/dist/esm/icons/chevron-left.mjs:
lucide-react/dist/esm/icons/chevron-right.mjs:
lucide-react/dist/esm/icons/circle-check-big.mjs:
lucide-react/dist/esm/icons/loader-circle.mjs:
lucide-react/dist/esm/icons/mail.mjs:
lucide-react/dist/esm/icons/menu.mjs:
lucide-react/dist/esm/icons/minus.mjs:
lucide-react/dist/esm/icons/plus.mjs:
lucide-react/dist/esm/icons/send.mjs:
lucide-react/dist/esm/icons/shopping-bag.mjs:
lucide-react/dist/esm/icons/trash-2.mjs:
lucide-react/dist/esm/icons/x.mjs:
lucide-react/dist/esm/lucide-react.mjs:
  (**
   * @license lucide-react v1.30.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
window.MasusPetites=MasusPetites.__dsMainNs?Object.assign({},MasusPetites,MasusPetites.__dsMainNs,{__dsMainNs:undefined}):MasusPetites;
