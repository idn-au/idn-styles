import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), dts(), tailwindcss()],
    build: {
        lib: {
            entry: resolve(import.meta.dirname, "src/index.ts"),
            name: "idn-lib",
            fileName: "idn-lib",
        },
        rollupOptions: {
            external: ["vue", "vue-router"],
            output: {
                globals: {
                    vue: "Vue",
                },
                inlineDynamicImports: true, // turn off chunking
            },
        },
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    test: {},
});
