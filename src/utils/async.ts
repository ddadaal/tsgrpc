import { Client, handleUnaryCall, sendUnaryData, ServiceError } from "@grpc/grpc-js";

export function asyncHandler<TReq, TReply>(
  handler: (...args: Parameters<handleUnaryCall<TReq, TReply>>) => Promise<Parameters<sendUnaryData<TReply>>> ,
): handleUnaryCall<TReq, TReply> {
  return (call, callback) => {
    handler(call, callback).then((x) => callback(...x));
  };
}

type Last<T extends any[]> = T extends [...infer _I, infer L] ? L : never;
type First<T extends any[]> = T extends [infer I, ...infer _L] ? I : never;

type ClientCallCallback<TReply> = (error: ServiceError | null, response: TReply) => void;

type ClientCall<TReq, TReply> =
(req: TReq, callback: ClientCallCallback<TReply>) => unknown;

type TRequest<TFunc> =
  TFunc extends ClientCall<any, any>
    ? First<Parameters<TFunc>>
    : never;

type TRes<TFunc> =
  TFunc extends ClientCall<any, any>
    ? Last<Parameters<TFunc>> extends ((...args: any) => any)
      ? Last<Parameters<Last<Parameters<TFunc>>>>
      : never
    : never

export function asyncClientCall<
  TClient extends Client, TKey extends keyof TClient,
>(
  client: TClient,
  methodName: TKey,
  req: TRequest<TClient[TKey]>,
): Promise<[
  ServiceError | null,
  TRes<TClient[TKey]>,
]> {

  type Call = ClientCall<TRequest<TClient[TKey]>, TRes<TClient[TKey]>>;

  return new Promise((res) => {
    (client[methodName] as any as Call)
    (req, (...args) => res(args));
  });
}
