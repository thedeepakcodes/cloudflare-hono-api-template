export interface Env {
  Variables: {
    validated?: {
      body?: Record<string, any>;
      query?: Record<string, any>;
      params?: Record<string, any>;
    };
  };
}
