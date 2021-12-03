module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  ignorePatterns: ["*.js", "build"],
  plugins: ["import", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  rules: {
    "import/extensions": "off",
    "no-restricted-syntax": "off",
    "guard-for-in": "off",
    "@typescript-eslint/no-floating-promises": "warn",
  },
};
