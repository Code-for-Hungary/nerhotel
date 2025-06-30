import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import react from "eslint-plugin-react";

export default defineConfig([
    {
        files: ["**/*.js"],
        plugins: {
            js,
            react,
        },
        extends: ["js/recommended"],
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn",
            "react/jsx-uses-react": "error",
            "react/jsx-uses-vars": "error",
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                    modules: true,
                },
            },
        },
    },
]);
