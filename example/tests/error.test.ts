import {
  asyncUnaryCall,
} from "@ddadaal/tsgrpc-client";
import { Server } from "@ddadaal/tsgrpc-server";
import { ChannelCredentials, status } from "@grpc/grpc-js";

import { createServer } from "../src/app";
import { ErrorTestServiceClient } from "../src/generated/local/error";

let server: Server;
let client: ErrorTestServiceClient;

beforeEach(async () => {
  server = await createServer();

  await server.start();

  console.log(server.serverAddress);

  client = new ErrorTestServiceClient(server.serverAddress, ChannelCredentials.createInsecure());
});

afterEach(async () => {
  await server.close();
});

it("returns with statusCode", async () => {
  try {
    await asyncUnaryCall(client, "returnServiceError", {});
    expect("").fail("Should not reach here");
  } catch (e) {
    expect(e.code).toBe(status.NOT_FOUND);
    expect(e.message).toBe("5 NOT_FOUND: Not found");
    expect(e.details).toBe("Not found");
    expect(e.metadata.toJSON().details).toEqual(["123"]);
  }
});

it("returns error", async () => {
  try {
    await asyncUnaryCall(client, "throwError", {});
    expect("").fail("Should not reach here");
  } catch (e) {
    expect(e.code).toBe(status.UNKNOWN);
    expect(e.message).toBe("2 UNKNOWN: Something");
  }
});

