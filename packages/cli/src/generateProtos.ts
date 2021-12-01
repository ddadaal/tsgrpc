import { CliConfig, cliConfigSchema } from "src/config";

import { dirname, join, resolve } from "path";
import rimraf from "rimraf";
import fs from "fs";
import { execSync } from "child_process";
import { glob } from "glob";

// like: node_modules\ts-proto\build\plugin.js
const TS_PROTO_SCRIPT_PATH = require.resolve("ts-proto");

// to: node_modules\.bin
const DOT_BIN_DIR = resolve(TS_PROTO_SCRIPT_PATH, "../../../.bin");

const GRPC_TOOLS_NODE_PROTOC = resolve(DOT_BIN_DIR, "grpc_tools_node_protoc");

const TS_PROTO_PATH = resolve(DOT_BIN_DIR, "./protoc-gen-ts_proto")
  // https://github.com/improbable-eng/ts-protoc-gen/issues/15#issuecomment-317063814
  + (process.platform === "win32" ? ".cmd" : "");

interface GenerateProtosProps {
  configPath: string;
}

const log = (msg: string) => console.log("[tsgrpc-cli] " + msg);

export async function generateProtos({ configPath }: GenerateProtosProps) {

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const configFileContent = require(join(process.cwd(), configPath));
  const config: CliConfig = await cliConfigSchema.validateAsync(configFileContent);

  rimraf.sync(config.targetPath);

  config.protos.forEach(({ files, path, name }) => {

    const modelDir = join(config.targetPath, name);

    fs.mkdirSync(modelDir, { recursive: true });

    const I = path ?? dirname(files);

    const resolvedFiles = glob.sync(files);

    if (!config.slient) {
      log(`Generating protobuf files ${files} in path ${I}. Resolved ${resolvedFiles.length} files.`);
    }

    const protoConfig = [
      `--plugin=protoc-gen-ts_proto="${TS_PROTO_PATH}"`,
      "--ts_proto_opt=esModuleInterop=true",
      "--ts_proto_opt=outputServices=grpc-js",
      `--ts_proto_out="${modelDir}"`,
      "--ts_proto_opt=useOptionals=true",
      ...(config.params || []),
      `-I "${I}"`,
      ...resolvedFiles,
    ];

    execSync(`${GRPC_TOOLS_NODE_PROTOC} ${protoConfig.join(" ")}`);
  });
}
