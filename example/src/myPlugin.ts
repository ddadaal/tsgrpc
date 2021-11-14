import { plugin } from "@ddadaal/tsgrpc-server";

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
    req.key = KEY + req.reqId;
  });
});
