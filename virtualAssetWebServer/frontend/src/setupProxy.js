
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api/*',{
      target: 'http://220.70.59.102:8080',
      changeOrigin: true,
    })
  );
};
