import { CliConfig, cliConfigSchema } from "src/config";

import { dirname, join, resolve } from "path";
import rimraf from "rimraf";
import fs from "fs";
import { execSync } from "child_process";

// The binaries are installed on the root's .bin
// So execute them from pwd

const TS_PROTO_PATH = resolve("./node_modules/.bin/protoc-gen-ts_proto")
  // https://github.com/improbable-eng/ts-protoc-gen/issues/15#issuecomment-317063814
  + (process.platform === "win32" ? ".cmd" : "");

const GRPC_TOOLS_NODE_PROTOC = resolve("./node_modules/.bin/grpc_tools_node_protoc");

interface GenerateProtosProps {
  configPath: string;
}

export async function generateProtos({ configPath }: GenerateProtosProps) {

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const configFileContent = require(join(process.cwd(), configPath));
  const config: CliConfig = await cliConfigSchema.validateAsync(configFileContent);

  rimraf.sync(config.targetPath);

  config.protos.forEach(({ files, path, name }) => {
    const modelDir = join(config.targetPath, name);

    fs.mkdirSync(modelDir, { recursive: true });

    const I = path ?? dirname(files);

    if (!config.slient) {
      console.log(`[tsgrpc-cli] Generating protobuf files ${files} in path ${I}`);
    }

    const protoConfig = [
      `--plugin=protoc-gen-ts_proto="${TS_PROTO_PATH}"`,
      "--ts_proto_opt=esModuleInterop=true",
      "--ts_proto_opt=outputServices=grpc-js",
      `--ts_proto_out="${modelDir}"`,
      "--ts_proto_opt=useOptionals=true",
      `-I "${I}" "${files}"`,
    ];

    // https://github.com/agreatfool/grpc_tools_node_protoc_ts/tree/master/examples
    execSync(`${GRPC_TOOLS_NODE_PROTOC} ${protoConfig.join(" ")}`);
  });
}
