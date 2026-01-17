import { RoleType } from "@/lib/constants/roles"

/**
 * Types used in signup page
 */

export type SignUpValues = {
  email: string,
  userName: string,
  password: string,
  confirmPassword: string,
  roleType: RoleType,
  
  // Photography Company
  photographyCompany: string,

  // Agent
  agentFirstName: string,
  agentLastName: string,
  agentCompany: string,
}