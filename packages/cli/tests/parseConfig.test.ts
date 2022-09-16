// read jsons from configs folder
import fs from "node:fs";
import { join, resolve } from "node:path";

import { cliConfigSchema } from "src/config";

const configDir = join(__dirname, "configs");

const tests = fs.readdirSync(configDir).map((filename) => ({
  filename,
  error: filename.startsWith("error"),
}));

it.each(tests)("parses $filename. error: $error", ({ error, filename }) => {
  const content = fs.readFileSync(resolve(configDir, filename), "utf-8");
  const result = cliConfigSchema.safeParse(JSON.parse(content));
  if (!result.success) {
    console.log(result.error.message);
  }
  expect(result.success).toBe(!error);
});

