import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    build: {
      rollupOptions: {
        // Two real HTML entry points rather than client-side routing.
        //
        // The child protection page must resolve on a direct link, from a
        // shared message, on any static host, with no rewrite rules
        // configured. A client-side route would 404 until hosting is set up
        // correctly, which is an unacceptable failure mode for an emergency
        // entry point.
        input: {
          main: path.resolve(__dirname, "index.html"),
          proteccionInfantil: path.resolve(
            __dirname,
            "proteccion-infantil.html",
          ),
          contacto: path.resolve(__dirname, "contacto.html"),
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    server: {
      // HMR is disabled in AI Studio via the DISABLE_HMR env var.
      // File watching is disabled with it, to prevent flickering
      // during agent edits.
      hmr: process.env.DISABLE_HMR !== "true",
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === "true" ? null : {},
    },
  };
});
