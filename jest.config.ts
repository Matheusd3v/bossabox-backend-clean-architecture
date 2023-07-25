export default {
  coverageProvider: "v8",
  preset: "ts-jest",
  transform: { "^.+\\.ts?$": "ts-jest" },
  coverageReporters: ["lcov", "text"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@adapter/(.*)$": "<rootDir>/src/adapter/$1",
    "^@controller/(.*)$": "<rootDir>/src/controller/$1",
    "^@core/(.*)$": "<rootDir>/src/core/$1",
    "^@infra/(.*)$": "<rootDir>/src/infra/$1",
    "^@presentation/(.*)$": "<rootDir>/src/presentation/$1",
  }
};