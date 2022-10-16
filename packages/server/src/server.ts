import * as grpc from "@grpc/grpc-js";
import { once } from "events";
import pino from "pino";
import { Extensions } from "src/extension";
import { AugmentedCall, createReqIdGen, RequestDecorator, ServerCall } from "src/request";
import { Rest } from "src/types";
import { finished } from "stream";
import { promisify } from "util";

const finishedAsync = promisify(finished);

export type CloseCallback = () => (void | Promise<void>);

export type ServerConfig = {
  host?: string;
  port?: number;
  logger?: pino.LoggerOptions;

  /**
   * The server credentials used when creating gRPC server
   * If not set, insecure credentials will be used
   */
  serverCredentials?: grpc.ServerCredentials;
}

export type ResponseType<T extends (...args : any[]) => void> = Rest<Parameters<Parameters<T>[1]>>;

type RemoveIndex<T> = {
  [ K in keyof T as string extends K ? never : number extends K ? never : K ] : T[K]
};

export declare type AugmentedServiceImplementation<TImpl extends grpc.UntypedServiceImplementation> = {
    [K in keyof RemoveIndex<TImpl>]: (
      call: AugmentedCall<Parameters<RemoveIndex<TImpl>[K]>[0]>,
      callback: Parameters<RemoveIndex<TImpl>[K]>[1],
    ) => (void | Promise<void | ResponseType<RemoveIndex<TImpl>[K]>>);
};

export declare type AugmentedImplementation<TImpl extends grpc.UntypedServiceImplementation> = {
  [K in keyof RemoveIndex<TImpl>]: grpc.UntypedHandleCall
}

const isResponseStream = (serviceDef: grpc.MethodDefinition<{}, {}>, _augmentedCall: AugmentedCall<ServerCall>):
_augmentedCall is AugmentedCall<grpc.ServerWritableStream<any, any> | grpc.ServerDuplexStream<any, any>> => {
  return serviceDef.responseStream;
};

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
    service: grpc.ServiceDefinition<TImpl>, implementations: AugmentedServiceImplementation<TImpl>,
  ) => {

    const augmentedImplementations = {} as AugmentedImplementation<TImpl>;

    for (const key in implementations) {

      const serviceDef = service[key];

      augmentedImplementations[key] = async (
        call: ServerCall,
        callback: grpc.sendUnaryData<{}> | undefined,
      ) => {
        // logger
        const reqId = this.reqIdGen();
        const logger = this.logger.child({ req: reqId, path: serviceDef.path });

        const augmentedCall: AugmentedCall<ServerCall> = call as any;

        augmentedCall.reqId = reqId;
        augmentedCall.logger = logger;

        // add async functions for response stream
        if (isResponseStream(serviceDef, augmentedCall)) {
          augmentedCall.writeAsync = async (data) => {
            // backpressure
            if (!augmentedCall.write(data)) {
              await once(augmentedCall, "drain");
            }
          };
          augmentedCall.endAsync = async () => {
            augmentedCall.end();
            await finishedAsync(augmentedCall);
          };
        }

        logger.info("Starting request");

        // apply request decorators
        for (const hook of this.requestHooks) {
          await hook(augmentedCall);
        }

        try {
          const ret = await implementations[key](augmentedCall as any, callback);
          if (ret) {
            logger.info("Request completed.");
            callback?.(null, ...ret);
          }
        } catch (e) {
          logger.error({ err: e }, "Error occurred.");
          callback?.(e);
        }

      };
    }

    this.server.addService(service, augmentedImplementations);
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
      this.config.serverCredentials ?? grpc.ServerCredentials.createInsecure(),
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
