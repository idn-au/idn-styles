import { resolve } from "path";
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import libCss from "vite-plugin-libcss";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx(), libCss()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    },
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, "src/plugin.js"),
            name: "IDNLib",
            // the proper extensions will be added
            fileName: (format) => `idn-lib.${format}.js`,
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn"t be bundled
            // into your library
            external: ["vue"],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: "Vue"
                }
            }
        }
    }
});
