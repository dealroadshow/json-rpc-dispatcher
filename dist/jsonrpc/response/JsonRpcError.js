"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Error2 = _interopRequireDefault(require("./Error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var JsonRpcError = /*#__PURE__*/function (_Error) {
  _inherits(JsonRpcError, _Error);

  var _super = _createSuper(JsonRpcError);

  function JsonRpcError() {
    _classCallCheck(this, JsonRpcError);

    return _super.apply(this, arguments);
  }

  _createClass(JsonRpcError, null, [{
    key: "invalidRequest",
    value: function invalidRequest(_ref) {
      var id = _ref.id,
          _ref$message = _ref.message,
          message = _ref$message === void 0 ? 'Invalid request' : _ref$message,
          data = _ref.data;
      return new JsonRpcError({
        id: id,
        error: {
          message: message,
          code: -32600,
          data: data
        }
      });
    }
  }, {
    key: "methodNotFound",
    value: function methodNotFound(_ref2) {
      var id = _ref2.id,
          _ref2$message = _ref2.message,
          message = _ref2$message === void 0 ? 'Method not found' : _ref2$message,
          data = _ref2.data;
      return new JsonRpcError({
        id: id,
        error: {
          message: message,
          code: -32601,
          data: data
        }
      });
    }
  }, {
    key: "invalidParams",
    value: function invalidParams(_ref3) {
      var id = _ref3.id,
          _ref3$message = _ref3.message,
          message = _ref3$message === void 0 ? 'Invalid params' : _ref3$message,
          data = _ref3.data;
      return new JsonRpcError({
        id: id,
        error: {
          message: message,
          code: -32602,
          data: data
        }
      });
    }
  }, {
    key: "internalError",
    value: function internalError(_ref4) {
      var id = _ref4.id,
          _ref4$message = _ref4.message,
          message = _ref4$message === void 0 ? 'Internal error' : _ref4$message,
          data = _ref4.data;
      return new JsonRpcError({
        id: id,
        error: {
          message: message,
          code: -32603,
          data: data
        }
      });
    }
  }, {
    key: "parseError",
    value: function parseError(_ref5) {
      var id = _ref5.id,
          _ref5$message = _ref5.message,
          message = _ref5$message === void 0 ? 'Parse error' : _ref5$message,
          data = _ref5.data;
      return new JsonRpcError({
        id: id,
        error: {
          message: message,
          code: -32700,
          data: data
        }
      });
    }
  }]);

  return JsonRpcError;
}(_Error2.default);

exports.default = JsonRpcError;