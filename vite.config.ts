import { defineConfig, Plugin } from "vite";
import dts from "vite-plugin-dts";
import { builtinModules } from "node:module";

const name = "i18n-helper";

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: "src/index.ts",
        name: name,
        fileName: (format) => (format === "es" ? `${name}.mjs` : `${name}.js`),
      },
      rollupOptions: {
        external: [...builtinModules],
      },
    },
    plugins: [
      dts({
        outDir: "dist/types",
      }) as unknown as Plugin,
    ],
  };
});