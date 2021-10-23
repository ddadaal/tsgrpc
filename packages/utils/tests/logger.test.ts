import { createLogger, LogOutputFormat, setLogConfig } from "src/logger";

let spy: jest.SpyInstance;

beforeEach(() => {
  spy = jest.spyOn(console, "log");
});

afterEach(() => {
  spy.mockReset();
});

it("outputs log info", async () => {

  const logger = createLogger("orm");

  logger.info("string");

  expect(spy).toHaveBeenCalled();
});

it("doesn't call log", async () => {
  const logger = createLogger();

  logger.trace("string");

  expect(spy).not.toHaveBeenCalled();
});

it("appends new scopes for child logger", async () => {
  setLogConfig({ format: LogOutputFormat.JSON });

  const logger = createLogger("123");
  const child = logger.child("456");

  child.info("haha");

  const message = spy.mock.calls[0][0];

  expect(JSON.parse(message)).toMatchObject({
    scopes: ["123", "456"],
  });

});
