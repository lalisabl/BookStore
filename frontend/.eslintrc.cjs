module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/prop-types": [
      1,
      {
        ignore: ["node_modules/", "dist/"],
        skipUndeclared: false,
      },
    ],
    "no-unused-vars": [
      "warn",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],

    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
