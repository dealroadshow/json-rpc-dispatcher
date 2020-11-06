import parse from './jsonrpc/parse';

export default class Dispatcher {
  /**
   * @param {Object} adapter
   */
  constructor(adapter) {
    this.adapter = adapter;
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }

  /**
   * Execute remote procedure
   *
   * @param {Request|Notification} payload
   *
   * @return {Success|Error}
   */
  async call(payload) {
    const jsonRpcPayload = this.execRequestInterceptors(parse(payload));

    let response;
    try {
      response = await this.getAdapter().call(jsonRpcPayload);
    } catch (error) {
      response = error;
    }
    if (!jsonRpcPayload?.id) {
      return true;
    }

    return this.execResponseInterceptors(parse(response), jsonRpcPayload);
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
    this.requestInterceptors.push(callback);

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
    this.responseInterceptors.push(callback);

    return this;
  }

  /**
   * Delete interceptor before response
   *
   * @param {function} callback
   * @return {Dispatcher}
   */
  deleteRequestInterceptor(callback) {
    this.requestInterceptors = this.requestInterceptors.filter((el) => el !== callback);

    return this;
  }

  /**
   * Delete interceptor before response
   *
   * @param {Function} callback
   * @return {Dispatcher}
   */
  deleteResponseInterceptor(callback) {
    this.requestInterceptors = this.responseInterceptors.filter((el) => el !== callback);

    return this;
  }

  /**
   * Exec request interceptors
   *
   * @param {Request|Notification|*} payload
   * @return {Request|Notification}
   * @private
   */
  execRequestInterceptors(payload) {
    if (!this.requestInterceptors.length) {
      return payload;
    }
    this.requestInterceptors.forEach((callback) => { payload = callback(payload); });

    return payload;
  }

  /**
   * Exec response interceptors
   *
   * @param {Response|*} response
   * @param {Request|Notification} payload
   * @return {Response}
   * @private
   */
  execResponseInterceptors(response, payload) {
    if (!this.responseInterceptors.length) {
      return response;
    }
    this.responseInterceptors.forEach((callback) => { response = callback(response, payload); });

    return response;
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
