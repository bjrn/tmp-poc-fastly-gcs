const webpack = require("webpack");
const path = require("path");

module.exports = {
  stats: {
    errorDetails: true,
  },
  mode: "production",
  entry: "./src/index.js",
  optimization: {
    minimize: true
  },
  target: "webworker",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "bin"),
    libraryTarget: "this",
  },
  module: {
    // Asset modules are modules that allow the use asset files (fonts, icons, etc) 
    // without additional configuration or dependencies.
    rules: [
      // asset/source exports the source code of the asset. 
      // Usage: e.g., import notFoundPage from "./page_404.html"
      {
        test: /\.(txt|html)/,
        type: "asset/source",
      },
    ],
  },
  plugins: [
    // Polyfills go here.
    // Used for, e.g., any cross-platform WHATWG, 
    // or core nodejs modules needed for your application.
  ],
  resolve: {
    alias: {
      'timeout-polyfill': require.resolve('@fastly/http-compute-js/dist/polyfill'),
    },
    fallback: {
      // Added for not getting compile issues with @google-cloud/storage:
      "fs": false,
      "net": false,
      "tls": false,
      "request": false,
      "child_process": false,
      "browser": false,
      "https": require.resolve("https-browserify"),
      "http": require.resolve("stream-http"),

      // these are from the initial scaffolding of /compute-js
      // (i.e. for Next.js compatibility)
      "async_hooks": false,
      "buffer": require.resolve("buffer/"),
      "crypto": require.resolve("crypto-browserify/"),
      "os": require.resolve("os-browserify/browser"),
      "path": require.resolve("path-browserify"),
      "process": require.resolve("process/browser"),
      "querystring": require.resolve("querystring-es3"),
      "stream": require.resolve("stream-browserify"),
      "url": require.resolve("url/"),
      "util": require.resolve("util/"),
      "zlib": require.resolve("browserify-zlib"),
    }
  }
};
