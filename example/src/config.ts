import { envConfig, envalid } from "@ddadaal/tsgrpc-utils";

const { host, port } = envalid;

// Define env vars
// Will be type checked when config is imported.
// Fails the program if env is not correctly set.
export const config = envConfig({
  HOST: host({ default: "0.0.0.0" }),
  PORT: port({ default: 5000 }),
});

