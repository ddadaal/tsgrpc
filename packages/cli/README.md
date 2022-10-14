# cli: Declarative gRPC code generation 

This package is a wrapper around [stephenh/ts-proto](https://github.com/stephenh/ts-proto) that allows to configure proto generation declaratively.

```bash
npm install -D @ddadaal/tsgrpc-cli
```

## Usage

Create `tsgrpc.json` under the project root with the following content to specify paths to proto files.

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
  "slient": false
}
```

All paths are relative to pwd. 

| Option         | Required? | Description                                                                                                                     | default                |
| -------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `targetPath`   | false     | The root dir where the generated files will be placed                                                                           | `src/generated`        |
| `protos`       | **true**  | The definitions of the proto files                                                                                              |                        |
| `protos.files` | **true**  | The path to proto files. Glob is supported. [node-glob](https://github.com/isaacs/node-glob) is used to match files using glob. |                        |
| `protos.name`  | false     | The directory under `targetPath` where the generated files of this part of proto files will placed.                             | `.`                    |
| `protos.path`  | false     | Proto files' source directory (maps to `-I` of `protoc` command)                                                                | `path.dirnames(files)` |
| `params`       | false     | extra parameters to be passed in to `protoc` command                                                                            | `[]`                   |
| `params`       | false     | extra parameters to be passed in to `protoc` command                                                                            | `[]`                   |
| `slient`       | false     | don't console.log anything                                                                                                      | `false`                |

Run the following command, and the files will be generated to `${targetPath}/${name}`.

```bash
npx tsgrpc-cli protos
```

## pnpm Compatibility

Unlike npm and yarn, pnpm [doesn't create a flat node_modules structure](https://pnpm.io/motivation#creating-a-non-flat-node_modules-directory), and as a result, pnpm [doesn't install binaries to dependencies](https://github.com/pnpm/pnpm/issues/3566). 

This behavior makes pnpm incompatible with `@ddadaal/tsgrpc-cli`, since `@ddadaal/tsgrpc-cli` uses `grpc-tools` and `ts-proto` as dependencies and requires their binaries to be installed under `node_modules/.bin`.

 To resolve this, you can use pnpm's [public-host-pattern](`https://pnpm.io/npmrc#public-hoist-pattern`) config to explicitly hoist these binaries under `node_modules/.bin`.

Create a `.npmrc` under the root of your project with following content:

```ini
public-hoist-pattern[]=ts-proto
public-hoist-pattern[]=grpc-tools
; The default value for this config is *eslint* and *prettier*
; if you are using them, add them back
public-hoist-pattern[]=*eslint*
public-hoist-pattern[]=*prettier*
```