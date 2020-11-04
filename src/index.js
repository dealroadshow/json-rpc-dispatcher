import Fetch from './adapters/Fetch';
import SocketIo from './adapters/SocketIo';
import Socket from './adapters/Socket';
import Dispatcher from './Dispatcher';
import transformErrorToException from './interceptors/response/transformErrorToException';
import Notification from './jsonrpc/request/Notification';
import Request from './jsonrpc/request/Request';
import Error from './jsonrpc/response/Error';
import JsonRpcError from './jsonrpc/response/JsonRpcError';
import Success from './jsonrpc/response/Success';
import parse from './jsonrpc/parse';

const adapters = {
  Fetch,
  SocketIo,
  Socket
};

const interceptors = {
  response: {
    transformErrorToException
  }
};

export default Dispatcher;

const RpcError = Error;
export { Request, Notification, Success, Error, RpcError, JsonRpcError, adapters, interceptors, parse };
