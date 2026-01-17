"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { Formik } from "formik";
import { RoleType } from "@/lib/constants/roles";
import { SignUpValues } from "./types";
import * as Yup from "yup";
import { FieldError } from "@/components/forms/FieldError";
import { validationSchema } from "./validation"

export default function SignUpPage() {
  const initialValues: SignUpValues = {
    email: "",
    userName: "",
    roleType: RoleType.PhotographyCompany,
    password: "",
    confirmPassword: "",
    photographyCompany: "",
    agentFirstName: "",
    agentLastName: "",
    agentCompany: ""
  };

    return (
    <Card className="border-border">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Sign up</CardTitle>
        <CardDescription className="text-center">Sign up with email to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur={true}
          validateOnChange={false}
          onSubmit={(values, { setSubmitting }) => {
            // TODO: connect to API later
            const signUpDto = {
              UserName: values.userName,
              Email: values.email,
              Password: values.password,
              RoleType: values.roleType,
              PhotographyCompanyInfo:
                values.roleType === RoleType.PhotographyCompany
                  ? { PhotographyCompanyName: values.photographyCompany }
                  : null,
              AgentInfo:
                values.roleType === RoleType.Agent
                  ? {
                      AgentFirstName: values.agentFirstName,
                      AgentLastName: values.agentLastName,
                      AgentCompanyName: values.agentCompany,
                    }
                  : null,
            };

            console.log("sign up dto: ", signUpDto);

            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            setFieldTouched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="you@company.com" 
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur} 
                />
                {touched.email && <FieldError message={errors.email}/>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="userName">Username</Label>
                <Input 
                  id="userName" 
                  name="userName"
                  type="text"
                  autoComplete="userName"
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.userName && <FieldError message={errors.userName}/>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.password && <FieldError message={errors.password} />}
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters, including uppercase, lowercase, number and special character.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.confirmPassword && <FieldError message={errors.confirmPassword} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">User Role</Label>
                <Select
                  value={values.roleType}
                  onValueChange={(val) => {
                    setFieldValue("roleType", val);
                    setFieldTouched("roleType", true, false);

                    // clear irrelevant fields when switching role
                    if (val === RoleType.Agent) {
                      setFieldValue("photographyCompany", "");
                    } else if (val === RoleType.PhotographyCompany) {
                      setFieldValue("agentFirstName", "");
                      setFieldValue("agentLastName", "");
                      setFieldValue("agentCompany", "");
                    }
                  }}
                >
                  <SelectTrigger className="w-fit">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="border-input w-fit">
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value={RoleType.PhotographyCompany}>Photography Company</SelectItem>
                      <SelectItem value={RoleType.Agent}>Agent</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                 {touched.roleType && <FieldError message={errors.roleType as string | undefined} />}
              </div>

              {/* Conditional Rendering - Photography Company */}
              {values.roleType === RoleType.PhotographyCompany && (
                <div className="space-y-2">
                  <Label htmlFor="password-confirm">Photography Company</Label>
                  <Input 
                    id="photographyCompany" 
                    name="photographyCompany"
                    type="text"
                    value={values.photographyCompany}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.photographyCompany && <FieldError message={errors.photographyCompany} />}
                </div>
              )}
              
              {/* Conditional Rendering - Agent */}
              {values.roleType === RoleType.Agent && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="password-confirm">First Name</Label>
                    <Input 
                      id="agentFirstName" 
                      name="agentFirstName"
                      type="text" 
                      value={values.agentFirstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.agentFirstName && <FieldError message={errors.agentFirstName} />}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-confirm">Last Name</Label>
                    <Input 
                      id="agentLastName" 
                      name="agentLastName"
                      type="text" 
                      value={values.agentLastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.agentLastName && <FieldError message={errors.agentLastName} />}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-confirm">Agent Company</Label>
                    <Input 
                      id="agentCompany" 
                      name="agentCompany"
                      type="text" 
                      value={values.agentCompany}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.agentCompany && <FieldError message={errors.agentCompany} />}
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Sign up
              </Button>

              <div className="relative py-1">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                  OR
                </span>
              </div>

              {/* TODO: Implement it later */}
              <Button type="button" variant="outline" className="w-full">
                Login with Google
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline underline-offset-4">
                  Login
                </Link>
              </p>
            </form>
          )}


        </Formik>
        
      </CardContent>
    </Card>
  );
}