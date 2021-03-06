import { Server } from "@ddadaal/tsgrpc-server";
import { asyncClientCall } from "@ddadaal/tsgrpc-utils";
import { ChannelCredentials } from "@grpc/grpc-js";

import { createServer } from "../src/app";
import { EnumTest, TestServiceClient } from "../src/generated/test";

let server: Server;
let client: TestServiceClient;

beforeEach(async () => {
  server = await createServer();

  await server.start();

  console.log(server.serverAddress);

  client = new TestServiceClient(server.serverAddress, ChannelCredentials.createInsecure());
});

afterEach(async () => {
  await server.close();
});

it("returns data", async () => {

  const reply = await asyncClientCall(client, "unaryCall", { });

  expect(reply.enumTest).toBe(EnumTest.A);
});

it("returns with statusCode", async () => {
  await expect(async () => {
    await asyncClientCall(client, "returnServiceError", { });
  }).rejects.toThrowError();
});

it("returns error", async () => {
  await expect(async () => {
    await asyncClientCall(client, "throwError", { });
  }).rejects.toThrowError();
});
