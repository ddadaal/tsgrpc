import { ServiceError } from "@grpc/grpc-js";

// @internal
export type UnaryCallback<TReply> = (error: ServiceError | null, response: TReply) => void;

// @internal
export type Last<T extends any[]> = T extends [...infer _I, infer L] ? L : never;

/** @internal */
export type First<T extends any[]> = T extends [infer I, ...infer _L] ? I : never;
