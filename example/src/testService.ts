import { plugin } from "@ddadaal/tsgrpc-server";
import { ServiceError, status } from "@grpc/grpc-js";

import { EnumTest, TestServiceServer, TestServiceService, UnaryCallReply } from "./generated/test";

export const testService = plugin(async (s) => {
  s.addService<TestServiceServer>(TestServiceService, {
    // key comes from myPlugin
    unaryCall: async ({ request, key, logger }) => {

      logger.info("Received request %o", request);

      return [UnaryCallReply.fromPartial({
        enumTest: EnumTest.A,
        msg: key,
      })];
    },

    returnServiceError: async () => {
      throw <ServiceError> {
        code: status.NOT_FOUND,
      };
    },

    throwError: async () => {
      throw new Error("Something");
    },
  });
});
