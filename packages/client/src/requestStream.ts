import { createWriterExtensions, WriterExtensions } from "@ddadaal/tsgrpc-common";
import { CallOptions, Client, ClientWritableStream, Metadata } from "@grpc/grpc-js";
import { UnaryCallback } from "src/types";

interface RequestStreamCall<TReq, TRep> {
  (callback: UnaryCallback<TRep>): ClientWritableStream<TReq>,
  (metadata: Metadata, callback: UnaryCallback<TRep>): ClientWritableStream<TReq>,
  (options: Partial<CallOptions>, callback: UnaryCallback<TRep>): ClientWritableStream<TReq>,
  (metadata: Metadata, options: Partial<CallOptions>, callback: UnaryCallback<TRep>): ClientWritableStream<TReq>,
};

type TRequest<TFunc> =
  TFunc extends RequestStreamCall<infer TReq, infer _TReply>
    ? TReq
    : never;

type TReply<TFunc> =
  TFunc extends RequestStreamCall<infer _TReq, infer TReply>
    ? TReply
    : never;

/**
 * Async call a request stream rpc.
 * @param client client object
 * @param methodName the name of the function to call
 * @param writer a generator function or a async function to write to the stream
 * @param extra metadata and options
 * @returns reply
 */
export function asyncRequestStreamCall<
  TClient extends Client, TKey extends keyof TClient,
>(
  client: TClient, methodName: TKey,
  writer:
    | (AsyncGenerator<TRequest<TClient[TKey]>>)
    | ((
      ext: WriterExtensions<TRequest<TClient[TKey]>>,
      stream: ClientWritableStream<TRequest<TClient[TKey]>>
    ) => Promise<void>),
  extra?: { metadata?: Metadata; options?: Partial<CallOptions>; },
): Promise<TReply<TClient[TKey]>> {

  type Call = RequestStreamCall<TRequest<TClient[TKey]>, TReply<TClient[TKey]>>;

  const call: Call = (client[methodName] as Call).bind(client);

  return new Promise((res, rej) => {
    const callback: UnaryCallback<TReply<TClient[TKey]>> = (err, reply) => err ? rej(err) : res(reply);

    const stream = (!extra || (!extra.metadata && !extra.options))
      ? call(callback)
      : extra.metadata
        ? extra.options
          ? call(extra.metadata, extra.options, callback)
          : call(extra.metadata, callback)
        : call(extra.options!, callback);

    const writerExt = createWriterExtensions(stream);

    void (async () => {
      let isCompleted = false;
      
      try {
        if (typeof writer === "object") {
          let result = await writer.next();
          while (!result.done) {
            await writerExt.writeAsync(result.value);
            result = await writer.next();
          }
        } else {
          await writer(writerExt, stream);
        }
        isCompleted = true;
      } catch (e) {
        // Ensure we don't call both rej and stream.end() if stream already errored
        if (!stream.destroyed) {
          stream.destroy();
        }
        rej(e as Error);
        return;
      } finally {
        // Only end the stream if it wasn't destroyed due to an error
        if (isCompleted && !stream.destroyed) {
          stream.end();
        }
      }
    })();
  });
}
