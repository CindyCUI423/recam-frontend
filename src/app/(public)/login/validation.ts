import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string().trim().email("Please enter a valid email.").required("Email is required."),
  password: Yup.string().required("Password is required.")
});