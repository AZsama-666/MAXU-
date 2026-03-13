import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  define: {
    __BUILD_ID__: JSON.stringify(
      process.env.GITHUB_SHA ? process.env.GITHUB_SHA.slice(0, 7) : "local-" + Date.now().toString(36)
    ),
  },
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173
  }
});
