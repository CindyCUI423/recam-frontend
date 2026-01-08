import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

/**
 * Login Page
 * - Mobile friendly: left panel hidden on small screens.
 */
export default function LoginPage() {
  return (
    <div className="min-h-dvh w-full bg-background text-foreground">
      <div className="grid min-h-dvh lg:grid-cols-2">
        {/* Left branding panel (hidden on mobile) */}
        <aside className="relative hidden overflow-hidden bg-muted lg:block">
          {/* Decorative background blobs - replace later with another picture if needed */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
          </div>

          <div className="relative flex h-full flex-col p-10">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/recam-rectangular.jpg"
                alt="Recam logo"
                width={160}
                height={48}
              />
            </div>

            {/* Text block */}
            <div className="flex flex-1 items-center">
              <div className="max-w-md">
                <h1 className="text-3xl font-semibold leading-tight tracking-tight">
                  Sign in to manage your property media deliveries.
                </h1>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  A simple and reliable platform for real estate photography management.
                </p>
              </div>
            </div>
            
          </div>
        </aside>

        {/* Right form panel */}
        <main className="flex items-center justify-center px-5 py-10">
          <div className="w-full max-w-md">
            {/* Mobile header - logo */}
            <div className="mb-8 items-center lg:hidden">
              <Image
                src="/recam-rectangular.jpg"
                alt="Recam logo"
                width={120}
                height={36}
              />
            </div>

            <Card className="border-border">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Sign in</CardTitle>
                <CardDescription className="text-center">Enter your email and password to continue.</CardDescription>
              </CardHeader>

              <CardContent>
                {/* 
                  This is UI-only.
                  Later we can connect to your auth flow (axios + Jotai atoms).
                */}
                <form className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@company.com" autoComplete="email" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-primary underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                      <Checkbox id="remember" />
                      Remember me
                    </label>

                    {/* <span className="text-xs text-muted-foreground">
                      By continuing you agree to our{" "}
                      <Link href="/terms" className="text-primary hover:underline underline-offset-4">
                        Terms
                      </Link>
                    </span> */}
                  </div>

                  <Button type="submit" className="w-full">
                    Sign in
                  </Button>

                  <div className="relative py-1">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                      OR
                    </span>
                  </div>

                  <Button type="button" variant="outline" className="w-full">
                    Continue with SSO
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Don’t have an account?{" "}
                    <Link href="/signup" className="text-primary hover:underline underline-offset-4">
                      Create one
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} Recam. All rights reserved.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
