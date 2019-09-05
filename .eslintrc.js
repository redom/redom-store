module.exports = {
    parserOptions: {
        ecmaVersion: 2017,
    },
    env: {
        browser: true,
        es6: true,
    },
    parserOptions: {
        sourceType: "module",
    },
    extends: ["eslint:recommended", "prettier"],
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": [
            "error",
            {
                singleQuote: false,
            },
        ],
        eqeqeq: ["error", "always"],
    },
};
