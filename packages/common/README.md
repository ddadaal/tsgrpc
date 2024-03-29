## server: A minimal gRPC Framework

```bash
npm install --save @ddadaal/tsgrpc-server @grpc/grpc-js
```

- Strongly typed
- Plugin system with similar API to fastify ([fastify plugin API](https://www.fastify.io/docs/latest/Plugins/))
  - Use `module augmentation` to provide type information to all plugins in the project
- Graceful shutdown with register-able on close hook
- Support streaming
- Allow writing `async` function as handlers
- Integrated with [pino](https://github.com/pinojs/pino) logger