export const logLevels = {
  trace: 1,
  debug: 2,
  info: 3,
  warn: 4,
  error: 5,
} as const;

export enum LogOutputFormat {
  JSON,
  Pretty,
}

export type LogLevel = keyof typeof logLevels;

let config = {
  levelThreshold: logLevels.info,
  format: LogOutputFormat.Pretty,
};

export type LogConfig = typeof config;

export function setLogConfig(newConfig: Partial<LogConfig>) {
  config = { ...config, ...newConfig };
}

export type Logger = Record<LogLevel, (content: string) => void> & {
  child(...scopes: string[]): Logger;
}

export const createLogger = (...scopes: string[]): Logger => {

  const log = (level: string) => (content: string) => {
    if (config.levelThreshold <= logLevels[level]) {

      if (config.format === LogOutputFormat.JSON) {
        const info = {
          time: new Date().toISOString(),
          level: level.toUpperCase(),
          content,
          scopes,
        };

        console.log(JSON.stringify(info));
      } else {
        const scopeString = scopes.length > 0 ? `[${scopes.join(", ")}]` : "";

        console.log(
          `${new Date().toISOString()} ${level.toLocaleUpperCase()} ${scopeString} ${content}`,
        );
      }
    }
  };

  const logger = {
    child: (newScopes) => createLogger(...scopes.concat(newScopes)),
  } as Logger;

  Object.keys(logLevels).forEach((level) => logger[level] = log(level));

  return logger;

};
