import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), mkcert()],
  server: {
    host: true,
    // https: true,
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
});
