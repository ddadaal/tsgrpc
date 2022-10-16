import { plugin } from "@ddadaal/tsgrpc-server";

import { LocalTestServiceServer, LocalTestServiceService, UnaryReply } from "./generated/local/local";

export const localTestService = plugin(async (s) => {
  s.addService<LocalTestServiceServer>(LocalTestServiceService, {
    // key comes from myPlugin
    unary: async ({ request, logger }) => {

      logger.info("Received request %o", request);

      return [UnaryReply.fromPartial({
        msg: request.msg,
      })];
    },

    requestStream: async (call) => {

      const data = [] as string[];

      for await (const req of call) {
        call.logger.info("Received %o", req);
        data.push(req.msg);
      }

      return [{ messages: data }];
    },

    replyStream: async (call) => {

      const { count, msg } = call.request;

      for (let i = 0; i < count; i++) {
        await call.writeAsync({ msg });
      }
    },

    duplexStream: async (call) => {
      for await (const req of call) {
        call.logger.info("Received %o", req);
        await call.writeAsync({ msg: req.msg });
      }

      call.logger.info("No more data");
    },
  });
});
