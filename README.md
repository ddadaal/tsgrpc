# tsgrpc

A minimal Node.JS TypeScript gRPC Server framework.


# Features

- Plugin system with similar API to fastify ([fastify plugin API](https://www.fastify.io/docs/latest/Plugins/))
  - Use `module augmentation` to provide type information to all plugins in the project
- Graceful shutdown with register-able on close hook
- Custom logger ([source code](src/log.ts))
- Allow writing `async` function as `handleUnaryCall`
- Type checked env config builder (powered by [envalid](https://github.com/af/envalid)) with built-in env value interpolation (`test_${JEST_WORKER_ID}` => `test_${process.env.JEST_WORKER_ID}`)
- Utiliy functions like 
  - [`unpromisify`](src/utils/async.ts): write server implementation as async function
  - [`asyncClientCall`](src/utils/async.ts): calling grpc client as promise. Throws if client call causes error.
  - [`ensureNotUndefined`](src/utils/validations.ts): check fields that must not be undefined. Return type has checked fields required!

# License 

MIT