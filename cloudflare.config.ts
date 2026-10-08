import { bindings, defineConfig } from "cf/config";

export default defineConfig(({ mode }) => ({
  worker: {
    name: "cf-hono-api",
    compatibilityDate: "2026-10-07",
    entrypoint: "src/server.ts",
    compatibilityFlags: ["nodejs_compat"],
    env: {
      ASSETS: bindings.assets(),

      NODE_ENV: bindings.text(mode === "production" ? "production" : "development"),
      COOKIE_SECRET: bindings.secret(),
    },
  },
}));
