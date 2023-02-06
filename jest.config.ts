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
    }
};