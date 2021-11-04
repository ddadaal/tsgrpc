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
  ],
  "params": [
    "--ts_proto_opt=stringEnums=true",
  ],
  "slient": false,
}
```

All paths are relative to pwd. 

`name` is optional and is the name of the sub directory containing files of the protos. If not specified, it defaults to `.`.

`files` is required and is the path to proto files. Glob is supported and [node-glob](https://github.com/isaacs/node-glob) is used to match files using glob.

`path` is optional and is the source directory (maps to `-I` of `protoc` command). If not specified, it defaults to `path.dirname(files)`.

`params` is optional and are extra parameters to be passed in when calling `protoc` command.

Set `slient` to `true` to avoid console output. It defaults to `false`.

Run `npx tsgrpc-cli protos`, and the files will be generated to `${targetPath}/${name}`.

If `targetPath` is undefined, it defaults to `src/generated`.

Extra config keys are in [src/config.ts](src/config.ts).

This package is a wrapper around [stephenh/ts-proto](https://github.com/stephenh/ts-proto).