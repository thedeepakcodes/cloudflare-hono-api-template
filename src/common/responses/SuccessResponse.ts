import { ApiResponse } from "./ApiResponse";

export class SuccessResponse extends ApiResponse {
  constructor(message: string, data?: unknown) {
    super(true, 200, message, data);
  }
}
