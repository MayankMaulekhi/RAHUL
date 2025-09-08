import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc"; // using SWC (faster)
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/RAHUL/", // 👈 GitHub Pages base path

  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },

  build: {
    outDir: "dist/spa",
  },

  plugins: [react(), expressPlugin()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

// Custom express plugin
function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only during dev
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}
