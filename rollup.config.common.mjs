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
        banner: "/* Notifi Fusion Execution Version: 2.0 */",
        footer: "/* Notifi Fusion Execution Version: 2.0 */",
      },
      {
        format: "cjs",
        file: `./dist/${fileName}.cjs`,
        strict: false,
        banner: "/* Notifi Fusion Execution Version: 2.0 */",
        footer: "/* Notifi Fusion Execution Version: 2.0 */"
      },
      ...(minify
        ? [
            {
              format: "esm",
              file: `./dist/${fileName}.min.js`,
              plugins: [terser({
                format: {
                  comments: /Notifi Fusion Execution Version/
                }
              })],
              banner: "/* Notifi Fusion Execution Version: 2.0 */",
              footer: "/* Notifi Fusion Execution Version: 2.0 */"
            },
            {
              format: "cjs",
              file: `./dist/${fileName}.min.cjs`,
              plugins: [terser({
                format: {
                  comments: /Notifi Fusion Execution Version/
                }
              })],
              strict: false,
              banner: "/* Notifi Fusion Execution Version: 2.0 */",
              footer: "/* Notifi Fusion Execution Version: 2.0 */"
            },
          ]
        : []),
    ],
  }));
