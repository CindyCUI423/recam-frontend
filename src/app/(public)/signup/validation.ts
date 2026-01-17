import { RoleType } from "@/lib/constants/roles";
import * as Yup from "yup";


/**
   * Yup schema:
   * - Base required fields
   * - confirmPassword must match password
   * - Role-based required fields via `.when("roleType", ...)`
   */
  export const validationSchema = Yup.object({
    email: Yup.string().trim().email("Please enter a valid email.").required("Email is required."),
    userName: Yup.string().trim().required("Username is required."),
    roleType: Yup.mixed<RoleType>()
      .oneOf([RoleType.Agent, RoleType.PhotographyCompany], "Please select a valid role.")
      .required("User role is required."),

    password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters long.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number.")
    .matches(/[^a-zA-Z0-9]/, "Password must contain at least one special character."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match.")
      .required("Please confirm your password."),

    // Photography company field required only when roleType is PhotographyCompany
    photographyCompany: Yup.string().when("roleType", {
      is: RoleType.PhotographyCompany,
      then: (schema) => schema.trim().required("Photography company name is required."),
      otherwise: (schema) => schema.trim().notRequired(),
    }),

    // Agent fields required only when roleType is Agent
    agentFirstName: Yup.string().when("roleType", {
      is: RoleType.Agent,
      then: (schema) => schema.trim().required("First name is required."),
      otherwise: (schema) => schema.trim().notRequired(),
    }),
    agentLastName: Yup.string().when("roleType", {
      is: RoleType.Agent,
      then: (schema) => schema.trim().required("Last name is required."),
      otherwise: (schema) => schema.trim().notRequired(),
    }),
    agentCompany: Yup.string().when("roleType", {
      is: RoleType.Agent,
      then: (schema) => schema.trim().required("Company name is required."),
      otherwise: (schema) => schema.trim().notRequired(),
    }),
  });