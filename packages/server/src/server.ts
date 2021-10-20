import * as grpc from "@grpc/grpc-js";
import { promisify } from "util";
import { getLogger, Logger } from "./log";
import { unpromisify } from "@ddadaal/tsgrpc-utils";

export type CloseCallback = () => (void | Promise<void>);

export type ServerConfig = {
  host?: string;
  port?: number;
}

// used for augmentation
export interface Plugins {

}

export type Plugin = (server: Server) => (void | Promise<void>);

/** Helper identify function to build plugin. */
export function plugin(p: Plugin) { return p; }

export class Server {

  private closeHooks: CloseCallback[] = [];

  logger: Logger;

  plugins: Plugins = {} as any;

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

    for (const key in impl) {
      // @ts-ignore
      impl[key] = unpromisify(impl[key]);
    }

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
