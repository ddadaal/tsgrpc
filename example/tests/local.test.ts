import {
  asyncDuplexStreamCall, asyncReplyStreamCall, asyncRequestStreamCall, asyncUnaryCall,
} from "@ddadaal/tsgrpc-client";
import { Server } from "@ddadaal/tsgrpc-server";
import { ChannelCredentials, status } from "@grpc/grpc-js";

import { createServer } from "../src/app";
import { LocalTestServiceClient } from "../src/generated/local/local";

let server: Server;
let localClient: LocalTestServiceClient;

beforeEach(async () => {
  server = await createServer();

  await server.start();

  localClient = new LocalTestServiceClient(server.serverAddress, ChannelCredentials.createInsecure());
});

afterEach(async () => {
  await server.close();
});

it("calls local test client", async () => {
  const reply = await asyncUnaryCall(localClient, "unary", { msg: "123" });

  expect(reply.msg).toBe("123");
});

it("tests request stream", async () => {

  // async generator
  const rep = await asyncRequestStreamCall(
    localClient, "requestStream", async function*() {
      yield { msg: "1", error: false };
      yield { msg: "2", error: false };
      yield { msg: "3", error: false };
    }());

  expect(rep.messages).toEqual(["1", "2", "3"]);

  // async function
  const rep1 = await asyncRequestStreamCall(
    localClient, "requestStream", async (write) => {
      await write({ msg: "1", error: false });
      await write({ msg: "2", error: false });
      await write({ msg: "3", error: false });
    },
  );

  expect(rep1.messages).toEqual(["1", "2", "3"]);

});

it("tests request stream error handling", async () => {
  await asyncRequestStreamCall(localClient, "requestStream", async function*() {
    yield { msg: "1", error: true };
    yield { msg: "1", error: false };
  }()).then(() => expect("").fail("Request successfully"), (e) => {
    expect(e.code).toBe(status.INTERNAL);
  });
});

it("tests response stream", async () => {

  const count = 5, msg = "12", error = false;

  const stream = asyncReplyStreamCall(localClient, "replyStream", { count, msg, error });

  // test readAsync
  const data = await stream.readAsync();
  expect(data.msg).toBe(msg);


  let i = 0;
  for await (const response of stream) {
    expect(response.msg).toBe(msg);
    i++;
  }

  expect(i).toBe(count - 1);

});

it("tests response stream error handling", async () => {

  const count = 5, msg = "12", error = true;

  const stream = asyncReplyStreamCall(localClient, "replyStream", { count, msg, error });

  await stream.readAsync().then(() => expect("").fail("Read successfully"), (e) => {
    expect(e.code).toBe(status.INTERNAL);
  });

});


it("tests duplex stream", async () => {
  const request = { msg: "23", error: false };

  const stream = asyncDuplexStreamCall(localClient, "duplexStream");

  await stream.writeAsync(request);
  await stream.writeAsync(request);

  expect((await stream.readAsync()).msg).toBe(request.msg);
  expect((await stream.readAsync()).msg).toBe(request.msg);

  const request2 = { msg: "234", error: false };

  await stream.writeAsync(request2);
  await stream.writeAsync(request2);
  await stream.writeAsync(request2);

  stream.end();

  let i = 0;

  for await (const response of stream) {
    expect(response.msg).toBe(request2.msg);
    i++;
  }
  expect(i).toBe(3);
});
