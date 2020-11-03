"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Notification = _interopRequireDefault(require("../jsonrpc/request/Notification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SocketIo = /*#__PURE__*/function () {
  /**
   *
   * @param {io} socket
   */
  function SocketIo(socket) {
    _classCallCheck(this, SocketIo);

    this.socket = socket;
  }
  /**
   * Send request to server
   *
   * @param {string} request
   *
   * @return {Promise}
   */


  _createClass(SocketIo, [{
    key: "call",
    value: function call(request) {
      var _this = this;

      var id = (0, _uuid.v4)();
      this.socket.emit('request', JSON.stringify(request));

      if (request instanceof _Notification.default) {
        return Promise.resolve();
      }

      return new Promise(function (resolve) {
        _this.socket.on("response.".concat(id), function (data) {
          resolve(data);
        });
      });
    }
  }]);

  return SocketIo;
}();

var _default = SocketIo;
exports.default = _default;