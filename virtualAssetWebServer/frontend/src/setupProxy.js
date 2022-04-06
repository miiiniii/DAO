import TEST_IP from './scripts/setTestIp';
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/*',
    createProxyMiddleware({
      target: 'http://220.70.59.102:8080',
      //target: 'http://'+TEST_IP+':8080',
      changeOrigin: true,
    })
  );
};
