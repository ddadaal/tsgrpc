import Joi from "joi";

export interface CliConfig {
  targetPath: string;
  protos: {
    path: string;
    name: string;
  }[];
}

export const cliConfigSchema = Joi.object({
  targetPath: Joi.string().description("The path protos are generated to. Relative to cwd.")
    .default("src/generated"),
  protos: Joi.array().items(Joi.object({
    path: Joi.string().description("The path to the protos"),
    name: Joi.string().description("The name of the protos"),
  })),
});
