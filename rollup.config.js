import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import minify from "rollup-plugin-babel-minify";

export default [
    {
        input: "src/store.js",
        output: [
            {
                name: "main",
                file: "dist/redom-store.es.js",
                format: "esm",
            },
            {
                name: "main",
                file: "dist/redom-store.js",
                format: "umd",
            },
        ],
        plugins: [resolve(), commonjs(), minify()],
    },
    {
        input: "examples/counter/App.js",
        output: {
            file: "examples/counter/dist/main.js",
            format: "esm",
        },
        plugins: [resolve(), commonjs(), minify()],
    },
];
