import { ServiceError } from "@ddadaal/tsgrpc-common";
import { plugin } from "@ddadaal/tsgrpc-server";
import { status } from "@grpc/grpc-js";

// Use module augmentation to define extra properties
declare module "@ddadaal/tsgrpc-server" {
  interface Extensions {
    myKey: string;
  }

  interface Request {
    key: string;
  }
}

const KEY = "MY_SECRET_KEY";

export const myPlugin = plugin(async (s) => {
  // Add myKey property to server.plugins object
  s.addExtension("myKey", KEY);

  // Add a request hook, which will be executed at the start of every request
  s.addRequestHook(async (req) => {

    const metadata = req.metadata.get("THROW_ERROR");

    if (metadata.length === 1) {
      throw new ServiceError({
        code: status.INVALID_ARGUMENT,
        details: "Throw error header is set with value " + metadata[0],
      });
    }

    if (req.metadata.get(""))
      req.key = KEY + req.reqId;
  });
});
