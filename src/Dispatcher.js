import parse from './jsonrpc/parse';

export default class Dispatcher {
  /**
   * @param {Object} adapter
   */
  constructor(adapter) {
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
  async call(payload) {
    const request = await this.execRequestInterceptors(parse(payload));

    let response;
    try {
      response = await this.getAdapter().call(request);
    } catch (error) {
      response = error;
    }
    if (!request?.id) {
      return true;
    }

    return this.execResponseInterceptors(parse(response), request);
  }

  /**
   * Request
   *
   * @param payload
   * @return {*|Promise.<*>}
   * @deprecated Use .call method instead
   */
  request(payload) {
    return this.call(payload);
  }

  /**
   * Notification
   *
   * @param payload
   * @deprecated Use .call method instead
   */
  notify(payload) {
    return this.call(payload);
  }

  /**
   * Add interceptor before request
   *
   * @param {function} callback
   * @return {Dispatcher}
   */
  interceptRequest(callback) {
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
  interceptResponse(callback) {
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
  deleteRequestInterceptor(callback) {
    this.requestInterceptors.delete(callback);

    return this;
  }

  /**
   * Delete interceptor before response
   *
   * @param {Function} callback
   * @return {Dispatcher}
   */
  deleteResponseInterceptor(callback) {
    this.requestInterceptors.delete(callback);

    return this;
  }

  /**
   * Exec request interceptors
   *
   * @param {Request|Notification|*} request
   * @return {Promise<Request|Notification>}
   * @private
   */
  async execRequestInterceptors(request) {
    if (!this.requestInterceptors.length) {
      return request;
    }
    return Array.from(this.requestInterceptors).reduce(async (acc, callback) => {
      acc = await callback(acc);
      return acc;
    }, request);
  }

  /**
   * Exec response interceptors
   *
   * @param {Response|*} response
   * @param {Request|Notification} request
   * @return {Promise<Response>}
   * @private
   */
  async execResponseInterceptors(response, request) {
    if (!this.responseInterceptors.length) {
      return response;
    }
    return Array.from(this.responseInterceptors).reduce(async (acc, callback) => {
      acc = await callback(acc, request);
      return acc;
    }, response);
  }

  /**
   * Get adapter
   *
   * @return {*}
   */
  getAdapter() {
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
  setAdapter(adapter) {
    this.adapter = adapter;

    return this;
  }
}
