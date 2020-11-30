"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parse = _interopRequireDefault(require("./jsonrpc/parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dispatcher = /*#__PURE__*/function () {
  /**
   * @param {Object} adapter
   */
  function Dispatcher(adapter) {
    _classCallCheck(this, Dispatcher);

    this.adapter = adapter;
    this.requestInterceptors = new Set();
    this.responseInterceptors = new Set();
  }
  /**
   * Execute remote procedure
   *
   * @param {Request|Notification} payload
   *
   * @return {Success|Error}
   */


  _createClass(Dispatcher, [{
    key: "call",
    value: function () {
      var _call = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload) {
        var request, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.execRequestInterceptors((0, _parse.default)(payload));

              case 2:
                request = _context.sent;
                _context.prev = 3;
                _context.next = 6;
                return this.getAdapter().call(request);

              case 6:
                response = _context.sent;
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](3);
                response = _context.t0;

              case 12:
                if (request === null || request === void 0 ? void 0 : request.id) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("return", true);

              case 14:
                return _context.abrupt("return", this.execResponseInterceptors((0, _parse.default)(response), request));

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 9]]);
      }));

      function call(_x) {
        return _call.apply(this, arguments);
      }

      return call;
    }()
    /**
     * Request
     *
     * @param payload
     * @return {*|Promise.<*>}
     * @deprecated Use .call method instead
     */

  }, {
    key: "request",
    value: function request(payload) {
      return this.call(payload);
    }
    /**
     * Notification
     *
     * @param payload
     * @deprecated Use .call method instead
     */

  }, {
    key: "notify",
    value: function notify(payload) {
      return this.call(payload);
    }
    /**
     * Add interceptor before request
     *
     * @param {function} callback
     * @return {Dispatcher}
     */

  }, {
    key: "interceptRequest",
    value: function interceptRequest(callback) {
      if (typeof callback !== 'function') {
        throw new TypeError('Interceptor must be a function');
      }

      this.requestInterceptors.add(callback);
      return this;
    }
    /**
     * Add interceptor before response
     *
     * @param {function} callback
     * @return {Dispatcher}
     */

  }, {
    key: "interceptResponse",
    value: function interceptResponse(callback) {
      if (typeof callback !== 'function') {
        throw new TypeError('Interceptor must be a function');
      }

      this.responseInterceptors.add(callback);
      return this;
    }
    /**
     * Delete interceptor before response
     *
     * @param {function} callback
     * @return {Dispatcher}
     */

  }, {
    key: "deleteRequestInterceptor",
    value: function deleteRequestInterceptor(callback) {
      this.requestInterceptors.delete(callback);
      return this;
    }
    /**
     * Delete interceptor before response
     *
     * @param {Function} callback
     * @return {Dispatcher}
     */

  }, {
    key: "deleteResponseInterceptor",
    value: function deleteResponseInterceptor(callback) {
      this.requestInterceptors = this.responseInterceptors.filter(function (el) {
        return el !== callback;
      });
      return this;
    }
    /**
     * Exec request interceptors
     *
     * @param {Request|Notification|*} request
     * @return {Promise<Request|Notification>}
     * @private
     */

  }, {
    key: "execRequestInterceptors",
    value: function () {
      var _execRequestInterceptors = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(request) {
        var interceptors, i;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.requestInterceptors.length) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", request);

              case 2:
                interceptors = Array.from(this.requestInterceptors);
                i = 0;

              case 4:
                if (!(i < interceptors.length)) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 7;
                return interceptors[i](request);

              case 7:
                request = _context2.sent;

              case 8:
                i++;
                _context2.next = 4;
                break;

              case 11:
                return _context2.abrupt("return", request);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function execRequestInterceptors(_x2) {
        return _execRequestInterceptors.apply(this, arguments);
      }

      return execRequestInterceptors;
    }()
    /**
     * Exec response interceptors
     *
     * @param {Response|*} response
     * @param {Request|Notification} request
     * @return {Promise<Response>}
     * @private
     */

  }, {
    key: "execResponseInterceptors",
    value: function () {
      var _execResponseInterceptors = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(response, request) {
        var interceptors, i;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.responseInterceptors.length) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", response);

              case 2:
                interceptors = Array.from(this.responseInterceptors);
                i = 0;

              case 4:
                if (!(i < interceptors.length)) {
                  _context3.next = 11;
                  break;
                }

                _context3.next = 7;
                return interceptors[i](response, request);

              case 7:
                response = _context3.sent;

              case 8:
                i++;
                _context3.next = 4;
                break;

              case 11:
                return _context3.abrupt("return", response);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function execResponseInterceptors(_x3, _x4) {
        return _execResponseInterceptors.apply(this, arguments);
      }

      return execResponseInterceptors;
    }()
    /**
     * Get adapter
     *
     * @return {*}
     */

  }, {
    key: "getAdapter",
    value: function getAdapter() {
      if (!this.adapter) {
        throw new TypeError('Adapter is not set');
      }

      return this.adapter;
    }
    /**
     * Set adapter
     *
     * @param {object} adapter
     * @return {Dispatcher}
     */

  }, {
    key: "setAdapter",
    value: function setAdapter(adapter) {
      this.adapter = adapter;
      return this;
    }
  }]);

  return Dispatcher;
}();

exports.default = Dispatcher;