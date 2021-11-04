import Joi from "joi";

export interface CliConfig {
  slient: boolean;
  targetPath: string;
  params?: string[];
  protos: {
    files: string;
    path?: string;
    name: string;
  }[];
}

export const cliConfigSchema = Joi.object({
  targetPath: Joi.string().description("The path protos are generated to. Relative to cwd.")
    .default("src/generated"),
  protos: Joi.array().items(Joi.object({
    files: Joi.string().description("Files to be generated. Support wildcard *.")
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
