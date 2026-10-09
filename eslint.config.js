import js from "@eslint/js";
import globals from "globals";
import react from "@eslint-react/eslint-plugin";

export default [
    js.configs.recommended,
    react.configs.recommended,
    {
        files: ["**/*.js", "**/*.jsx"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            "no-undef": "error",
            "no-unused-vars": [
                "error",
                {
                    vars: "all",
                    args: "after-used",
                    varsIgnorePattern: "^_",
                    argsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
        },
    },
];
