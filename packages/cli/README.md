# cli: Declarative local and remote gRPC code generation 

This package is a wrapper around [stephenh/ts-proto](https://github.com/stephenh/ts-proto) that 

- allows to configure proto generation declaratively.
- supports generating from git repository

```bash
npm install -D @ddadaal/tsgrpc-cli
```

## Usage

Create `tsgrpc.json` under the project root with the following content to specify paths to proto files.

```json
{
  "targetPath": "src/generated",
  "binPath": "../packages/cli/node_modules/.bin",
  "protos": [
    {
      "source": "local",
      "local": {
        "protoPaths": "./protos",
        "files": "./protos/*.proto"
      },
      "target": "local"
    },
    {
      "source": "git",
      "git": {
        "repo": "git@github.com:ddadaal/tsgrpc",
        "branch": "master",
        "files": "example/protos/**/*.proto",
        "protoPaths": "example/protos"
      },
      "target": "git"
    }
  ],
  "params": [
    "--ts_proto_opt=stringEnums=true"
  ],
  "slient": false
}
```

All paths are relative to pwd. 

| Option                    | Required?                     | Description                                                                                                                                                                                                                           | default                |
| ------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `targetPath`              | false                         | The root dir where the generated files will be placed                                                                                                                                                                                 | `src/generated`        |
| `protos`                  | **true**                      | The definitions of the proto files                                                                                                                                                                                                    |                        |
| `proto.source`            | **true**                      | The source of the proto files. Choices: <br/>`local`: local files <br/> `git`: git repo                                                                                                                                               |
| `proto.local`             | if `proto.source === "local"` | The local proto file information                                                                                                                                                                                                      |
| `protos.local.files`      | **true**                      | The path to proto files relative to cwd. Glob is supported. [node-glob](https://github.com/isaacs/node-glob) is used to match files using glob.                                                                                       |                        |
| `protos.local.protoPaths` | false                         | Proto files' proto paths relative to cwd (maps to `--proto_path` of `protoc` command). Can be `string` or `string[]`                                                                                                                  | `path.dirnames(files)` |
| `proto.git`               | if `proto.source === "git"`   | The local proto file information                                                                                                                                                                                                      |
| `protos.local.repo`       | **true**                      | The repo URL                                                                                                                                                                                                                          |                        |
| `protos.local.branch`     | false                         | The branch or tag of repo. Cannot be commit SHA                                                                                                                                                                                       |                        |
| `protos.local.files`      | **true**                      | The path to proto files relative to repo root. Glob is supported. [node-glob](https://github.com/isaacs/node-glob) is used to match files using glob.                                                                                 |                        |
| `protos.local.protoPaths` | false                         | Proto files' proto paths relative to repo root(maps to `--proto_path` of `protoc` command). Can be `string` or `string[]`                                                                                                             | `path.dirnames(files)` |
| `protos.target`           | false                         | The directory under `targetPath` where the generated files of this part of proto files will placed.                                                                                                                                   | `.`                    |
| `preset`                  | false                         | Parameters preset. Different preset generates files to be used with different framework. Choices: <br/>`nice-grpc` for [nice-grpc](https://github.com/deeplay-io/nice-grpc) <br/>`grpc-js` for `grpc-js` and `@ddadaal/tsgrpc-server` | `grpc-js`              |
| `params`                  | false                         | Extra parameters to be passed in to `protoc` command                                                                                                                                                                                  | `[]`                   |
| `slient`                  | false                         | Don't console.log anything                                                                                                                                                                                                            | `false`                |

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

## `ts-proto` v2 migration from `v0.15`

From v0.15, this package uses `ts-proto` v2 to generate ts files from protos. From v2 `ts-proto` has migrated to use `@bufbuild/protobuf` instead of the old `protobufjs` package for protobuf encoding and decoding ([changelog](https://github.com/stephenh/ts-proto?tab=readme-ov-file#ts-proto-2x-release-notes)), so after you updated the package, you need to migrate your package.json as follows:

1. Remove `protobufjs` and `long` packages
2. Add `@bufbuild/protobuf` package