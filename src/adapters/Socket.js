import Notification from '../jsonrpc/request/Notification';
import parse from '../jsonrpc/parse';
import JsonRpcError from '../jsonrpc/response/JsonRpcError';

const RESPONSE_TIMEOUT = 300000; // 300000 seconds

class Socket {
  constructor(sockJsConnection) {
    this.connection = sockJsConnection;
  }

  /**
   * Perform rpc call
   *
   * @param request
   * @return {Promise<unknown>|Promise<void>}
   */
  call(request) {
    this.connection.send(JSON.stringify(request));

    if (request instanceof Notification) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      let requestTimeout = setTimeout(
        () => reject(JsonRpcError.internalError({ data: 'Request timeout' })),
        RESPONSE_TIMEOUT
      );

      this.connection.onMessage = (message) => {
        const response = parse(message);
        if (this.isResponseMatchRequest(response, request)) {
          clearTimeout(requestTimeout);
          resolve();
        }
      };
    });
  }

  /**
   * Will match of response corresponds to request using request id
   *
   * @param response
   * @param request
   * @return {boolean}
   */
  isResponseMatchRequest(response, request) {
    const responseId = Array.isArray(response)
      ? response.filter((rpcResponse) => !!rpcResponse.id)[0]?.id
      : response.id;

    const requestId = Array.isArray(request)
      ? request.filter((rpcRequest) => !!rpcRequest.id)[0]?.id
      : request.id;

    return requestId === responseId;
  }
}

export default Socket;
