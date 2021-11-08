import { plugin } from "@ddadaal/tsgrpc-server";
import { EnumTest, TestServiceServer, TestServiceService, UnaryCallReply } from "./generated/test";

export const testService = plugin(async (s) => {
  s.addService<TestServiceServer>(TestServiceService, {
    // key comes from myPlugin
    unaryCall: async ({ request, key, logger }) => {

      logger.info(request.msg?.msg?.a + "" ?? "");

      return [UnaryCallReply.fromPartial({
        enumTest: EnumTest.A,
        msg: key,
      })];
    },
  });
});
