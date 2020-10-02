import Error from './Error';

export default class JsonRpcError extends Error {
  static invalidRequest({ id, message = 'Invalid request', data }) {
    return new JsonRpcError({
      id, error: { message, code: -32600, data }
    });
  }

  static methodNotFound({ id, message = 'Method not found', data }) {
    return new JsonRpcError({
      id, error: { message, code: -32601, data }
    });
  }

  static invalidParams({ id, message = 'Invalid params', data }) {
    return new JsonRpcError({
      id, error: { message, code: -32602, data }
    });
  }

  static internalError({ id, message = 'Internal error', data }) {
    return new JsonRpcError({
      id, error: { message, code: -32603, data }
    });
  }

  static parseError({ id, message = 'Parse error', data }) {
    return new JsonRpcError({
      id, error: { message, code: -32700, data }
    });
  }
}
