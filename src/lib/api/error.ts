/**
 * A structured error used across the frontend.
 * - status: HTTP status (0 means network/CORS/timeout/no response)
 * - message: user-friendly message (prefer backend ErrorResponse.message when present)
 * - error: parsed backend ErrorResponse (optional)
 */
export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(params: { message: string; status: number, errors?: Record<string, string[]> }) {
    super(params.message);
    this.name = "ApiError";
    this.status = params.status;
    this.errors = params.errors;
  }
}