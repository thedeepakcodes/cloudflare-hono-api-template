import { ApiError } from "./ApiError";

export class MethodNotAllowed extends ApiError {
  constructor(message = "Method Not Allowed", data?: unknown) {
    super(405, message, data);
  }
}
