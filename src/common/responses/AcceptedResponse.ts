import { ApiResponse } from "./ApiResponse";

export class AcceptedResponse extends ApiResponse {
  constructor(message: string, data?: unknown) {
    super(true, 202, message, data);
  }
}
