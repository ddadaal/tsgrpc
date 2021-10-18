import Joi from "joi";

export interface CliConfig {
  protos: {
    path: string;
    name: string;
  }[];
}

export const cliConfigSchema = Joi.object({
  protos: Joi.array().items(Joi.object({
    path: Joi.string().description("The path to the protos"),
    name: Joi.string().description("The name of the protos"),
  })),
});
