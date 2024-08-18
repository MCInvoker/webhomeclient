const { createProxyMiddleware } = require('http-proxy-middleware');

// eslint-disable-next-line no-undef
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      // 遇见‘/api’这个前缀的请求，就会触发这个代理
      target: 'https://webhomeide.top', // 请求转发的目标（target）地址
        // target: 'http://127.0.0.1:7001', // 请求转发的目标（target）地址
      changeOrigin: true,
    }),
    createProxyMiddleware('/uploads', {
        target: 'http://webhomeide.oss-cn-hangzhou.aliyuncs.com', // OSS 图片上传的目标地址
        changeOrigin: true,
        pathRewrite: { '^/uploads': '/uploads' }, // 重写请求路径
    }),
    createProxyMiddleware('/linkIcon', {
        target: 'http://webhomeide.oss-cn-hangzhou.aliyuncs.com', // OSS 图片上传的目标地址
        changeOrigin: true,
        pathRewrite: { '^/linkIcon': '/linkIcon' }, // 重写请求路径
    })
// http://webhomeide.oss-cn-hangzhou.aliyuncs.com/uploads/%E6%88%AA%E5%B1%8F2024-06-12%2009.53.05.png
  );
};
