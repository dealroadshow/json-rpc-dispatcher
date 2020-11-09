"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Request = /*#__PURE__*/function () {
  /**
   * @param {object} payload
   */
  function Request(payload) {
    _classCallCheck(this, Request);

    this.jsonrpc = '2.0';

    if (!payload.method) {
      throw Error('No method specified for request');
    }
    /**
     * @type {string}
     */


    this.method = payload.method;

    if (payload.params) {
      /**
       * @type {object|array}
       */
      this.params = payload.params;
    }

    if (!payload.id && payload.id !== null) {
      payload.id = (0, _uuid.v4)();
    }
    /**
     * @type {string}
     */


    this.id = payload.id;
  }
  /**
   * Get request id
   *
   * @return {string}
   */


  _createClass(Request, [{
    key: "getId",
    value: function getId() {
      return this.id;
    }
    /**
     * Get rpc method
     *
     * @return {string}
     */

  }, {
    key: "getMethod",
    value: function getMethod() {
      return this.method;
    }
    /**
     * @return {object|array}
     */

  }, {
    key: "getParams",
    value: function getParams() {
      return this.params;
    }
    /**
     * Get contents of result.headers
     *
     * @return {string|Headers}
     */

  }, {
    key: "getHeaders",
    value: function getHeaders() {
      return this.params.headers;
    }
    /**
     * Get contents of result.payload
     *
     * @return {*}
     */

  }, {
    key: "getPayload",
    value: function getPayload() {
      return this.params.payload;
    }
  }]);

  return Request;
}();

exports.default = Request;