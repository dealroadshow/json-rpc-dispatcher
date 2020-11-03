class Fetch {
  /**
   *
   * @param {string} url
   * @param {Object} options
   */
  constructor(url = '/', options = {}) {
    if (!options.method) {
      options.method = 'POST';
    }
    if (!options.headers) {
      options.headers = {};
    }
    if (!options.headers['Content-Type']) {
      options.headers['Content-Type'] = 'application/json';
    }
    if (!options.credentials) {
      options.credentials = 'include';
    }

    this.options = options;
    this.url = url;
  }

  /**
   * Send request to server
   *
   * @param {string} request
   *
   * @return {Promise}
   */
  call(request) {
    this.addMethodHeader(request);

    return fetch(this.url, { body: JSON.stringify(request), ...this.options })
      .then((data) => data.json());
  }

  /**
   * Adds method header for logging purposes
   *
   * @param request
   */
  addMethodHeader(request) {
    if (!Array.isArray(request)) {
      this.options.headers['X-JsonRpc-Method'] = request.method;
    } else {
      this.options.headers['X-JsonRpc-Method'] = request.reduce((acc, request) => acc.push(request.method), []).join(',');
    }

    return this;
  }
}

export default Fetch;
