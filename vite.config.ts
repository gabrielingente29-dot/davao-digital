import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react/jsx-runtime", "react-dom", "react-dom/client"],
  },
  build: {
    target: "esnext",
    sourcemap: false,
    rollupOptions: {
      /**
       * Multi-page build. Static hosts (Netlify, Vercel, nginx, Apache) serve
       * the matching .html for each route; `404.html` is the conventional
       * not-found fallback on nearly every host.
       */
      input: {
        main: path.resolve(__dirname, "index.html"),
        thanks: path.resolve(__dirname, "thanks.html"),
        privacy: path.resolve(__dirname, "privacy.html"),
        "404": path.resolve(__dirname, "404.html"),
      },
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
  server: {
    host: true,
    port: 5199,
    hmr: { overlay: false },
  },
});
