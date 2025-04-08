// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt"],
      manifest: {
        name: "Bama Monarch Chat",
        short_name: "BamaChat",
        description: "One-way chat with yourself",
        theme_color: "#ffffff",
        icons: [
					{
						src: "/images/icon/pwa-192x192.png", // ← root-based path
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/images/icon/pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
      },
    }),
  ],
});
