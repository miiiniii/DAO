
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api/*',{
      //*안성찬 로컬*/target: 'http://211.193.12.31:8080',
      /*안성찬 회사*///target: 'http://192.168.30.14:8080',
      //*권예빈 로컬*/target: 'http://221.139.151.211:8080',
      /*계용운 로ㄹ*/target: 'http://192.168.35.215:8080',
      changeOrigin: true,
    })
  );
};
