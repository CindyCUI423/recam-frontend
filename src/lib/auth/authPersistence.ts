import { AuthSnapshot } from "../types/auth";

const KEY = "AuthSnapshot"

/**
 * Save AuthSnapshot to web storage
 */
export function saveAuthSnapshot(snapshot: AuthSnapshot) {
  sessionStorage.setItem(KEY, JSON.stringify(snapshot));
}

/**
 * Retrieve AuthSnapshot from web storage
 */
export function loadAuthSnapshot(): AuthSnapshot | null {
  const raw = sessionStorage.getItem(KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthSnapshot;
  } catch {
    return null;
  }
}

/**
 * Check if user's credentials is expired
 */
export function isAuthExpired(snapshot: AuthSnapshot): boolean {
  const expiresAt = snapshot.user?.expiresAt;

  if (!expiresAt) return true;

  const ms = new Date(expiresAt).getTime();

  if (!Number.isFinite(ms)) return true;

  return Date.now() >= ms;
}

/**
 * Clear AuthSnapshot in web storage
 */
export function clearAuthSnapshot() {
  sessionStorage.removeItem(KEY);
}