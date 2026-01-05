"use client"

import { authSnapshotAtom, tokenAtom } from "@/atoms/authAtoms";
import { useSetAtom } from "jotai"
import { AuthSnapshot, LoginRequest } from "../types/auth";
import { AuthApi } from "./authApi";
import { clearAuthSnapshot, isAuthExpired, loadAuthSnapshot, saveAuthSnapshot } from "./authPersistence";

/**
 * Central place for auth-related actions:
 * - login
 * - logout
 * - restore (rehydration)
 * 
 */
export function useAuthServices() {
  const setAuthSnapshot = useSetAtom(authSnapshotAtom);

  async function login(body: LoginRequest): Promise<AuthSnapshot> {
    // call login api
    const res = await AuthApi.login(body);

    // build AuthSnapShot
    const snapshot: AuthSnapshot = {
      user: res.userInfo!,
      agentInfo: res.agentInfo ?? undefined,
      photographyCompanyInfo: res.photographyCompanyInfo ?? undefined
    };

    // write AuthSnapShot to Jotai
    setAuthSnapshot(snapshot);

    // persist AuthSnapShot
    saveAuthSnapshot(snapshot);

    return snapshot;
  }

  function logout() {
    setAuthSnapshot(null);
    clearAuthSnapshot();
  }

  
  function restore() {
    // get the AuthSnapshot from web storage
    const snapshot = loadAuthSnapshot();

    if (!snapshot) return;

    if (isAuthExpired(snapshot)) {
      logout();
      return;
    }

    // write AuthSnapshot to Jotai
    setAuthSnapshot(snapshot);
  }






  return {
    login,
    logout,
    restore,
  };
}