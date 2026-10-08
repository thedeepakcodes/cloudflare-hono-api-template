import { ApiError } from "./ApiError";

export class Unauthorized extends ApiError {
  constructor(message = "Unauthorized", data?: unknown) {
    super(401, message, data);
  }
}
