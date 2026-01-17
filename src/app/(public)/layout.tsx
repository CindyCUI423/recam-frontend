
import Image from "next/image";

export default function AuthLayout({ children }: {children: React.ReactNode}) {
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
                  Manage your property media deliveries easily.
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
            {children}
            <p className="mt-6 text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} Recam. All rights reserved.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}