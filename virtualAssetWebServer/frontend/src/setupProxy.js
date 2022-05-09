
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api/*',{
      // /*안성찬 로컬*/target: 'http://220.70.59.102:8080',
      //*안성찬 회사*/target: 'http://192.168.30.11:8080',
      /*권예빈 로컬*/target: 'http://175.124.178.52:8080',
      changeOrigin: true,
    })
  );
};
