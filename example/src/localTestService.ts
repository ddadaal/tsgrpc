import { plugin } from "@ddadaal/tsgrpc-server";

import { HelloReply, LocalTestServiceServer, LocalTestServiceService } from "./generated/local/local";

export const localTestService = plugin(async (s) => {
  s.addService<LocalTestServiceServer>(LocalTestServiceService, {
    // key comes from myPlugin
    hello: async ({ request, logger }) => {

      logger.info("Received request %o", request);

      return [HelloReply.fromPartial({
        msg: request.msg,
      })];
    },

    requestStream: async (call) => {

      const data = [] as string[];

      for await (const req of call) {
        data.push(req.msg);
      }

      return [{ messages: data }];
    },

    replyStream: async (call) => {

      const { count, msg } = call.request;

      for (let i = 0; i < count; i++) {
        await call.writeAsync({ msg });
      }

      await call.endAsync();

    },

    duplexStream: async (call) => {
      for await (const req of call) {
        await call.writeAsync({ msg: req.msg });
      }

      await call.endAsync();
    },
  });
});
