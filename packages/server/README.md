# tsgrpc

![npm](https://img.shields.io/npm/v/@ddadaal/tsgrpc)

A minimal Node.JS TypeScript gRPC Server framework.

# Install

```
npm install --save @ddadaal/tsgrpc-server
```

# Features

- Plugin system with similar API to fastify ([fastify plugin API](https://www.fastify.io/docs/latest/Plugins/))
  - Use `module augmentation` to provide type information to all plugins in the project
- Graceful shutdown with register-able on close hook
- Custom logger ([source code](src/log.ts))
- Allow writing `async` function as `handleUnaryCall`
- Type checked env config builder with built-in env value interpolation (`test_${JEST_WORKER_ID}` => `test_${process.env.JEST_WORKER_ID}`)

# Dependencies

- [envalid](https://github.com/af/envalid)
- [grpc_tools_node_protoc_ts](https://github.com/agreatfool/grpc_tools_node_protoc_ts)

# License 

MIT