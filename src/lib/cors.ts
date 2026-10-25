import { env } from "cloudflare:workers";
import { MiddlewareHandler } from "hono";
import { cors } from "hono/cors";
import { match } from "path-to-regexp";

const publicRoutes = [
  {
    path: "/public",
    methods: ["POST", "GET"],
  },
].map((r) => ({ ...r, path: match(r.path) }));

export const corsMiddleware: MiddlewareHandler = (c, next) => {
  const currentPath = c.req.path;
  const currentMethod = c.req.method === "OPTIONS" ? (c.req.header("Access-Control-Request-Method") ?? "OPTIONS") : c.req.method;

  const allowedOrigins = (env.ALLOWED_ORIGINS || "").split(",");

  const isPublicRoute = publicRoutes.some((route) => route.path(currentPath) !== false && route.methods.includes(currentMethod));

  if (isPublicRoute) {
    return cors({
      origin: "*",
      maxAge: 600,
    })(c, next);
  }

  return cors({
    origin: allowedOrigins,
    credentials: true,
    maxAge: 600,
  })(c, next);
};
