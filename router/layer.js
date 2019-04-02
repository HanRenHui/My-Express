function Layer(path, handler) {
  this.path = path
  this.handler = handler
  // 用来判断在该层有没有这个方法 没有就直接下一层
  this.methods = {}
  this.method = ''
}

Layer.prototype.callhandler = function (req, res, out) {
  this.handler(req, res, out)
}

Layer.prototype.handle_error = function (err, req, res, next) {
  if (this.handler.length === 4) {
    this.handler(err,req, res, next)
  } else {
    next()
  }

}
module.exports = Layer