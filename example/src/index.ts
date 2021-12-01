import { Server } from "@ddadaal/tsgrpc-server";
import { config } from "./config";
import { myPlugin } from "./myPlugin";
import { testService } from "./testService";

export async function createServer() {
  const server = new Server({
    host: config.HOST,
    port: config.PORT,
  });

  await server.register(myPlugin);
  await server.register(testService);

  return server;

}

createServer().then((x) => x.start());
