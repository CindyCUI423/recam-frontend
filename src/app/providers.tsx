'use client'
import { tokenAtom } from "@/atoms/authAtoms";
import { useAuthServices } from "@/lib/auth/authServices";
import { setOnUnauthorized, setTokenGetter } from "@/lib/auth/authBridge";
import { createStore, Provider } from "jotai";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";


const store = createStore();

function Bootstrapper () {
  const { restore, logout } = useAuthServices();
  const router = useRouter();

  useEffect(() => {
    // Allow axios interceptors (non-React code) to always read the latest token
    setTokenGetter(() => store.get(tokenAtom));

    // Restore auth state from web storage on app start (refresh-safe)
    restore();

    // Allows axios interceptors (non-React code) to trigger a logout + redirect
    setOnUnauthorized(() => {
      logout();
      router.replace("/login");
    });

  }, [restore, logout, router]);

  return null;
}

export function AppProviders({ children }: { children: ReactNode}) {

  return (
    <Provider store={store}>
      <Bootstrapper />
      {children}
    </Provider>);
}