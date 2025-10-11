import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react-router")
          ) {
            return "react-vendor";
          }

          // UI libraries
          if (
            id.includes("node_modules/framer-motion") ||
            id.includes("node_modules/lucide-react") ||
            id.includes("node_modules/@radix-ui")
          ) {
            return "ui-vendor";
          }

          // State management
          if (
            id.includes("node_modules/@reduxjs") ||
            id.includes("node_modules/react-redux") ||
            id.includes("node_modules/redux-persist")
          ) {
            return "state-vendor";
          }

          // Data fetching
          if (id.includes("node_modules/@tanstack/react-query")) {
            return "query-vendor";
          }

          // Forms
          if (
            id.includes("node_modules/react-hook-form") ||
            id.includes("node_modules/@hookform") ||
            id.includes("node_modules/zod")
          ) {
            return "form-vendor";
          }

          // HTTP client
          if (id.includes("node_modules/axios")) {
            return "http-vendor";
          }

          // Utilities
          if (
            id.includes("node_modules/clsx") ||
            id.includes("node_modules/tailwind-merge") ||
            id.includes("node_modules/class-variance-authority")
          ) {
            return "utils-vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Tăng limit lên 1000kb
    // Rolldown uses its own minifier by default
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "@reduxjs/toolkit",
      "react-redux",
      "@tanstack/react-query",
    ],
  },
});
