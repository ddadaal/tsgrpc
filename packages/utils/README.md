# `@ddadaal/tsgrpc-utils`

```bash
npm install --save @ddadaal/tsgrpc-utils
```

# Features

- Type checked env config builder powered by [envalid](https://github.com/af/envalid)
  - with built-in env value interpolation (`test_${JEST_WORKER_ID}` => `test_${process.env.JEST_WORKER_ID}`)
- Utilitiy functions:
  - [`unpromisify`](packages/utils/src/utils/async.ts): write server implementation as async function
  - [`asyncClientCall`](packages/utils/src/utils/async.ts): calling grpc client as promise. Throws if client call causes error.
  - [`ensureNotUndefined`](packages/utils/src/utils/validations.ts): check fields that must not be undefined. Return type has checked fields required!

Logger has been moved to a separate package [@ddadaal/node-logger](https://www.npmjs.com/package/@ddadaal/node-logger).
