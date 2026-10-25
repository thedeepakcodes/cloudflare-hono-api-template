import { ApiError } from "./ApiError";

export class PayloadTooLarge extends ApiError {
  constructor(message = "Payload Too Large", data?: unknown) {
    super(413, message, data);
  }
}
