// rollup.config.common.js
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";

export const createRollupConfig = ({
  inputFiles,
  additionalPlugins = [],
  minify = true,
}) =>
  inputFiles.map((fileName) => ({
    input: `src/${fileName}.ts`,
    plugins: [
      nodeResolve({}),
      json(),
      typescript({}),
      commonjs(),
      ...additionalPlugins,
    ],
    output: [
      {
        format: "esm",
        file: `./dist/${fileName}.js`,
      },
      {
        format: "cjs",
        file: `./dist/${fileName}.cjs`,
        strict: false
      },
      ...(minify
        ? [
            {
              format: "esm",
              file: `./dist/${fileName}.min.js`,
              plugins: [terser()],
            },
            {
              format: "cjs",
              file: `./dist/${fileName}.min.cjs`,
              plugins: [terser()],
              strict: false
            },
          ]
        : []),
    ],
  }));
