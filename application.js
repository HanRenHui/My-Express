let Router = require('./router')
let http = require('http')
let methods = require('methods')
function Application() {
  this._router = new Router()
}

methods.forEach(method => {
  Application.prototype[method] = function (path, ...handler) {
    this._router[method](path, ...handler)
  }
})


// 中间件和普通的路由都是放在同一个数组
Application.prototype.use = function (path, handler) {
  this._router.use.call(this._router,path, handler)
}

Application.prototype.listen = function (...params) {

  http.createServer((req, res) => {
    const done = () => {
        res.end(`Cannot ${req.method} ${req.url}`)
    }
    this._router.handler(req, res, done)
  }).listen(...params)

}

module.exports = Application




