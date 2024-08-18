import { CallOptions, Client, Metadata } from "@grpc/grpc-js";
import { SurfaceCall } from "@grpc/grpc-js/build/src/call";
import { UnaryCallback } from "src/types";

interface UnaryCall<TReq, TReply> {
  (req: TReq, callback: UnaryCallback<TReply>): SurfaceCall;
  (req: TReq, metadata: Metadata, callback: UnaryCallback<TReply>): SurfaceCall;
  (req: TReq, metadata: Metadata, options: Partial<CallOptions>, callback: UnaryCallback<TReply>): SurfaceCall;
};

type TRequest<TFunc> =
  TFunc extends UnaryCall<infer TReq, infer _TReply>
    ? TReq
    : never;

type TReply<TFunc> =
  TFunc extends UnaryCall<infer _TReq, infer TReply>
    ? TReply
    : never;

/**
 * Async call a unary call.
 *
 * @param client client object
 * @param methodName the unary method to call
 * @param req the request
 * @param extra metadata and options
 * @returns response
 */
export function asyncClientCall<
  TClient extends Client, TKey extends keyof TClient,
>(
  client: TClient, methodName: TKey,
  req: TRequest<TClient[TKey]>,
  extra?:
  | { metadata: undefined; options: undefined }
  | { metadata: Metadata; options: undefined }
  | { metadata: Metadata; options: Partial<CallOptions> },
): Promise<TReply<TClient[TKey]>> {

  type Call = UnaryCall<TRequest<TClient[TKey]>, TReply<TClient[TKey]>>;

  const call: Call = (client[methodName] as Call).bind(client);

  return new Promise((res, rej) => {

    const callback: UnaryCallback<TReply<TClient[TKey]>> = (err, reply) => err ? rej(err) : res(reply);

    if (!extra || (!extra.metadata && !extra.options)) {
      call(req, callback);
    } else if (extra.options) {
      call(req, extra.metadata, extra.options, callback);
    } else {
      call(req, extra.metadata, callback);
    }
  });
}

export { asyncClientCall as asyncUnaryCall };
