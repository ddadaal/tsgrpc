import * as grpc from "@grpc/grpc-js";
import { Config } from "src/utils/config";
import { promisify } from "util";
import { getLogger, Logger } from "src/utils/log";
import type { Plugins } from "./plugin";

export type Plugin = (server: Server<any>) => (void | Promise<void>);

export type CloseCallback = () => (void | Promise<void>);

export class Server<TPlugins = Plugins> {

  private closeHooks: CloseCallback[] = [];

  logger: Logger;

  plugins: TPlugins = {} as any;

  server: grpc.Server = new grpc.Server();

  port: number = -1;

  constructor(private config: Config) {
    this.logger = getLogger("main");

    this.config.host = this.config.host ?? "0.0.0.0";
    this.config.port = this.config.port ?? 5000;
  }

  addCloseHook = (hook: CloseCallback) => {
    this.closeHooks.push(hook);
  };

  addService = <TImpl extends grpc.UntypedServiceImplementation>
  (server: grpc.ServiceDefinition<TImpl>, impl: TImpl) => {
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
