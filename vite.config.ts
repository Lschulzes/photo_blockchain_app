import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import polyfillNode from "rollup-plugin-polyfill-node";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), polyfillNode()],
  optimizeDeps: {
    exclude: ["dragula"], // <- modules that needs shimming have to be excluded from dep optimization
  },
});
