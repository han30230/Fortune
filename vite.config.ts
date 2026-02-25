import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// Node 18 호환 (import.meta.dirname은 Node 20.11+)
const __root = path.dirname(fileURLToPath(import.meta.url));

// Vercel 빌드에서는 Replit 플러그인 로드 안 함
const isReplit = typeof process.env.REPL_ID !== "undefined";
const isVercel = typeof process.env.VERCEL !== "undefined";

async function getPlugins() {
  const plugins: any[] = [react()];
  if (!isVercel) {
    const runtimeErrorOverlay = (await import("@replit/vite-plugin-runtime-error-modal")).default;
    plugins.push(runtimeErrorOverlay());
  }
  if (isReplit && process.env.NODE_ENV !== "production") {
    const cartographerPlugin = (await import("@replit/vite-plugin-cartographer")).then((m) => m.cartographer());
    const devBannerPlugin = (await import("@replit/vite-plugin-dev-banner")).then((m) => m.devBanner());
    plugins.push(await cartographerPlugin, await devBannerPlugin);
  }
  return plugins;
}

export default defineConfig(async () => ({
  plugins: await getPlugins(),
  resolve: {
    alias: {
      "@": path.resolve(__root, "client", "src"),
      "@shared": path.resolve(__root, "shared"),
      "@assets": path.resolve(__root, "attached_assets"),
    },
  },
  root: path.resolve(__root, "client"),
  build: {
    outDir: path.resolve(__root, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
}));
