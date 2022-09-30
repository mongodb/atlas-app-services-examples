module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  globals: {
    context: "writable",
    BSON: "writable",
  },
  extends: "eslint:recommended",
  overrides: [],
  parserOptions: {
    ecmaVersion: 8,
  },
  plugins: ["jest"],
  rules: {},
};
