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
  });
});
