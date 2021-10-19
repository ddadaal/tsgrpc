import * as grpc from "@grpc/grpc-js";
import { promisify } from "util";
import { getLogger, Logger } from "src/log";

export type CloseCallback = () => (void | Promise<void>);

export type ServerConfig = {
  host?: string;
  port?: number;
}

// used for augmentation
export interface Plugins {

}

/**
 * The plugin type.
 *
 * Sometimes the user cannot infer all augmentations of Plugins interface,
 * At that situation, manually specify this type parameter as the `Plugins` interface imported from this library
 * and all Plugins augmentation can be used.
 **/
export type Plugin<TPlugins = Plugins> = (server: Server<TPlugins>) => (void | Promise<void>);

export class Server<TPlugins = Plugins> {

  private closeHooks: CloseCallback[] = [];

  logger: Logger;

  plugins: TPlugins = {} as any;

  server: grpc.Server = new grpc.Server();

  port: number = -1;

  constructor(private config: ServerConfig) {
    this.logger = getLogger("main");

    this.config.host = this.config.host ?? "0.0.0.0";
    this.config.port = this.config.port ?? 5000;
  }

  addCloseHook = (hook: CloseCallback) => {
    this.closeHooks.push(hook);
  };

  addService = <TImpl extends grpc.UntypedServiceImplementation>(
    server: grpc.ServiceDefinition<TImpl>, impl: TImpl,
  ) => {
    this.server.addService(server, impl);
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
