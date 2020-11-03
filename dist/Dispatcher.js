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
   *
   * @param {object} adapter
   */
  function Dispatcher(adapter) {
    _classCallCheck(this, Dispatcher);

    this.adapter = adapter;
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }
  /**
   * Execute remote procedure
   *
   * @param {*} payload
   *
   * @return {Success,Error}
   */


  _createClass(Dispatcher, [{
    key: "call",
    value: function () {
      var _call = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload) {
        var jsonRpcPayload, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                jsonRpcPayload = this.execRequestInterceptors((0, _parse.default)(payload));
                _context.prev = 1;
                _context.next = 4;
                return this.getAdapter().call(jsonRpcPayload);

              case 4:
                response = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                response = _context.t0;

              case 10:
                response = (0, _parse.default)(response);
                return _context.abrupt("return", this.execResponseInterceptors(response, jsonRpcPayload));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 7]]);
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
     * @deprecated
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
     * @deprecated
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

      this.requestInterceptors.push(callback);
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

      this.responseInterceptors.push(callback);
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
      this.requestInterceptors = this.requestInterceptors.filter(function (el) {
        return el !== callback;
      });
      return this;
    }
    /**
     * Delete interceptor before response
     *
     * @param {function} callback
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
     * @param {object} payload
     * @return {object}
     * @private
     */

  }, {
    key: "execRequestInterceptors",
    value: function execRequestInterceptors(payload) {
      if (!this.requestInterceptors.length) {
        return payload;
      }

      this.requestInterceptors.forEach(function (callback) {
        payload = callback(payload);
      });
      return payload;
    }
    /**
     * Exec response interceptors
     *
     * @param {object} response
     * @param {object} payload
     * @return {object}
     * @private
     */

  }, {
    key: "execResponseInterceptors",
    value: function execResponseInterceptors(response, payload) {
      if (!this.responseInterceptors.length) {
        return response;
      }

      this.responseInterceptors.forEach(function (callback) {
        response = callback(response, payload);
      });
      return response;
    }
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