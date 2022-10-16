import { asyncClientCall } from "@ddadaal/tsgrpc-client";
import { Server } from "@ddadaal/tsgrpc-server";
import { ChannelCredentials } from "@grpc/grpc-js";

import { createServer } from "../src/app";
import { EnumTest, TestServiceClient } from "../src/generated/git/test";
import { LocalTestServiceClient } from "../src/generated/local/local";

let server: Server;
let testClient: TestServiceClient;
let localClient: LocalTestServiceClient;

beforeEach(async () => {
  server = await createServer();

  await server.start();

  console.log(server.serverAddress);

  testClient = new TestServiceClient(server.serverAddress, ChannelCredentials.createInsecure());
  localClient = new LocalTestServiceClient(server.serverAddress, ChannelCredentials.createInsecure());
});

afterEach(async () => {
  await server.close();
});

it("returns data", async () => {

  const reply = await asyncClientCall(testClient, "unaryCall", { });

  expect(reply.enumTest).toBe(EnumTest.A);
});

it("returns with statusCode", async () => {
  await expect(async () => {
    await asyncClientCall(testClient, "returnServiceError", { });
  }).rejects.toThrowError();
});

it("returns error", async () => {
  await expect(async () => {
    await asyncClientCall(testClient, "throwError", { });
  }).rejects.toThrowError();
});

it("calls local test client", async () => {
  const reply = await asyncClientCall(localClient, "hello", { msg: "123" });

  expect(reply.msg).toBe("123");
});

it("tests request stream", async () => {

  localClient.requestStream((err, res) => {


  const reply = await asyncClientCall(localClient, "requestStream", );
});

it("tests response stream", async () => {

  for await (const response of localClient.replyStream({ msg: "123", count: 1 })) {

  }

});

it("tests duplex stream", async () => {

  const stream = localClient.duplexStream();

  const reply = await asyncClientCall(localClient, "requestStream", );
});
