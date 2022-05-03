import { execSync } from "child_process";
import fs from "fs";
import { glob } from "glob";
import { dirname, join, resolve } from "path";
import rimraf from "rimraf";
import { CliConfig, cliConfigSchema } from "src/config";


interface GenerateProtosProps {
  configPath: string;
}

const log = (msg: string) => console.log("[tsgrpc-cli] " + msg);

export async function generateProtos({ configPath }: GenerateProtosProps) {


  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const configFileContent = require(join(process.cwd(), configPath));
  const config: CliConfig = await cliConfigSchema.validateAsync(configFileContent);

  const binPath = resolve(config.binPath);
  log("Using binPath " + binPath);

  const GRPC_TOOLS_NODE_PROTOC = resolve(binPath, "grpc_tools_node_protoc");

  const TS_PROTO_PATH = resolve(binPath, "./protoc-gen-ts_proto")
  // https://github.com/improbable-eng/ts-protoc-gen/issues/15#issuecomment-317063814
  + (process.platform === "win32" ? ".cmd" : "");


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
      "--ts_proto_opt=useOptionals=messages",
      ...(config.params || []),
      `-I "${I}"`,
      ...resolvedFiles,
    ];

    execSync(`${GRPC_TOOLS_NODE_PROTOC} ${protoConfig.join(" ")}`);
  });
}
