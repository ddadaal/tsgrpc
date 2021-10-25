export const logLevels = {
  TRACE: 1,
  DEBUG: 2,
  INFO: 3,
  WARN: 4,
  ERROR: 5,
  FATAL: 6,
} as const;

export enum LogOutputFormat {
  JSON = "JSON",
  PRETTY = "PRETTY",
}

export type LogLevel = keyof typeof logLevels;

export interface LogConfig {
  level: LogLevel,
  format: LogOutputFormat,
}

function initializeWithEnv(key: string, choice: object, defaultValue: any) {
  const envVal = process.env[key]?.toLocaleUpperCase();
  if (envVal && choice[envVal] !== undefined) {
    return envVal;
  } else {
    return defaultValue;
  }
}

let config: LogConfig = {
  level: initializeWithEnv("LOG_LEVEL", logLevels, "INFO"),
  format: initializeWithEnv("LOG_FORMAT", LogOutputFormat, LogOutputFormat.PRETTY),
};

export function getLogConfig() {
  return config;
}

export function setLogConfig(newConfig: Partial<LogConfig>) {
  config = { ...config, ...newConfig };
}

export type Logger = Record<Lowercase<LogLevel>, (content: string) => void> & {
  child(...scopes: string[]): Logger;
}

export const createLogger = (...scopes: string[]): Logger => {

  const log = (level: string) => (content: string) => {
    if (logLevels[config.level] <= logLevels[level.toLocaleUpperCase()]) {

      if (config.format === LogOutputFormat.JSON) {
        const info = {
          time: new Date().toISOString(),
          level: level.toUpperCase(),
          scopes,
          content,
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

  Object.keys(logLevels).forEach((level) => logger[level.toLocaleLowerCase()] = log(level));

  return logger;

};
