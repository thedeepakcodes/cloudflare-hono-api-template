import { ApiError } from "./ApiError";

export class BadRequest extends ApiError {
  constructor(message = "Bad Request", data?: unknown) {
    super(400, message, data);
  }
}
