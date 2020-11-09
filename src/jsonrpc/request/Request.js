import { v4 as uuid } from 'uuid';

export default class Request {
  /**
   * @param {object} payload
   */
  constructor(payload) {
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
      payload.id = uuid();
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
  getId() {
    return this.id;
  }

  /**
   * Get rpc method
   *
   * @return {string}
   */
  getMethod() {
    return this.method;
  }

  /**
   * @return {object|array}
   */
  getParams() {
    return this.params;
  }

  /**
   * Get contents of result.headers
   *
   * @return {string|Headers}
   */
  getHeaders() {
    return this.params.headers;
  }

  /**
   * Get contents of result.payload
   *
   * @return {*}
   */
  getPayload() {
    return this.params.payload;
  }
}
