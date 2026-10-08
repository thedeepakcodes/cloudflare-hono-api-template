import { ApiError } from "./ApiError";

export class Forbidden extends ApiError {
  constructor(message = "Forbidden", data?: unknown) {
    super(403, message, data);
  }
}
