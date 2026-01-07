import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import Pages from 'vite-plugin-pages'
import AutoImport from "unplugin-auto-import/vite";
import DefineOptions from "unplugin-vue-define-options/vite";
import vuetify from "vite-plugin-vuetify";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Pages({
      dirs: 'src/pages',
    }),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "pinia",
      ],
      dts: true,
      eslintrc: {
        enabled: true,
      },
    }),
    DefineOptions(),

    vuetify({ autoImport: true }),
  ],
  define: { "process.env": {}, "globalThis.global": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)),
      "@app": fileURLToPath(new URL("./src/app", import.meta.url)),
      "@features": fileURLToPath(new URL("./src/features", import.meta.url)),
      "@configured-variables": fileURLToPath(
        new URL("./src/app/assets/styles/_template.scss", import.meta.url)
      ),
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  optimizeDeps: {
    exclude: ["vuetify"],
    entries: ["./src/**/*.vue"],
  },
})
