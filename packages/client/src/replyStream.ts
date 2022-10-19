import { createReaderExtensions, ReaderExtensions } from "@ddadaal/tsgrpc-common";
import { CallOptions, Client, ClientReadableStream, Metadata } from "@grpc/grpc-js";

type ReplyStreamCall<TReq, TRep> = {
  (request: TReq, options?: Partial<CallOptions>): ClientReadableStream<TRep>,
  (request: TReq, metadata?: Metadata, options?: Partial<CallOptions>): ClientReadableStream<TRep>,
}

type AugmentedClientReadableStream<TReply> = ReaderExtensions<TReply> & ClientReadableStream<TReply>;

type TRequest<TFunc> =
  TFunc extends ReplyStreamCall<infer TReq, infer _TReply>
  ? TReq
  : never;

type TReply<TFunc> =
  TFunc extends ReplyStreamCall<infer _TReq, infer TReply>
  ? TReply
  : never;


/**
 * Async call a reply stream rpc.
 * @param client client object
 * @param methodName the methodName of the function
 * @param extra metadata and options
 * @returns Augmented ClientReadableStream
 */
export function asyncReplyStreamCall<
  TClient extends Client, TKey extends keyof TClient,
>(
  client: TClient, methodName: TKey,
  request: TRequest<TClient[TKey]>,
  extra?: { metadata?: Metadata; options?: Partial<CallOptions>; },
): AugmentedClientReadableStream<TReply<TClient[TKey]>> {

  type Call = ReplyStreamCall<TRequest<TClient[TKey]>, TReply<TClient[TKey]>>;

  const call: Call = (client[methodName] as Call).bind(client);

  const stream = (!extra || (!extra.metadata && !extra.options))
    ? call(request)
    : extra.options
      ? extra.metadata
        ? call(request, extra.metadata, extra.options)
        : call(request, extra.options)
      : call(request, extra.metadata, undefined);

  return Object.assign(stream, createReaderExtensions(stream));
}
