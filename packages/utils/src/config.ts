import { customCleanEnv, strictProxyMiddleware, ValidatorSpec } from "envalid";

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

export * as envalid from "envalid";
