import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getApiBaseUrl } from "./config";
import { getAccessToken, triggerUnauthorized } from "../auth/authBridge";
import { ApiError } from "./error";


/**
 * Create an axios instance for the whole app
 */
export const api: AxiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
});

/**
 * Request interceptor
 * Runs before every request is sent
 * Dynamically reads the latest access token
 * Injects Authorization header if token exists
 * Deletes Authorization header to avoid accidentally sending a stale token
 */
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
     config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      config.headers.delete("Authorization");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor
 * 401: logout and redirect to login page
 */
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;

    if (status == 401) {
      // call onUnauthorized to logout and redirect to login page
      triggerUnauthorized();
    }

    return Promise.reject(error);
  }
);

/**
 * Normalize backend ErrorResponse from different casing.
 * (ASP.NET typically serializes to camelCase, but we support both just in case.)
 */
function normalizeErrorResponse(data: any): {
  message: string;
  errors: Record<string, string[]>;
} | null {
  if (!data || typeof data !== "object") return null;

  const message = data.message ?? data.Message;
  const errors = data.errors ?? data.Errors;

  if (typeof message !== "string") return null;

  return {
    message, 
    errors: errors && typeof errors === "object" ? errors : undefined
  };
}

/**
 * A wrapper for axios calls:
 * - returns response.data on success
 * - throws a structured ApiError on failure
 */
export async function request<T>(promise: Promise<AxiosResponse<T>>): Promise<T> {
  try {
    const response = await promise;
    return response.data;

  } catch (err: any) {
    const status = err?.response?.status ?? 0;
    const parsed = normalizeErrorResponse(err?.response.data);

    if(parsed) {
      throw new ApiError({
        message: parsed.message, // prefer using backend ErrorResponse.Message
        status,
        errors: parsed.errors
      });
    }

    // Fallback message for Network / CORS / timeout / or non-standard error body
    const fallbackMessage = 
      typeof err?.message === "string" && err.message.trim()
        ? err.message
        : "Request failed. Please try again.";

    throw new ApiError({
      message: fallbackMessage,
      status
    });
  }
}







