"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _express = _interopRequireDefault(require("express"));
var _envconfig = require("./envconfig.js");
var _socket = require("socket.io");
var _path = _interopRequireDefault(require("path"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _url = require("url");
var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));
var _normalizr = require("normalizr");
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _passport = _interopRequireDefault(require("passport"));
var _passportLocal = require("passport-local");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _user = require("./models/user.js");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _connectFlash = _interopRequireDefault(require("connect-flash"));
var _minimist = _interopRequireDefault(require("minimist"));
var _child_process = require("child_process");
var _os = _interopRequireDefault(require("os"));
var _cluster = _interopRequireDefault(require("cluster"));
var _productsContainer = _interopRequireDefault(require("./productsContainer.js"));
var _chatContainer = _interopRequireDefault(require("./chatContainer.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var app = (0, _express["default"])();
_mongoose["default"].set('strictQuery', true);
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.engine("handlebars", _expressHandlebars["default"].engine());
var _filename = (0, _url.fileURLToPath)(import.meta.url);
var _dirname = _path["default"].dirname(_filename);
app.set("views", _path["default"].join(_dirname, "views"));
app.set("view engine", "handlebars");
app.use(_express["default"]["static"]("./views"));
app.use((0, _cookieParser["default"])());
app.use((0, _connectFlash["default"])());
var advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

/*

-------COOKIES AND MONGODB-------

*/
app.use((0, _expressSession["default"])({
  store: _connectMongo["default"].create({
    mongoUrl: _envconfig.envConfig.BASE_DE_DATOS_SESSIONSDB,
    mongoOptions: advancedOptions,
    ttl: 60
  }),
  secret: "clave",
  resave: false,
  saveUninitialized: false
}));
_mongoose["default"].connect(_envconfig.envConfig.BASE_DE_DATOS_CODERDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (error) {
  if (error) console.log("Conexion fallida");
  console.log("conectado correctamente");
});

/*

-------PASSPORT CONFIG-------

*/

app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
_passport["default"].serializeUser(function (user, done) {
  return done(null, user.id);
});
_passport["default"].deserializeUser(function (id, done) {
  _user.UserModel.findById(id, function (error, userFound) {
    return done(error, userFound);
  });
});

//Port of the server
var optionsMinimist = {
  "default": {
    p: 8080,
    modo: "fork"
  },
  alias: {
    p: "port"
  }
};
var argumentsMinimist = (0, _minimist["default"])(process.argv.slice(2), optionsMinimist);
var PORT = argumentsMinimist.port;
var MODO = argumentsMinimist.modo;

//Import classes

var productsClass = new _productsContainer["default"]();
var chatClass = new _chatContainer["default"]();

//Server listener
var server;
var numberCpus = _os["default"].cpus().length;
if (_cluster["default"].isPrimary && MODO == "cluster") {
  for (var i = 0; i < numberCpus; i++) {
    _cluster["default"].fork();
  }
  _cluster["default"].on("exit", function (worker) {
    console.log("Este subproceso (".concat(worker.process.pid, ") dejo de funcionar"));
    //cluster.fork()
  });
} else {
  server = app.listen(PORT, function () {
    return console.log("Server listening on port ".concat(PORT, " on process ").concat(process.pid));
  });
}
//server = app.listen(PORT,()=>console.log(`Server listening on port ${PORT} on process ${process.pid}`))

/*

-------SERVER AND CHAT-------

*/

//Create websocket server
var io = new _socket.Server(server);

//Normalizar
var authorSchema = new _normalizr.schema.Entity("authors", {}, {
  idAttribute: "email"
}); //id:con el valor del campo email.
var messageSchema = new _normalizr.schema.Entity("messages", {
  author: authorSchema
});
var chatSchema = new _normalizr.schema.Entity("chats", {
  messages: [messageSchema]
});
var normalizarData = function normalizarData(data) {
  var dataNormalizada = (0, _normalizr.normalize)({
    id: "chatHistory",
    messages: data
  }, chatSchema);
  return dataNormalizada;
};
var normalizarMensajes = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var messages, normalizedMessages;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return chatClass.getAll();
        case 2:
          messages = _context.sent;
          normalizedMessages = normalizarData(messages);
          return _context.abrupt("return", normalizedMessages);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function normalizarMensajes() {
    return _ref.apply(this, arguments);
  };
}();
io.on("connection", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(socket) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.t0 = socket;
          _context3.next = 3;
          return normalizarMensajes();
        case 3:
          _context3.t1 = _context3.sent;
          _context3.t0.emit.call(_context3.t0, "allMessages", _context3.t1);
          _context3.t2 = socket;
          _context3.next = 8;
          return productsClass.getAll();
        case 8:
          _context3.t3 = _context3.sent;
          _context3.t2.emit.call(_context3.t2, "allProducts", _context3.t3);
          socket.on("chatInput", /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return chatClass.save(data);
                  case 2:
                    _context2.t0 = io.sockets;
                    _context2.next = 5;
                    return normalizarMensajes();
                  case 5:
                    _context2.t1 = _context2.sent;
                    _context2.t0.emit.call(_context2.t0, "allMessages", _context2.t1);
                  case 7:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x2) {
              return _ref3.apply(this, arguments);
            };
          }());
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}());

/*

-------ROUTES-------

*/

app.get('/', function (req, res) {
  if (req.session.user) {
    var user = req.session.user.name;
    res.render("home", {
      user: user
    });
  } else {
    res.redirect("/login");
  }
});
app.get("/profile", function (req, res) {
  res.render("profile");
});
app.get("/api/productos-test", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var allProducts;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return productsClass.getAll();
        case 2:
          allProducts = _context4.sent;
          res.render("products", {
            allProducts: allProducts
          });
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}());
app.post("/api/productos-test", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body, title, price, image;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, price = _req$body.price, image = _req$body.image;
          console.log(title, price, image);
          console.log(req.body);
          _context5.next = 5;
          return productsClass.save({
            title: title,
            price: price,
            image: image
          });
        case 5:
          res.redirect("/api/productos-test");
        case 6:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}());
app.get("/info", function (req, res) {
  var _process = process,
    argv = _process.argv,
    platform = _process.platform,
    versions = _process.versions,
    pid = _process.pid,
    execPath = _process.execPath,
    memoryUsage = _process.memoryUsage;
  res.json({
    argumentosDeEntrada: argumentsMinimist,
    plataforma: platform,
    versionNode: versions.node,
    RSS: memoryUsage.rss(),
    pathEjecucion: execPath,
    processID: pid,
    carpetaProyecto: argv[1],
    procesadores: _os["default"].cpus()
  });
});
app.get("/api/randoms", function (req, res) {
  var child = (0, _child_process.fork)("apiRandoms.js");
  if (req.query.cant) {
    child.send(req.query.cant);
  } else {
    child.send(100000000);
  }
  child.on("message", function (childNumbers) {
    res.json(_objectSpread({}, childNumbers));
  });
});

/* 

-------LOGIN LOGOUT-------

*/

app.get("/login", function (req, res) {
  if (req.session.username) {
    return res.send("Ya estas logueado");
  }
  if (req.session.username) {
    res.redirect("/");
  } else {
    res.render("login", {
      error: req.flash('error')[0]
    });
  }
});
app.get("/logout", function (req, res) {
  var user = req.session.user;
  req.session.destroy(function (error) {
    if (!error) return res.render("logout", {
      user: user.name
    });
    res.send("Error: ".concat(error)).status(500);
  });
});
_passport["default"].use("loginStrategy", new _passportLocal.Strategy({
  usernameField: "mail"
}, function (username, password, done) {
  _user.UserModel.findOne({
    mail: username
  }, function (err, userFound) {
    if (err) return done(err);
    if (!userFound) return done(null, false, {
      message: "No se encontro el usuario"
    });
    if (userFound) {
      _bcrypt["default"].compare(password, userFound.password, function (err, result) {
        if (result) {
          return done(null, userFound);
        }
        return done(null, false, {
          message: "Contraseña incorrecta"
        });
      });
    }
  });
}));
app.post("/login", _passport["default"].authenticate("loginStrategy", {
  failureRedirect: "/login",
  failureMessage: true,
  failureFlash: true
}), /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          req.session.user = req.user;
          res.redirect("/");
        case 2:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}());

/*

-------SIGNUP-------

*/

app.get("/signup", function (req, res) {
  res.render("signup", {
    error: req.flash('error')[0]
  });
});
_passport["default"].use("signupStrategy", new _passportLocal.Strategy({
  passReqToCallback: true,
  usernameField: "mail"
}, function (req, username, password, done) {
  _user.UserModel.findOne({
    mail: username
  }, function (err, userFound) {
    if (err) return done(err);
    if (userFound) return done(null, false, {
      message: "El usuario ya existe"
    });
    var saltRounds = 10;
    _bcrypt["default"].genSalt(saltRounds, function (err, salt) {
      _bcrypt["default"].hash(password, salt, function (err, hash) {
        var newUser = {
          name: req.body.name,
          mail: username,
          password: hash
        };
        _user.UserModel.create(newUser, function (error, userCreated) {
          if (err) return done(error, null, {
            message: "Error al crear el usuario"
          });
          return done(null, userCreated);
        });
      });
    });
  });
}));
app.post("/signup", _passport["default"].authenticate("signupStrategy", {
  failureRedirect: "/signup",
  failureMessage: true,
  failureFlash: true
}), function (req, res) {
  res.redirect("/login");
});
