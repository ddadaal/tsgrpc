import fs from "fs";
import { glob } from "glob";
import { dirname, join, resolve } from "path";
import { rimraf } from "rimraf";
import { CliConfig, cliConfigSchema } from "src/config";
import { clone } from "src/git";
import { executeCommand } from "src/utils";
import { promisify } from "util";


interface GenerateProtosProps {
  configPath: string;
}

function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

const presets = {
  "nice-grpc":  "--ts_proto_opt=outputServices=nice-grpc,outputServices=generic-definitions",
  "grpc-js": "--ts_proto_opt=outputServices=grpc-js",
} as const;

const windows = process.platform === "win32";

// https://github.com/improbable-eng/ts-protoc-gen/issues/15#issuecomment-317063814
const exeExt = windows ? ".cmd" : "";

// https://github.com/isaacs/node-glob#windows
const globResolve = (...pathSegments: string[]) => {
  const result = resolve(...pathSegments);
  if (windows) {
    return result.replaceAll(/\\/g, "/");
  } else {
    return result;
  }
};

export async function generateProtos({ configPath }: GenerateProtosProps) {


  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const configFileContent = require(join(process.cwd(), configPath));
  const config: CliConfig = cliConfigSchema.parse(configFileContent);

  const log = (msg: string, ...params: any[]) => {
    if (!config.slient) { console.log("[tsgrpc-cli] " + msg, ...params); }
  };

  const binPath = resolve(config.binPath);
  log("Using binPath " + binPath);

  const GRPC_TOOLS_NODE_PROTOC = resolve(binPath, "grpc_tools_node_protoc" + exeExt);

  const TS_PROTO_PATH = resolve(binPath, "./protoc-gen-ts_proto" + exeExt);

  await rimraf(config.targetPath);

  for (const proto of config.protos) {
    let files: string;
    let protoPaths: string[];

    if (proto.source === "git") {
      const target = await clone(proto.git.repo, log, proto.git.branch);
      files = join(target, proto.git.files);
      protoPaths = proto.git.protoPaths ? toArray(proto.git.protoPaths).map((x) => join(target, x)) : [dirname(files)];
    } else {
      files = proto.local.files;
      protoPaths = proto.local.protoPaths ? toArray(proto.local.protoPaths) : [dirname(files)];
    }

    const modelDir = join(config.targetPath, proto.target);

    await fs.promises.mkdir(modelDir, { recursive: true });

    const resolvedFiles = await promisify(glob)(globResolve(files));

    if (resolvedFiles.length === 0) {
      log(`${files} doesn't match any files.`);
      continue;
    }

    log(`Generating ${files} (${resolvedFiles.length} files) with proto_paths ${protoPaths} to ${modelDir}.`);

    const protoConfig = [
      `--plugin=protoc-gen-ts_proto=${TS_PROTO_PATH}`,
      "--ts_proto_opt=esModuleInterop=true",
      presets[config.preset],
      `--ts_proto_out=${modelDir}`,
      "--ts_proto_opt=useOptionals=messages",
      ...protoPaths.map((protoPath) => `--proto_path=${globResolve(protoPath)}`),
      ...(config.params || []),
      ...resolvedFiles,
    ];


    await executeCommand(GRPC_TOOLS_NODE_PROTOC, protoConfig);
  }

}
