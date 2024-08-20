module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    plugins: ['@typescript-eslint'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020
    },
    env: {
        es2017: true,
        node: true
    },
    rules: {
        // Don't check if the error of try...catch blocks are used
        '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none' }]
    }
};
