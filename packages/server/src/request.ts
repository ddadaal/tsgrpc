import { ReaderExtensions, WriterExtensions } from "@ddadaal/tsgrpc-common";
import type { ServerDuplexStream,
  ServerReadableStream, ServerUnaryCall, ServerWritableStream } from "@grpc/grpc-js/build/src/server-call";
import type pino from "pino";

// https://github.com/fastify/fastify/blob/7efd2540f1/lib/reqIdGenFactory.js
export function createReqIdGen() {
  const maxInt = 2147483647;
  let nextReqId = 0;
  return function genReqId() {
    nextReqId = (nextReqId + 1) & maxInt;
    return nextReqId.toString(36);
  };
}

// used for augmentation
export interface Request {
  logger: pino.Logger;
  reqId: string;
}

export interface AugmentedWritable<T> {
  writeAsync: WriterExtensions<T>["writeAsync"];
};

export type AugmentedReadable<T> = ReaderExtensions<T> & {
};

export type AugmentedCall<TCall> = TCall & Request & (
  TCall extends ServerDuplexStream<infer TReq, infer TReply>
    ? AugmentedWritable<TReply> & AugmentedReadable<TReq>
    : TCall extends ServerReadableStream<infer TReq, infer _TReply>
      ? AugmentedReadable<TReq>
      : TCall extends ServerWritableStream<infer _TReq, infer TReply>
        ? AugmentedWritable<TReply>
        : {}
);

export type ServerCall =
  ServerUnaryCall<{}, {}> | ServerReadableStream<{}, {}> | ServerWritableStream<{}, {}> | ServerDuplexStream<{}, {}>;

export type RequestDecorator = (call: AugmentedCall<ServerCall>) => void | Promise<void>;
