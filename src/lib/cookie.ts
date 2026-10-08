import { env } from "cloudflare:workers";
import type { Context } from "hono";
import * as hono from "hono/cookie";
import { CookieOptions } from "hono/utils/cookie";

const isProduction = env.NODE_ENV === "production";

/**
 * Adds environment-aware defaults.
 */
function resolveOptions(options: CookieOptions = {}) {
  return {
    httpOnly: options.httpOnly ?? true,
    secure: options.secure ?? isProduction,
    path: options.path ?? "/",
    sameSite: options.sameSite ?? "lax",
    ...(options.maxAge !== undefined && { maxAge: options.maxAge }),
    ...(options.domain && { domain: options.domain }),
  };
}

/**
 * Sets a standard cookie on the Hono context.
 */
export function setCookie(c: Context, name: string, value: string, options: CookieOptions = {}) {
  const resolved = resolveOptions(options);
  hono.setCookie(c, name, value, resolved);
}

/**
 * Sets a cryptographically signed cookie on the Hono context.
 */
export async function setSignedCookie(c: Context, name: string, value: string, options: CookieOptions = {}) {
  const resolved = resolveOptions(options);
  await hono.setSignedCookie(c, name, value, env.COOKIE_SECRET, resolved);
}

/**
 * Retrieves a standard cookie value by name.
 */
export function getCookie(c: Context, name: string): string | undefined {
  return hono.getCookie(c, name);
}

/**
 * Retrieves and verifies a signed cookie value by name.
 */
export async function getSignedCookie(c: Context, name: string) {
  return await hono.getSignedCookie(c, env.COOKIE_SECRET, name);
}

/**
 * Deletes a cookie by expiring it immediately.
 */
export function deleteCookie(c: Context, name: string, options: Pick<CookieOptions, "path" | "domain"> = {}) {
  hono.deleteCookie(c, name, {
    path: options.path ?? "/",
    ...(options.domain && { domain: options.domain }),
  });
}
