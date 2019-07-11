const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(proxy('/', { target: 'http://localhost:5000/' }))
  app.use(proxy('/socket.io', { target: 'ws://localhost:5000/', ws: true }))
  app.use(proxy('/sockjs-node', { target: 'ws://localhost:5000/', ws: true }))
}
