const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      // 遇见‘/api’这个前缀的请求，就会触发这个代理
      target: 'http://47.97.212.228:7001', // 请求转发的目标（target）地址
      //   target: 'http://127.0.0.1:7001', // 请求转发的目标（target）地址
      changeOrigin: true,
    }),
  );
};
