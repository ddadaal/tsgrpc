import { plugin } from "@ddadaal/tsgrpc-server";
import { ServiceError, status } from "@grpc/grpc-js";

import { LocalTestServiceServer, LocalTestServiceService,
  RequestStreamRequest, UnaryReply } from "./generated/local/local";

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

      function throwIfRequested(req: RequestStreamRequest) {
        if (req.error) {
          throw <ServiceError> { code: status.INTERNAL, message: "Error requested" };
        }
      }

      const first = await call.readAsync();

      throwIfRequested(first);

      const data = [first.msg] as string[];

      for await (const req of call) {
        call.logger.info("Received %o", req);
        throwIfRequested(req);

        data.push(req.msg);
      }

      return [{ messages: data }];
    },

    replyStream: async (call) => {

      const { count, msg, error } = call.request;

      if (error) {
        throw <ServiceError> { code: status.INTERNAL, message: "Error requested" };
      }

      for (let i = 0; i < count; i++) {
        await call.writeAsync({ msg });
      }
    },

    duplexStream: async (call) => {

      for await (const req of call) {
        call.logger.info("Received %o", req);
        if (req.error) {
          throw <ServiceError> { code: status.INTERNAL, message: "Error requested" };
        }
        await call.writeAsync({ msg: req.msg });

      }

      call.logger.info("No more data");
      call.emit("end");
    },
  });
});
