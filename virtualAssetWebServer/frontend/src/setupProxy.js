
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api/*',{
      //target: 'http://220.70.59.102:8080',
      target: 'http://192.168.0.22:8080',
      changeOrigin: true,
    })
  );
};
