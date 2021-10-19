# tsgrpc

A minimal Node.JS TypeScript gRPC Server framework.


# Features

- Plugin system with similar API to fastify ([fastify plugin API](https://www.fastify.io/docs/latest/Plugins/))
- Graceful shutdown with register-able on close hook
- Custom logger ([source code](src/log.ts))
- Type checked env config builder (powered by [envalid](https://github.com/af/envalid)) with built-in env value interpolation (`test_${JEST_WORKER_ID}` => `test_${process.env.JEST_WORKER_ID}`)
- Utiliy functions like 
  - [`unpromisify`](src/utils/async.ts): used in async server implementation
  - [`asyncClientCall`](src/utils/async.ts): used in calling grpc client
  - [`ensureNotUndefined`](src/utils/validations.ts): check fields that must not be undefined. Return type has checked fields required!

# License 

MIT