import { api, request } from "../api/client";
import { AuthSnapshot, LoginRequest, LoginResponse } from "../types/auth";

export const AuthApi = {
  login: (body: LoginRequest) => request<LoginResponse>(api.post('/api/auth/login', body)),
};