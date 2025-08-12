import { createRollupConfig } from "./rollup.config.common.mjs";

export default createRollupConfig({
  inputFiles: ["index"],
  additionalPlugins: [
    {
      name: 'resolve-imports',
      resolveId(source) {
        if (source === '@notifi-network/dev-utils') {
          return {
            id: '@notifi-network/dev-utils',
            external: true
          };
        }
        return null;
      }
    }
  ]
});
