
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
<<<<<<< HEAD
    createProxyMiddleware('/api/**',{
      /*안성찬 로컬*/target: 'http://211.193.12.31:8080',
=======
    createProxyMiddleware('/api/*',{
      //*안성찬 로컬*/target: 'http://211.193.12.31:8080',
>>>>>>> branch 'master' of https://github.com/tjdcks098/VirtualAsset-WebServer.git
      //*안성찬 회사*/target: 'http://192.168.30.14:8080',
      /*권예빈 로컬*/target: 'http://192.168.0.20:8080',
      changeOrigin: true,
    })
  );
};
