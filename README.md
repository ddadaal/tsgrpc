# tsgrpc

![npm](https://img.shields.io/npm/v/@ddadaal/tsgrpc)

A minimal Node.JS TypeScript gRPC Server framework.

# Install

```
npm install --save @ddadaal/tsgrpc
```

# Features

- Plugin system with similar API to fastify ([fastify plugin API](https://www.fastify.io/docs/latest/Plugins/))
  - Use `module augmentation` to provide type information to all plugins in the project
- Graceful shutdown with register-able on close hook
- Custom logger ([source code](src/log.ts))
- Allow writing `async` function as `handleUnaryCall`
- Built in, simple config gRPC code generation
- Type checked env config builder with built-in env value interpolation (`test_${JEST_WORKER_ID}` => `test_${process.env.JEST_WORKER_ID}`)
- Utiliy functions like 
  - [`unpromisify`](src/utils/async.ts): write server implementation as async function
  - [`asyncClientCall`](src/utils/async.ts): calling grpc client as promise. Throws if client call causes error.
  - [`ensureNotUndefined`](src/utils/validations.ts): check fields that must not be undefined. Return type has checked fields required!

# Proto Generation

Create `tsgrpc.json` with the following content to specify paths to proto files

```
{
  "targetPath": "src/generated",
  "protos": [
    {
      "path": "../protos",
      "name": "billing"
    },
    {
      "path": "../../management/protos",
      "name": "management"
    }
  ]
}
```

All paths are relative to pwd. The `name` field will be used as the name of the sub directory containing files of the protos.

Run `npx tsgrpc protos`, and the files will be generated to `${targetPath}/${name of the proto}`.

If `targetPath` is undefined, it defaults to `src/generated`.

# Dependencies

- [envalid](https://github.com/af/envalid)
- [grpc_tools_node_protoc_ts](https://github.com/agreatfool/grpc_tools_node_protoc_ts)

# License 

MIT