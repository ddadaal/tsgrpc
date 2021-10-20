# tsgrpc

Utilities that help to work with gRPC using TypeScript.

# Packages

## server: A minimal gRPC Framework

```bash
npm install --save @ddadaal/tsgrpc-server
```

- Plugin system with similar API to fastify ([fastify plugin API](https://www.fastify.io/docs/latest/Plugins/))
  - Use `module augmentation` to provide type information to all plugins in the project
- Graceful shutdown with register-able on close hook
- Custom logger ([source code](src/log.ts))
- Allow writing `async` function as `handleUnaryCall`
- Type checked env config builder with built-in env value interpolation (`test_${JEST_WORKER_ID}` => `test_${process.env.JEST_WORKER_ID}`)

## cli: gRPC code generation with minimal configuration

```bash
npm install --save @ddadaal/tsgrpc-cli
```

Create `tsgrpc.json` with the following content to specify paths to proto files.

```json
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

Run `npx tsgrpc-cli protos`, and the files will be generated to `${targetPath}/${name of the proto}`.

If `targetPath` is undefined, it defaults to `src/generated`.

## utils: Helper functions

```bash
npm install --save @ddadaal/tsgrpc-utils
```

- [`unpromisify`](packages/utils/src/utils/async.ts): write server implementation as async function
- [`asyncClientCall`](packages/utils/src/utils/async.ts): calling grpc client as promise. Throws if client call causes error.
- [`ensureNotUndefined`](packages/utils/src/utils/validations.ts): check fields that must not be undefined. Return type has checked fields required!

# License

MIT
