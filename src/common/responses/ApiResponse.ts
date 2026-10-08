export interface ApiResponse<T = any> {
  status: number;
  success: boolean;
  message: string;
  code?: string;
  data?: T;
}

export class ApiResponse<T = any> implements ApiResponse<T> {
  constructor(
    public success: boolean,
    public status: number,
    public message: string,
    public data?: T,
    public code?: string,
  ) {}
}
