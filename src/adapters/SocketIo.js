class SocketIo {
  /**
   *
   * @param {io} socket
   */
  constructor(socket) {
    this.socket = socket;
  }

  /**
   * Send request to server
   *
   * @param {string} request
   *
   * @return {Promise}
   */
  call(request) {
    return new Promise((resolve) => {
      this.socket.emit('request', JSON.stringify(request));

      if (!request.id) {
        resolve();
        return;
      }

      this.socket.on(`response.${ request.id }`, (data) => {
        resolve(data);
      });
    });
  }
}

export default SocketIo;
