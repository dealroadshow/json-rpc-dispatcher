import { v4 as uuid } from 'uuid';

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
    const id = uuid();
    this.socket.emit('request', JSON.stringify(request));

    if (!request.id) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      this.socket.on(`response.${ id }`, (data) => {
        resolve(data);
      });
    });
  }
}

export default SocketIo;
