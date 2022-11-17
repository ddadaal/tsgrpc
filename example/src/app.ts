import { Server } from "@ddadaal/tsgrpc-server";

import { errorTestService } from "./errorTestService";
import { gitTestService } from "./gitTestService";
import { localTestService } from "./localTestService";
import { myPlugin } from "./myPlugin";

export async function createServer() {
  const server = new Server({ port: 0 });

  await server.register(myPlugin);
  await server.register(localTestService);
  await server.register(gitTestService);
  await server.register(errorTestService);

  return server;

}

