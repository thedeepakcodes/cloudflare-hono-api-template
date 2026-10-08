import { ApiResponse } from "../responses";

export class ApiError extends Error {
  statusCode: number;
  data?: unknown;

  constructor(statusCode: number, message: string, data?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  toJSON(): ApiResponse {
    return {
      success: false,
      status: this.statusCode,
      message: this.message,
      data: this.data,
    };
  }
}
