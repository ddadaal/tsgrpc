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

Extra config keys are in [src/config.ts](src/config.ts).