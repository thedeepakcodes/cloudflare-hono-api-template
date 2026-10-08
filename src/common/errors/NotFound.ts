import { ApiError } from "./ApiError";

export class NotFound extends ApiError {
  constructor(message = "Not Found", data?: unknown) {
    super(404, message, data);
  }
}
