import { CallOptions, Client, ClientDuplexStream, Metadata } from "@grpc/grpc-js";
import { AugmentedReader, augmentedReader, AugmentedWriter, augmentedWriter } from "src/utils";

type DuplexStreamCall<TReq, TRep> = {
  (): ClientDuplexStream<TReq, TRep>,
  (options: Partial<CallOptions>): ClientDuplexStream<TReq, TRep>,
  (metadata: Metadata, options?: Partial<CallOptions>): ClientDuplexStream<TReq, TRep>,

}

type TRequest<TFunc> =
  TFunc extends DuplexStreamCall<infer TReq, infer _TReply>
  ? TReq
  : never;

type TReply<TFunc> =
  TFunc extends DuplexStreamCall<infer _TReq, infer TReply>
  ? TReply
  : never;

type AugmentedStream<TReq, TRep> =
  AugmentedWriter<TReq> & AugmentedReader<TRep> & AsyncIterable<TRep> & ClientDuplexStream<TReq, TRep>;

/**
 * Async call a duplex stream rpc.
 * @param client client object
 * @param methodName the name of the function to call
 * @param extra metadata and options
 * @returns the duplex stream augmented with typed promisified reader and writer
 */
export function asyncDuplexStreamCall<
  TClient extends Client, TKey extends keyof TClient,
>(
  client: TClient, methodName: TKey,
  extra?: { metadata?: Metadata; options?: Partial<CallOptions>; },
): AugmentedStream<TRequest<TClient[TKey]>, TReply<TClient[TKey]>> {

   type Call = DuplexStreamCall<TRequest<TClient[TKey]>, TReply<TClient[TKey]>>;

   const call: Call = (client[methodName] as Call).bind(client);

   const stream = (!extra || (!extra.metadata && !extra.options))
     ? call()
     : extra.metadata
       ? call(extra.metadata, extra.options)
       : call(extra.options!);

   Object.assign(stream, augmentedWriter(stream));
   Object.assign(stream, augmentedReader(stream));

   return stream as AugmentedStream<TRequest<TClient[TKey]>, TReply<TClient[TKey]>>;
}
