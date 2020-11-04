"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Notification = _interopRequireDefault(require("../jsonrpc/request/Notification"));

var _parse = _interopRequireDefault(require("../jsonrpc/parse"));

var _JsonRpcError = _interopRequireDefault(require("../jsonrpc/response/JsonRpcError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RESPONSE_TIMEOUT = 300000; // 300000 seconds

var SOCKET_REQUEST_URL_HEADER = 'socket.requestUrl';

var Socket = /*#__PURE__*/function () {
  function Socket(url, sockJsConnection) {
    _classCallCheck(this, Socket);

    this.url = url;
    this.connection = sockJsConnection;
  }
  /**
   * Perform rpc call
   *
   * @param request
   * @return {Promise<unknown>|Promise<void>}
   */


  _createClass(Socket, [{
    key: "call",
    value: function call(request) {
      var _this = this;

      this.connection.send(JSON.stringify(this.addSocketUrlHeader(request)));

      if (request instanceof _Notification.default) {
        return Promise.resolve();
      }

      return new Promise(function (resolve, reject) {
        var requestTimeout = setTimeout(function () {
          return reject(_JsonRpcError.default.internalError({
            data: 'Request timeout'
          }));
        }, RESPONSE_TIMEOUT);

        _this.connection.onMessage = function (message) {
          var response = (0, _parse.default)(message);

          if (_this.isResponseMatchRequest(response, request)) {
            clearTimeout(requestTimeout);
            resolve();
          }
        };
      });
    }
    /**
     * Add url header to request
     *
     * @param request
     * @return {*|number}
     */

  }, {
    key: "addSocketUrlHeader",
    value: function addSocketUrlHeader(request) {
      var _this2 = this;

      if (Array.isArray(request)) {
        return request.map(function (req) {
          req.params.headers[SOCKET_REQUEST_URL_HEADER] = _this2.url;
          return req;
        });
      }

      request.params.headers[SOCKET_REQUEST_URL_HEADER] = this.url;
      return request;
    }
    /**
     * Will match of response corresponds to request using request id
     *
     * @param response
     * @param request
     * @return {boolean}
     */

  }, {
    key: "isResponseMatchRequest",
    value: function isResponseMatchRequest(response, request) {
      var _response$filter$, _request$filter$;

      var responseId = Array.isArray(response) ? (_response$filter$ = response.filter(function (rpcResponse) {
        return !!rpcResponse.id;
      })[0]) === null || _response$filter$ === void 0 ? void 0 : _response$filter$.id : response.id;
      var requestId = Array.isArray(request) ? (_request$filter$ = request.filter(function (rpcRequest) {
        return !!rpcRequest.id;
      })[0]) === null || _request$filter$ === void 0 ? void 0 : _request$filter$.id : request.id;
      return requestId === responseId;
    }
  }]);

  return Socket;
}();

var _default = Socket;
exports.default = _default;