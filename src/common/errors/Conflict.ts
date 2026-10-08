import { ApiError } from "./ApiError";

export class Conflict extends ApiError {
  constructor(message = "Conflict", data?: unknown) {
    super(409, message, data);
  }
}
