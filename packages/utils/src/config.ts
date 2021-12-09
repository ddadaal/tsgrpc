import { customCleanEnv, EnvError, makeValidator, Spec, strictProxyMiddleware, ValidatorSpec } from "envalid";

// convert ${a} to process.env.a
function parsePlaceholder<T extends Record<string, any>>(env: T, rawEnv: any) {
  for (const k in env) {
    if (typeof env[k] === "string") {
      env[k] = env[k].replace(/\$\{([a-zA-Z0-9_]+)\}/g, (_, p1: string) => (rawEnv as any)[p1]);
    }
  }
  return env;
}

export const envConfig = <T extends object>(
  specs: { [K in keyof T]: ValidatorSpec<T[K]> },
  envObject = process.env,
) => customCleanEnv(
    envObject, specs,
    (env, rawEnv) =>
      strictProxyMiddleware(parsePlaceholder(env, rawEnv), rawEnv),
  );

// eslint-disable-next-line max-len
// https://github.com/af/envalid/blob/086609b33f7f725042ecbfbb381a8fd61cca993b/src/validators.ts?_pjax=%23js-repo-pjax-container%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%2C%20%5Bdata-pjax-container%5D#L89
export function portOrZero<T extends number = number>(spec?: Spec<T>) {
  return makeValidator((input: string) => {
    const coerced = +input;
    if (
      Number.isNaN(coerced) ||
        `${coerced}` !== `${input}` ||
        coerced % 1 !== 0 ||
        coerced < 0 ||
        coerced > 65535
    ) {
      throw new EnvError(`Invalid port input: "${input}"`);
    }
    return coerced as T;
  })(spec);
}

export * as envalid from "envalid";

