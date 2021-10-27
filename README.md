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
- Allow writing `async` function as `handleUnaryCall`

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
      "files": "../protos/*.proto",
      "name": "billing"
    },
    {
      "files": "../../management/protos/*.proto",
      "name": "management"
    }
  ]
}
```

All paths are relative to pwd. 

`name` is required and is the name of the sub directory containing files of the protos.

`files` is required and is the path to proto files. Glob is supported and [node-glob](https://github.com/isaacs/node-glob) is used to match files using glob.

`path` is optional and is the source directory (maps to `-I` of `protoc` command). If not specified, it defaults to `path.dirname(files)`.

Run `npx tsgrpc-cli protos`, and the files will be generated to `${targetPath}/${name}`.

If `targetPath` is undefined, it defaults to `src/generated`.

Extra config keys are in [packages/cli/src/config.ts](packages/cli/src/config.ts).

This package is a wrapper around [stephenh/ts-proto](https://github.com/stephenh/ts-proto).

## utils: Helper components

```bash
npm install --save @ddadaal/tsgrpc-utils
```

- Type checked env config builder powered by [envalid](https://github.com/af/envalid)
  - with built-in env value interpolation (`test_${JEST_WORKER_ID}` => `test_${process.env.JEST_WORKER_ID}`)
- Utilitiy functions:
  - [`unpromisify`](packages/utils/src/utils/async.ts): write server implementation as async function
  - [`asyncClientCall`](packages/utils/src/utils/async.ts): calling grpc client as promise. Throws if client call causes error.
  - [`ensureNotUndefined`](packages/utils/src/utils/validations.ts): check fields that must not be undefined. Return type has checked fields required!

# License

MIT
