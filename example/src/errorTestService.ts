import { ServiceError } from "@ddadaal/tsgrpc-common";
import { plugin } from "@ddadaal/tsgrpc-server";
import { status } from "@grpc/grpc-js";

import { ErrorTestServiceServer, ErrorTestServiceService } from "./generated/local/error";

export const errorTestService = plugin(async (s) => {
  s.addService<ErrorTestServiceServer>(ErrorTestServiceService, {
    returnServiceError: async () => {
      throw new ServiceError({
        code: status.NOT_FOUND,
        message: "Not found",
        details: "Not found",
        metadata: { "details": "123" },
      });
    },

    throwError: async () => {
      throw new Error("Something");
    },
  });
});
