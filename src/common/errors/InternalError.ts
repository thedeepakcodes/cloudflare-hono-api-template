import { ApiError } from "./ApiError";

export class InternalError extends ApiError {
  constructor(message = "Internal Server Error", data?: unknown) {
    super(500, message, data);
  }
}
