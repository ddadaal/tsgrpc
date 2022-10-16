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

export interface AsyncWritable<T> {
  writeAsync: (data: T) => Promise<void>;
  endAsync: () => Promise<void>;
}

export type AugmentedCall<TCall> = TCall & Request & (
  TCall extends ServerDuplexStream<infer TReq, infer TReply>
    ? AsyncWritable<TReply> & AsyncIterable<TReq>
    : TCall extends ServerReadableStream<infer TReq, infer _TReply>
    ? AsyncIterable<TReq>
    : TCall extends ServerWritableStream<infer _TReq, infer TReply>
    ? AsyncWritable<TReply>
    : {}
)

export type ServerCall =
  ServerUnaryCall<{}, {}> | ServerReadableStream<{}, {}> | ServerWritableStream<{}, {}> | ServerDuplexStream<{}, {}>;

export type RequestDecorator = (call: AugmentedCall<ServerCall>) => void | Promise<void>;
