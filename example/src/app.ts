import { Server } from "@ddadaal/tsgrpc-server";

import { myPlugin } from "./myPlugin";
import { testService } from "./testService";

export async function createServer() {
  const server = new Server({ });

  await server.register(myPlugin);
  await server.register(testService);

  return server;

}

