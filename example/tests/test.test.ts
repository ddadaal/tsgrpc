import {
  asyncDuplexStreamCall, asyncReplyStreamCall, asyncRequestStreamCall, asyncUnaryCall,
} from "@ddadaal/tsgrpc-client";
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

  const reply = await asyncUnaryCall(testClient, "unaryCall", { });

  expect(reply.enumTest).toBe(EnumTest.A);
});

it("returns with statusCode", async () => {
  await expect(async () => {
    await asyncUnaryCall(testClient, "returnServiceError", { });
  }).rejects.toThrowError();
});

it("returns error", async () => {
  await expect(async () => {
    await asyncUnaryCall(testClient, "throwError", { });
  }).rejects.toThrowError();
});

it("calls local test client", async () => {
  const reply = await asyncUnaryCall(localClient, "hello", { msg: "123" });

  expect(reply.msg).toBe("123");
});

it("tests request stream", async () => {

  // async generator
  const rep = await asyncRequestStreamCall(
    localClient, "requestStream", async function*() {
      yield { msg: "1" };
      yield { msg: "2" };
      yield { msg: "3" };
    }());

  expect(rep.messages).toEqual(["1", "2", "3"]);

  // async function
  const rep1 = await asyncRequestStreamCall(
    localClient, "requestStream", async (write) => {
      await write({ msg: "1" });
      await write({ msg: "2" });
      await write({ msg: "3" });
    },
  );

  expect(rep1.messages).toEqual(["1", "2", "3"]);

});

it("tests response stream", async () => {

  const count = 5, msg = "12";

  let i = 0;
  for await (const response of asyncReplyStreamCall(localClient, "replyStream", { count, msg })) {
    expect(response.msg).toBe(msg);
    i++;
  }

  expect(i).toBe(count);

});

it.only("tests duplex stream", async () => {

  const request = { msg: "23" };

  const stream = asyncDuplexStreamCall(localClient, "duplexStream");

  await stream.writeAsync(request);
  await stream.writeAsync(request);

  expect((await stream.readAsync()).msg).toBe(request.msg);
  expect((await stream.readAsync()).msg).toBe(request.msg);

  const request2 = { msg: "234" };

  await stream.writeAsync(request2);
  await stream.writeAsync(request2);
  await stream.writeAsync(request2);

  await stream.endAsync();

  let i = 0;
  for await (const response of stream) {
    expect(response.msg).toBe(request2.msg);
    i++;
  }
  expect(i).toBe(3);
});
