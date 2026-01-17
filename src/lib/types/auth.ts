/**
 * API contract types
 */

export type LoginStatus = 
  "Success"
  | "UserNotFound"
  | "LockedOut"
  | "NotAllowed"
  | "InvalidCredentials"
  | "Error";

  export interface UserLogin {
    id: string;
    userName: string;
    email: string;
    role: string;
    token: string;
    expiresAt: string;
  }

  export interface AgentInfo {
    agentFirstName: string;
    agentLastName: string;
    avatarUrl?: string;
    companyName: string;
  }

  export interface PhotographyCompanyInfo {
    photographyCompanyName: string;
  }

  /**
   * Response body matches backend LoginResponse.cs
   */
  export interface LoginResponse {
    status: LoginStatus;
    errorMessage?: string;
    userInfo?: UserLogin;
    agentInfo?: AgentInfo;
    photographyCompanyInfo?: PhotographyCompanyInfo;
  }

  /**
   * Necessary Auth information stored in sessionStorage
   */
  export interface AuthSnapshot {
    user: UserLogin;
    agentInfo?: AgentInfo;
    photographyCompanyInfo?: PhotographyCompanyInfo;
  }

  /**
   * Request body matches backend LoginRequest.cs
   */
  export interface LoginRequest {
    email: string;
    password: string;
  }

  export interface SignUpRequest {

  }