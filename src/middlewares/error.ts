import { env } from "cloudflare:workers";
import { APIError as DodoApiError } from "dodopayments";
import { ErrorHandler } from "hono/types";

import { ZodError } from "zod";
import { ApiError } from "../common/errors";

export const errorHandler: ErrorHandler = (err, c) => {
  const isDev = env.NODE_ENV !== "production";

  if (err instanceof ApiError) {
    const statusCode = err.statusCode as any;
    const message = err.message;
    const data = err.data;

    return c.json(new ApiError(statusCode, message, data), statusCode);
  }

  // Handle malformed payload
  if (err instanceof SyntaxError && "body" in err) {
    return c.json(new ApiError(400, "Malformed JSON payload.", undefined), 400);
  }

  // Handle Dodo Error
  if (err instanceof DodoApiError) {
    return c.json(new ApiError(err.status, err.message.replace(err.status, "").trim()), err.status);
  }

  // Handle Zod errors
  if (err instanceof ZodError) {
    if (isDev) {
      console.error(err, "Zod error");
    }
    const message = err.issues[0]?.message ?? "Request validation failed.";

    return c.json(new ApiError(400, message, { field: err.issues[0]?.path.join(".") }), 400);
  }

  console.error(err, "Unhandled error");

  const message = isDev ? err?.message || "Internal Server Error" : "Internal Server Error";
  return c.json(new ApiError(500, message), 500);
};
