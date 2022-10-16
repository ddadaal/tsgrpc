## client: libs to call gRPC services

```bash
npm install --save @ddadaal/tsgrpc-client @grpc/grpc-js
```

- Calling gRPC services with strongly typed interfaces
- Supports all rpc types
  - unary [example](../example/tests/test.test.ts)
  - request stream [example](../example/tests/test.test.ts)
  - reply stream [example](../example/tests/test.test.ts)
  - duplex stream [example](../example/tests/test.test.ts)