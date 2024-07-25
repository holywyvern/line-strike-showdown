import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  registerType: "autoUpdate",
  devOptions: {
    enabled: true,
  },
  includeAssests: ["icon.webp"],
  manifest: {
    name: "Line Strike Showdown",
    short_name: "line-strike-showdown",
    description: "Play Line strike in your browser",
    icons: [
      {
        src: "/app/android-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/app/512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/app/apple-180.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/app/512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#14669d",
    background_color: "#000000",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "any",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:2567",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
