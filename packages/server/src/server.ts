import * as grpc from "@grpc/grpc-js";
import pino from "pino";
import { Extensions } from "src/extension";
import { Call, createReqIdGen, RequestDecorator } from "src/request";
import { Rest } from "src/types";
import { promisify } from "util";

export type CloseCallback = () => (void | Promise<void>);

export type ServerConfig = {
  host?: string;
  port?: number;
  logger?: pino.LoggerOptions;
}

export type ResponseType<T extends (...args: any[]) => void> = Rest<Parameters<Parameters<T>[1]>>;

type RemoveIndex<T> = {
  [ K in keyof T as string extends K ? never : number extends K ? never : K ] : T[K]
};
export declare type TPromisifiedImplementation<TImpl extends grpc.UntypedServiceImplementation> = {
    [K in keyof RemoveIndex<TImpl>]: (
      call: Call<Parameters<RemoveIndex<TImpl>[K]>[0]>,
       ...rest: Rest<Parameters<RemoveIndex<TImpl>[K]>>
       ) => (void | Promise<void | ResponseType<RemoveIndex<TImpl>[K]>>);
};

export declare type ProxifiedImplementation<TImpl extends grpc.UntypedServiceImplementation> = {
  [K in keyof RemoveIndex<TImpl>]: grpc.UntypedHandleCall
}


export type Plugin = (server: Server) => (void | Promise<void>);

/** Helper identify function to build plugin. */
export function plugin(p: Plugin) { return p; }

export class Server {

  private closeHooks: CloseCallback[] = [];

  private reqIdGen = createReqIdGen();

  logger: pino.Logger;

  ext: Extensions = {} as any;

  server: grpc.Server = new grpc.Server();

  requestHooks: RequestDecorator[] = [];

  port: number = -1;

  constructor(private config: ServerConfig) {
    this.logger = pino(config.logger).child({ component: "server" });

    this.config.host = this.config.host ?? "0.0.0.0";
    this.config.port = this.config.port ?? 5000;
  }

  addRequestHook = (hook: RequestDecorator) => {
    this.requestHooks.push(hook);
  };

  addCloseHook = (hook: CloseCallback) => {
    this.closeHooks.push(hook);
  };

  addService = <TImpl extends grpc.UntypedServiceImplementation>(
    service: grpc.ServiceDefinition<TImpl>, impl: TPromisifiedImplementation<TImpl>,
  ) => {

    const actualImpl = {} as ProxifiedImplementation<TImpl>;

    for (const key in impl) {

      const serviceDef = service[key];

      actualImpl[key] = async (call, callback: grpc.sendUnaryData<any> | undefined) => {
        // logger
        const reqId = this.reqIdGen();
        const logger = this.logger.child({ req: reqId, path: serviceDef.path });

        logger.info("Starting req.");

        const request = {
          ...call,
          logger,
          reqId,
        };

        // apply request decorators
        for (const hook of this.requestHooks) {
          await hook(request);
        }

        try {
          // @ts-ignore
          const ret = await impl[key](request, callback);
          if (ret) {
            logger.info("Req completed.");
            callback?.(null, ...ret);
          }
        } catch (e) {
          logger.error({ err: e }, "Error occurred.");
          callback?.(e);
        }

      };
    }

    this.server.addService(service, actualImpl);
  };

  addExtension = (key: PropertyKey, value: any) => {
    this.ext[key] = value;
  };

  close = async () => {
    await promisify(this.server.tryShutdown.bind(this.server))();

    this.logger.info("gRPC Server has been shutdown.");

    let callback: CloseCallback | undefined = undefined;
    while (callback = this.closeHooks.pop()) {
      await callback();
    }
  };

  register = async (plugin: Plugin) => {
    await plugin(this);
  };

  get serverAddress(): string {
    return `${this.config.host}:${this.port}`;
  }

  async start(): Promise<number> {

    this.port = await promisify(this.server.bindAsync.bind(this.server))(
      `${this.config.host}:${this.config.port}`,
      grpc.ServerCredentials.createInsecure(),
    );

    this.server.start();

    this.logger.info(`Listening at ${this.port}`);

    // graceful shutdown
    const signals = {
      "SIGHUP": 1,
      "SIGINT": 2,
      "SIGTERM": 15,
    };

    const shutdown = (signal: string, code: number) => {
      this.logger.info(`Received ${signal}. Exiting`);
      this.close().then(() => process.exit(128 + code));
    };

    Object.keys(signals).forEach((signal) => {
      process.on(signal, () => {
        shutdown(signal, signals[signal]);
      });
    });

    return this.port;
  }
}
