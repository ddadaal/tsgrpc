// jest.config.js
process.env.PORT = 0;

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: ".",
  preset: "ts-jest",
  testMatch: [
    "<rootDir>/tests/**/*.test.ts?(x)",
  ],
  coverageDirectory: `coverage/${process.env.NODE_ENV}`,
  testTimeout: 30000,
  coverageReporters: ["lcov"],
  setupFilesAfterEnv: ["jest-extended/all"],
};
