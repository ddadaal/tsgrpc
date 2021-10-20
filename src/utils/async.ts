import { Client, ServiceError } from "@grpc/grpc-js";

export function unpromisify<TArg, TReturn extends unknown[], TErr>(
  promiseFunction: (args: TArg) => Promise<TReturn>,
) {
  return (arg: TArg, callback: (err: TErr | null, ...args: TReturn) => void) => {
    // @ts-ignore
    promiseFunction(arg).then((x) => callback(null, ...x)).catch((e) => callback(e));
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

/** Throws error if client call causes err */
export function asyncClientCall<
  TClient extends Client, TKey extends keyof TClient,
>(
  client: TClient,
  methodName: TKey,
  req: TRequest<TClient[TKey]>,
): Promise<TRes<TClient[TKey]>> {
  type Call = ClientCall<TRequest<TClient[TKey]>, TRes<TClient[TKey]>>;

  return new Promise((res, rej) => {
    (client[methodName] as any as Call)
    (req, (err, ...args) => err ? rej(err) : res(...args));
  });
}
