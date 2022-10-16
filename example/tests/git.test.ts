import {
  asyncUnaryCall,
} from "@ddadaal/tsgrpc-client";
import { Server } from "@ddadaal/tsgrpc-server";
import { ChannelCredentials } from "@grpc/grpc-js";

import { createServer } from "../src/app";
import { EnumTest, TestServiceClient } from "../src/generated/git/test";

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

  const reply = await asyncUnaryCall(client, "unaryCall", { });

  expect(reply.enumTest).toBe(EnumTest.A);
});

it("returns with statusCode", async () => {
  await expect(async () => {
    await asyncUnaryCall(client, "returnServiceError", { });
  }).rejects.toThrowError();
});

it("returns error", async () => {
  await expect(async () => {
    await asyncUnaryCall(client, "throwError", { });
  }).rejects.toThrowError();
});

