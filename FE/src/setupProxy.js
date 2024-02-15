// // const express = require("express");
// const { createProxyMiddleware } = require("http-proxy-middleware");

// // app = express();
// module.exports = function (app) {
//   app.use(
//     createProxyMiddleware("/api/v1", {
//       target: "http://localhost:8082",
//       changeOrigin: true,
//     })
//   );

//   app.use(
//     createProxyMiddleware("/api", {
//       target: "http://localhost:8080/api",
//       pathRewrite: { "^/api": "" },
//       changeOrigin: true,
//     })
//   );

//   app.use(
//     createProxyMiddleware("/api/search", {
//       target: "https://opendict.korean.go.kr/api/search",
//       pathRewrite: { "^/api/search": "" },
//       changeOrigin: true,
//     })
//   );
// };

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // app.use(
  //   "/api",
  //   createProxyMiddleware({
  //     target: "http://localhost:8080",
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   "/api",
  //   createProxyMiddleware({
  //     target: "https://opendict.korean.go.kr",
  //     changeOrigin: true,
  //     pathRewrite: { "^/api": "" },
  //   })
  // );
};
