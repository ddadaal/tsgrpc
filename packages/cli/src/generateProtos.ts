import { spawn } from "child_process";
import fs from "fs";
import { glob } from "glob";
import { dirname, join, resolve } from "path";
import rimraf from "rimraf";
import { CliConfig, cliConfigSchema } from "src/config";
import { promisify } from "util";

const spawnAsync = promisify(spawn);

interface GenerateProtosProps {
  configPath: string;
}


const presets = {
  "nice-grpc":  "--ts_proto_opt=outputServices=nice-grpc,outputServices=generic-definitions",
  "grpc-js": "--ts_proto_opt=outputServices=grpc-js",
} as const;

export async function generateProtos({ configPath }: GenerateProtosProps) {


  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const configFileContent = require(join(process.cwd(), configPath));
  const config: CliConfig = cliConfigSchema.parse(configFileContent);

  const log = (msg: string) => {
    if (!config.slient) { console.log("[tsgrpc-cli] " + msg); }
  };

  const binPath = resolve(config.binPath);
  log("Using binPath " + binPath);

  const GRPC_TOOLS_NODE_PROTOC = resolve(binPath, "grpc_tools_node_protoc");

  const TS_PROTO_PATH = resolve(binPath, "./protoc-gen-ts_proto")
  // https://github.com/improbable-eng/ts-protoc-gen/issues/15#issuecomment-317063814
  + (process.platform === "win32" ? ".cmd" : "");


  rimraf.sync(config.targetPath);

  for (const { files, path, name } of config.protos) {
    const modelDir = join(config.targetPath, name);

    await fs.promises.mkdir(modelDir, { recursive: true });

    const I = path ?? dirname(files);

    const resolvedFiles = await promisify(glob)(files);

    if (resolvedFiles.length === 0) {
      log(`${files} doesn't match any files.`);
      continue;
    }

    log(`Generating protobuf files ${files} in path ${I}. Resolved ${resolvedFiles.length} files.`);

    const protoConfig = [
      `--plugin=protoc-gen-ts_proto="${TS_PROTO_PATH}"`,
      "--ts_proto_opt=esModuleInterop=true",
      presets[config.preset],
      `--ts_proto_out="${modelDir}"`,
      "--ts_proto_opt=useOptionals=messages",
      ...(config.params || []),
      `-I "${I}"`,
      ...resolvedFiles,
    ];


    await spawnAsync(GRPC_TOOLS_NODE_PROTOC, protoConfig, { stdio: "inherit" });
  }

}
