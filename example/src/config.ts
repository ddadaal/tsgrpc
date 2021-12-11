import { envConfig, envalid, portOrZero } from "@ddadaal/tsgrpc-utils";

const { host } = envalid;

// Define env vars
// Will be type checked when config is imported.
// Fails the program if env is not correctly set.
export const config = envConfig({
  HOST: host({ default: "localhost" }),
  PORT: portOrZero({ default: 5000 }),
});

