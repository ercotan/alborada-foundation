// Flat ESLint configuration.
//
// Deliberately small. TypeScript already enforces types in strict mode, so
// ESLint's job here is limited to the classes of defect the compiler does not
// see: React Hook rules, fast-refresh safety, and obvious runtime hazards.
// Stylistic rules are left to Prettier so the two never disagree.

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      // Vite fast refresh only works when a module exports components alone.
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Unused variables are already an error via tsconfig noUnusedLocals.
      // Disabled here to avoid two tools reporting the same defect twice.
      "@typescript-eslint/no-unused-vars": "off",

      // `any` defeats the strict mode enabled in tsconfig. Warn rather than
      // error so it can be introduced deliberately and reviewed, not smuggled.
      "@typescript-eslint/no-explicit-any": "warn",

      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-var": "error",
      "prefer-const": "error",
    },
  },
);
