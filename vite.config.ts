import { defineConfig } from "vite";
import path from "path";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { autoRoutesPlugin } from "./vite-plugin-auto-routes";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    autoRoutesPlugin(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  server: {
    port: 3030,
    strictPort: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "./dist",
  },
});
