export const levels = {
  trace: 1,
  debug: 2,
  info: 3,
  warn: 4,
  error: 5,
};

export type LogLevel = keyof typeof levels;

let levelThreshold: number;

export function setLevelThreshold(level: LogLevel) {
  levelThreshold = levels[level] ?? levels.info;
}

export const getLogger = (name: string): Record<LogLevel, (content: string) => void> => {

  const log = (level: string) => (content: string) => {
    if (levelThreshold <= levels[level]) {
      console.log(
        `${new Date().toISOString()} ${level.toLocaleUpperCase()} [${name}] ${content}`,
      );
    }
  };

  const logger = {} as Record<string, (content: string) => void>;

  Object.keys(levels).forEach((level) => logger[level] = log(level));

  return logger;

};

export type Logger = ReturnType<typeof getLogger>;
