import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { configs as wdioConfig } from 'eslint-plugin-wdio';

export default defineConfig([
    {
        ignores: ['allure-results/', 'allure-report/'],
    },

    js.configs.recommended,

    tseslint.configs.strictTypeChecked,

    // Plugin types its rule severities as plain strings
    wdioConfig['flat/recommended'] as Linter.Config,

    {
        files: ['**/*.ts'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.mocha,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            'prettier/prettier': 'error',
            'no-console': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        },
    },

    eslintConfigPrettier,
]);
