# `@ddadaal/tsgrpc-utils`

```bash
npm install --save @ddadaal/tsgrpc-utils
```

# Features

- Custom logger ([source code](packages/utils/src/logger.ts))
- Type checked env config builder powered by [envalid](https://github.com/af/envalid)
  - with built-in env value interpolation (`test_${JEST_WORKER_ID}` => `test_${process.env.JEST_WORKER_ID}`)
- Utilitiy functions:
  - [`unpromisify`](packages/utils/src/utils/async.ts): write server implementation as async function
  - [`asyncClientCall`](packages/utils/src/utils/async.ts): calling grpc client as promise. Throws if client call causes error.
  - [`ensureNotUndefined`](packages/utils/src/utils/validations.ts): check fields that must not be undefined. Return type has checked fields required!

# Use logger only

If you only need to use `logger` and don't want `gRPC` stuff, you can import the logger directly.

```ts
import { createLogger } from "@ddadaal/tsgrpc/lib/logger";
```