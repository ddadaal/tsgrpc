import Joi from "joi";
import path from "path";

export interface CliConfig {
  slient: boolean;
  targetPath: string;
  binPath: string;
  params?: string[];
  protos: {
    files: string;
    path?: string;
    name: string;
  }[];
}

// like: node_modules\ts-proto\build\plugin.js
const TS_PROTO_SCRIPT_PATH = require.resolve("ts-proto");

// to: node_modules\.bin
const DOT_BIN_DIR = path.resolve(TS_PROTO_SCRIPT_PATH, "../../../.bin");

export const cliConfigSchema = Joi.object({
  targetPath: Joi.string().description("The path protos are generated to. Relative to cwd.")
    .default("src/generated"),
  binPath: Joi.string()
    .description("The path to .bin containing grpc_tools_node_protoc and protoc-gen-ts_proto. Relative to cwd.")
    .default(DOT_BIN_DIR),
  protos: Joi.array().items(Joi.object({
    files: Joi.string().description("Files to be generated. Support glob.")
      .required(),
    path: Joi.string().description("The path to the protos. If not specified, path.dirname(files) is used.")
      .optional(),
    name: Joi.string().description(`
        The name of subdir where the protos will be stored.
        If not specified, files will be stored at targetPath directly.`)
      .default("."),
  })),
  params: Joi.array().items(
    Joi.string().description("Extra params to be passed when calling protoc"),
  ).optional(),
  slient: Joi.boolean().description("Should CLI output messages to console")
    .default(false),
});
