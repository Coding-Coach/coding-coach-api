module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "\\-tests\\.ts",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["\\\\node_modules\\\\"],
  moduleNameMapper: {
    "^@modules": "<rootDir>/src/modules",
    "^@container": "<rootDir>/src/container",
    "^@handlers(.*)": "<rootDir>/src/handlers$1",
    "^@repositories(.*)": "<rootDir>/src/repositories$1"
  }
};
