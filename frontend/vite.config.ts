import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
      "@api": fileURLToPath(new URL("./src/api", import.meta.url)),
      "@types": fileURLToPath(new URL("./src/types", import.meta.url)),
      "@state": fileURLToPath(new URL("./src/state", import.meta.url)),
      "@routes": fileURLToPath(new URL("./src/routes", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "vendor-react";
            if (id.includes("@mui")) return "vendor-mui";
            if (id.includes("@tanstack")) return "vendor-tanstack";
            if (id.includes("jotai")) return "vendor-jotai";
            return "vendor";
          }
        },
        chunkFileNames: "assets/chunk-[name]-[hash].js",
        entryFileNames: "assets/entry-[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? "asset";
          if (/\.css$/i.test(name)) return "assets/style-[name]-[hash][extname]";
          if (/\.(woff2?|ttf|otf|eot)$/i.test(name)) return "assets/fonts/[name]-[hash][extname]";
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(name)) return "assets/images/[name]-[hash][extname]";
          return "assets/[name]-[hash][extname]";
        },
      },
    },
    sourcemap: true,
    cssCodeSplit: true,
  },
});
