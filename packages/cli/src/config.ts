import path from "path";
import { z } from "zod";

const DOT_BIN_DIR = path.resolve(process.cwd(), "node_modules/.bin");

export const cliConfigSchema = z.object({
  targetPath: z.string({ description: "The path protos are generated to. Relative to cwd." })
    .default("src/generated"),
  binPath: z.string({
    description: "The path to .bin containing grpc_tools_node_protoc and protoc-gen-ts_proto. Relative to cwd.",
  }).default(DOT_BIN_DIR),
  protos: z.array(z.object({
    files: z.string({ description: "Files to be generated. Support glob." }),
    path: z.string({ description: "The path to the protos. If not specified, path.dirname(files) is used." })
      .optional(),
    name: z.string({ description: `
        The name of subdir where the protos will be stored.
        If not specified, files will be stored at targetPath directly.` })
      .default("."),
  })),
  params: z.array(
    z.string({ description: "Extra params to be passed when calling protoc" }),
  ).optional(),
  slient: z.boolean({ description: "Should CLI output messages to console" })
    .default(false),
});

export type CliConfig = z.infer<typeof cliConfigSchema>;
