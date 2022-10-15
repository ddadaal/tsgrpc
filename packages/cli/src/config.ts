import path from "path";
import { z } from "zod";

const DOT_BIN_DIR = path.resolve(process.cwd(), "node_modules/.bin");

const protoCommonOptions = z.object({
  target: z.string({ description: `
        The name of subdir (relative to targetPath) where the protos will be stored.
        If not specified, files will be stored at targetPath directly.` })
    .default("."),
});

export const cliConfigSchema = z.object({
  targetPath: z.string({ description: "The path protos are generated to. Relative to cwd." })
    .default("src/generated"),
  binPath: z.string({
    description: "The path to .bin containing grpc_tools_node_protoc and protoc-gen-ts_proto. Relative to cwd.",
  }).default(DOT_BIN_DIR),
  protos: z.array(
    z.discriminatedUnion("source", [
      protoCommonOptions.extend({ source: z.literal("local"), local: z.object({
        files: z.string({ description: "Glob to match proto files to be generated" }),
        protoPaths: z.union([z.string().array(), z.string()],
          { description: "The directories to search for imports. Default: path.dirname(files)" },
        ).optional(),
      }) }),
      protoCommonOptions.extend({ source: z.literal("git"), git: z.object({
        repo: z.string({ description: "The git repo URL" }),
        branch: z.string({ description: "The branch the repo is cloned from." }).optional(),
        files: z.string({ description: "Glob to match proto files inside the repo, relative to the repo" }),
        protoPaths: z.union([z.string().array(), z.string()],
          { description: "The directories to search for imports. Relatove to the repo. Default: path.dirname(files)" },
        ).optional(),
      }) }),
    ]),
  ),
  preset: z.enum(["grpc-js", "nice-grpc"], { description: "The preset of parameters" })
    .default("grpc-js"),
  params: z.array(
    z.string({ description: "Extra params to be passed when calling protoc" }),
  ).optional(),
  slient: z.boolean({ description: "Should CLI output messages to console" })
    .default(false),
});

export type CliConfig = z.infer<typeof cliConfigSchema>;
