var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: !0 });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 == "object" || typeof module2 == "function")
    for (let key of __getOwnPropNames(module2))
      !__hasOwnProp.call(target, key) && (copyDefault || key !== "default") && __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  return target;
}, __toESM = (module2, isNodeMode) => __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: !0 } : { value: module2, enumerable: !0 })), module2), __toCommonJS = /* @__PURE__ */ ((cache) => (module2, temp) => cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp))(typeof WeakMap != "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  publicPath: () => publicPath,
  routes: () => routes
});

// node_modules/@remix-run/dev/dist/compiler/shims/react.ts
var React = __toESM(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_stream = require("stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_server = require("react-dom/server"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let didError = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
      context: remixContext,
      url: request.url
    }), {
      onShellReady: () => {
        let body = new import_stream.PassThrough();
        responseHeaders.set("Content-Type", "text/html"), resolve(new import_node.Response(body, {
          headers: responseHeaders,
          status: didError ? 500 : responseStatusCode
        })), pipe(body);
      },
      onShellError: (err) => {
        reject(err);
      },
      onError: (error) => {
        didError = !0, console.error(error);
      }
    });
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});
var import_react2 = require("@remix-run/react");

// app/styles/app.css
var app_default = "/build/_assets/app-3WTTPTP4.css";

// app/root.tsx
function links() {
  return [{ rel: "stylesheet", href: app_default }];
}
var meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1"
});
function App() {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react2.Meta, null), /* @__PURE__ */ React.createElement(import_react2.Links, null)), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement(import_react2.Outlet, null), /* @__PURE__ */ React.createElement(import_react2.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react2.Scripts, null), /* @__PURE__ */ React.createElement(import_react2.LiveReload, null)));
}

// app/routes/bingwallpapers/$id.tsx
var id_exports = {};
__export(id_exports, {
  default: () => Index,
  loader: () => loader,
  meta: () => meta2
});
var import_react4 = require("@remix-run/react"), import_node2 = require("@remix-run/node");

// libs/Client.ts
var apiUrl = "https://api.sonurai.com";
function apiToWallpaper(v) {
  return {
    id: v.id,
    title: v.title,
    copyright: v.copyright,
    date: v.date,
    filename: v.filename,
    tags: v.tags || {}
  };
}
var Client = class {
  async getWallpapers(startAfterDate, startAfterID, prev) {
    let url = `${apiUrl}/wallpapers`;
    startAfterDate && startAfterID && (url = `${url}?startAfterDate=${startAfterDate}&startAfterID=${startAfterID}`, prev && (url = `${url}&prev=1`));
    let res = await fetch(url);
    if (res.status === 404)
      return { wallpapers: [] };
    let wallpapers = (await res.json()).data.map(apiToWallpaper), first = wallpapers[0], last = wallpapers[wallpapers.length - 1];
    return {
      pagination: {
        prev: {
          date: first.date,
          id: first.id
        },
        next: {
          date: last.date,
          id: last.id
        }
      },
      wallpapers
    };
  }
  async getWallpapersByTag(tag) {
    let url = `${apiUrl}/wallpapers/tags/${tag}`, res = await fetch(url);
    return res.status === 404 ? { wallpapers: [] } : {
      wallpapers: (await res.json()).data.map(apiToWallpaper)
    };
  }
  async getWallpaper(id) {
    let res = await fetch(`${apiUrl}/wallpapers/${id}`);
    if (res.status === 404)
      return { wallpaper: null };
    let json = await res.json();
    return {
      wallpaper: apiToWallpaper(json)
    };
  }
}, client = new Client();

// app/routes/bingwallpapers/$id.tsx
var import_react5 = require("react");

// components/Layout.tsx
var import_react3 = require("@remix-run/react"), Layout = (props) => /* @__PURE__ */ React.createElement("div", {
  className: "container mx-auto"
}, /* @__PURE__ */ React.createElement(Header, null), props.children, /* @__PURE__ */ React.createElement(Footer, null)), Header = () => /* @__PURE__ */ React.createElement("nav", {
  className: "",
  "aria-label": "navigation"
}, /* @__PURE__ */ React.createElement(import_react3.Link, {
  to: "/"
}, "Sonu Rai"), /* @__PURE__ */ React.createElement(import_react3.Link, {
  to: "/bingwallpapers"
}, "Wallpapers"), /* @__PURE__ */ React.createElement(import_react3.Link, {
  to: "/about"
}, "About")), Footer = () => /* @__PURE__ */ React.createElement("footer", {
  className: "mt-4 mb-16 text-gray-400"
}, /* @__PURE__ */ React.createElement("div", {
  className: "px-3 px-lg-0"
}, "\xA9 2013-", new Date().getFullYear(), " Amarjeet Rai")), Layout_default = Layout;

// app/routes/bingwallpapers/$id.tsx
var loader = async ({ params }) => {
  let id = params.id;
  if (!id)
    return (0, import_node2.redirect)("/");
  let data = await client.getWallpaper(id);
  if (!data.wallpaper)
    throw new Response("Not Found", { status: 404 });
  return data;
}, meta2 = ({ data }) => ({ title: `${data.wallpaper.title} - Bing Wallpapers` });
function Index() {
  let data = (0, import_react4.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "text-3xl mb-2 text-white"
  }, "Bing Wallpapers"), /* @__PURE__ */ React.createElement(Wallpaper, {
    wallpaper: data.wallpaper
  }));
}
function intToDate(int) {
  let datePattern = /^(\d{4})(\d{2})(\d{2})$/, [, year, month, day] = datePattern.exec(int);
  return `${year}-${month}-${day}`;
}
function Wallpaper({ wallpaper }) {
  let { id, filename, title, copyright, date, tags } = wallpaper, tagFields = Object.entries(tags).sort((a, b) => b[1] - a[1]).map((l, i) => /* @__PURE__ */ React.createElement(import_react5.Fragment, {
    key: i
  }, /* @__PURE__ */ React.createElement(import_react4.Link, {
    to: `/bingwallpapers/tags/${l[0]}`
  }, /* @__PURE__ */ React.createElement("span", {
    className: "rounded p-2 leading-10 bg-slate-800 text-white hover:bg-slate-700"
  }, l[0])), " "));
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("figure", {
    key: id,
    className: "wallpaper relative"
  }, /* @__PURE__ */ React.createElement(import_react4.Link, {
    to: `/bingwallpapers/${id}`
  }, /* @__PURE__ */ React.createElement("a", {
    title
  }, /* @__PURE__ */ React.createElement("img", {
    src: `https://images.sonurai.com/${filename}.jpg`,
    width: 1920,
    height: 1200,
    alt: title
  }), /* @__PURE__ */ React.createElement("figcaption", {
    className: "caption text-2xl text-white"
  }, title)))), /* @__PURE__ */ React.createElement("p", {
    className: "text-gray-400"
  }, copyright, " - ", intToDate(date)), /* @__PURE__ */ React.createElement("p", {
    className: "mt-4"
  }, tagFields));
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index2,
  loader: () => loader2
});
var import_react6 = require("@remix-run/react"), import_node3 = require("@remix-run/node");
var getUrlPrev = (p) => `/?date=${p.date}&id=${p.id}&prev=1`, getUrlNext = (p) => `/?date=${p.date}&id=${p.id}`, Pagination = ({ pagination }) => /* @__PURE__ */ React.createElement("div", {
  className: "my-4"
}, /* @__PURE__ */ React.createElement(import_react6.Link, {
  to: getUrlPrev(pagination.prev),
  className: "rounded p-2 bg-slate-800 text-white hover:bg-slate-700"
}, "Prev"), /* @__PURE__ */ React.createElement(import_react6.Link, {
  to: getUrlNext(pagination.next),
  className: "rounded p-2 bg-slate-800 text-white hover:bg-slate-700 ml-2"
}, "Next")), loader2 = async ({ request }) => {
  let url = new URL(request.url), date = url.searchParams.get("date"), id = url.searchParams.get("id"), reverse = url.searchParams.get("prev") === "1";
  if (date && !id || !date && id)
    return (0, import_node3.redirect)("/");
  let data = await client.getWallpapers(date, id, reverse);
  if (data.wallpapers.length === 0)
    throw new Response("Not Found", { status: 404 });
  return data;
};
function Index2() {
  let data = (0, import_react6.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "text-3xl mb-2 text-white"
  }, "Bing Wallpapers"), /* @__PURE__ */ React.createElement(WallpaperList, {
    wallpapers: data.wallpapers
  }), /* @__PURE__ */ React.createElement(Pagination, {
    pagination: data.pagination
  }));
}
function WallpaperList({ wallpapers }) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "columns-1 md:columns-2 lg:columns-3 gap-1"
  }, wallpapers.map(({ id, title, filename }) => /* @__PURE__ */ React.createElement("figure", {
    key: id,
    className: "wallpaper relative"
  }, /* @__PURE__ */ React.createElement(import_react6.Link, {
    to: `/bingwallpapers/${id}`
  }, /* @__PURE__ */ React.createElement("a", {
    title
  }, /* @__PURE__ */ React.createElement("img", {
    src: `https://images.sonurai.com/${filename}.jpg`,
    width: 1920,
    height: 1200,
    alt: title
  }), /* @__PURE__ */ React.createElement("figcaption", {
    className: "caption hidden absolute bottom-0 left-0 p-4 h-full w-full text-2xl bg-black bg-opacity-80 text-white"
  }, title))))));
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "871f7773", entry: { module: "/build/entry.client-O2PMBSSX.js", imports: ["/build/_shared/chunk-YSX4IVGK.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-DI2PTJK5.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/bingwallpapers/$id": { id: "routes/bingwallpapers/$id", parentId: "root", path: "bingwallpapers/:id", index: void 0, caseSensitive: void 0, module: "/build/routes/bingwallpapers/$id-J7HICTR5.js", imports: ["/build/_shared/chunk-HK3IC2LW.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-6DLA43BS.js", imports: ["/build/_shared/chunk-HK3IC2LW.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, url: "/build/manifest-871F7773.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/bingwallpapers/$id": {
    id: "routes/bingwallpapers/$id",
    parentId: "root",
    path: "bingwallpapers/:id",
    index: void 0,
    caseSensitive: void 0,
    module: id_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
