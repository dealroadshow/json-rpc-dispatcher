#How to

```js
import Rpc from 'json-rpc-dispatcher';
import { Request, Notification, Success, Error, JsonRpcError } from 'json-rpc-dispatcher';
 
let rpc = new Rpc('http://api.com');
 
let req1 = new Request({ id: 1, params: { param1: 'param1', param2: 'param2' } });
let req2 = new Request({ id: 2, params: { param1: 'param1', param2: 'param2' } });
 
let not1 = new Notification({ params: { param1: 'param1', param2: 'param2' } });
let not2 = new Notification({ params: { param1: 'param1', param2: 'param2' } });
 
let res = rpc.request(req1);
let resBatch = rpc.request([req1, req2]);
 
rpc.notify(not1);
rpc.notify([not1, not2]);
```