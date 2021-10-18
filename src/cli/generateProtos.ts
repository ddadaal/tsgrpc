import { CliConfig, cliConfigSchema } from "src/cli/config";

import path from "path";
import rimraf from "rimraf";
import fs from "fs";
import { execSync } from "child_process";

const PROTOC_GEN_TS_PATH = path.join(__dirname, "../../node_modules/.bin/protoc-gen-ts")
  // https://github.com/improbable-eng/ts-protoc-gen/issues/15#issuecomment-317063814
  + (process.platform === "win32" ? ".cmd" : "");

const GRPC_TOOLS_NODE_PROTOC = path.join(__dirname, "../../node_modules/.bin/grpc_tools_node_protoc");

interface GenerateProtosProps {
  configPath: string;
  targetDir: string;
}

export async function generateProtos({ configPath, targetDir }: GenerateProtosProps) {

  rimraf.sync(targetDir);

  const configFileContent = JSON.parse(await fs.promises.readFile(configPath, "utf-8"));
  const config: CliConfig = await cliConfigSchema.validateAsync(configFileContent);

  await Promise.all(config.protos.map(async ({ path: protosPath, name }) => {
    const modelDir = path.join(targetDir, name);

    await fs.promises.mkdir(modelDir, { recursive: true });

    const protoConfig = [
      `--plugin="protoc-gen-ts=\"${PROTOC_GEN_TS_PATH}"\"`,
      `--grpc_out="grpc_js:\"${modelDir}\"" `,
      `--js_out="import_style=commonjs,binary:\"${modelDir}\"" `,
      `--ts_out="grpc_js:\"${modelDir}\"" `,
      `--proto_path \"${protosPath}\" \"${protosPath}/*.proto\"`,
    ];

    // https://github.com/agreatfool/grpc_tools_node_protoc_ts/tree/master/examples
    execSync(`${GRPC_TOOLS_NODE_PROTOC} ${protoConfig.join(" ")}`);
  }),
  );

}
