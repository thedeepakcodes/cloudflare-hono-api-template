import { ApiError } from "./ApiError";

export class TooManyRequests extends ApiError {
  constructor(message = "Too Many Requests", data?: unknown) {
    super(429, message, data);
  }
}
