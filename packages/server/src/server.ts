import * as grpc from "@grpc/grpc-js";
import { promisify } from "util";
import { createLogger, Logger } from "@ddadaal/node-logger";
import { Plugins } from "src/plugins";
import { Call, createReqIdGen, RequestDecorator } from "src/request";
import { Rest } from "src/types";

export type CloseCallback = () => (void | Promise<void>);

export type ServerConfig = {
  host?: string;
  port?: number;
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


export type Plugin = (server: Server) => (void | Promise<void>);

/** Helper identify function to build plugin. */
export function plugin(p: Plugin) { return p; }

export class Server {

  private closeHooks: CloseCallback[] = [];

  private reqIdGen = createReqIdGen();

  logger: Logger;

  plugins: Plugins = {} as any;

  server: grpc.Server = new grpc.Server();

  requestDecorators: RequestDecorator[] = [];

  port: number = -1;

  constructor(private config: ServerConfig) {
    this.logger = createLogger("main");

    this.config.host = this.config.host ?? "0.0.0.0";
    this.config.port = this.config.port ?? 5000;
  }

  decorateRequest = (decorator: RequestDecorator) => {
    this.requestDecorators.push(decorator);
  };

  addCloseHook = (hook: CloseCallback) => {
    this.closeHooks.push(hook);
  };

  addService = <TImpl extends grpc.UntypedServiceImplementation>(
    server: grpc.ServiceDefinition<TImpl>, impl: TPromisifiedImplementation<TImpl>,
  ) => {

    const actualImpl = {} as TImpl;

    for (const key in impl) {
      // @ts-ignore
      actualImpl[key] = async (call: any, callback: any) => {

        // logger
        const reqId = this.reqIdGen();
        const logger = createLogger(`req-${reqId}`);

        logger.trace(`Starting serving req-${reqId}`);

        const request = {
          ...call,
          logger,
          reqId,
        };

        // apply request decorators
        for (const decorator of this.requestDecorators) {
          await decorator(request);
        }

        // @ts-ignore
        const ret = impl[key](request, callback);
        if (ret && callback) {
          ret
            .then((x) => { if (x) { callback(null, ...x);}})
            .catch((e) => callback(e));
        }
      };
    }

    this.server.addService(server, actualImpl);
  };


  addPlugin = (key: PropertyKey, value: any) => {
    this.plugins[key] = value;
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
