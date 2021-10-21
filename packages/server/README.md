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
- Allow writing `async` function as `handleUnaryCall`

# License 

MIT