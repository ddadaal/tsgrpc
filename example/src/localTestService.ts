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
          throw { code: status.INTERNAL, message: "Error requested" } as ServiceError;
        }
      }

      const first = await call.readAsync();

      if (!first) {
        return [{ messages: []}];
      }

      throwIfRequested(first);

      const data = [first.msg] as string[];

      for await (const req of call.iter()) {
        call.logger.info("Received %o", req);
        throwIfRequested(req);

        data.push(req.msg);
      }

      return [{ messages: data }];
    },

    replyStream: async (call) => {

      const { count, msg, error } = call.request;

      if (error) {
        throw { code: status.INTERNAL, message: "Error requested" } as ServiceError;
      }

      for (let i = 0; i < count; i++) {
        call.logger.info("Write %s the %d/%d time", msg, i, count);
        await call.writeAsync({ msg });
      }
    },

    duplexStream: async (call) => {

      for await (const req of call.iter()) {
        call.logger.info("Received %o", req);
        if (req.error) {
          throw { code: status.INTERNAL, message: "Error requested" } as ServiceError;
        }
        await call.writeAsync({ msg: req.msg, reply: true });
        call.logger.info("Written %o", req.msg);

      }

      call.logger.info("No more data");
      call.emit("end");
    },
  });
});
