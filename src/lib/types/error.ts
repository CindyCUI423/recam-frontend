/**
 * Mirror backend: Recam.Common.Exceptions.ErrorResponse
 */
export interface ErrorResponse {
  statusCode: number;
  message: string;
  errorType: string;
  errors?: Record<string, string[]>;
}