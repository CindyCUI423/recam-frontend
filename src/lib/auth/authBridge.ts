/**
 * A bridge file so non-React code (axios interceptors) can use Jotai hook
 */

// A getter function that always returns the latest access token
let tokenGetter: (() => string | null) | null = null;

// Allows non-React code (axios) to read the latest token
export function setTokenGetter(getter: () => string | null) {
  tokenGetter = getter;
}

// Read the current latest token (used inside axios interceptors)
export function getAccessToken(): string | null {
  return tokenGetter ? tokenGetter() : null;
}

let onUnauthorized: (() => void) | null = null;

// Register a callback function that wil be called when API gets 401
export function setOnUnauthorized(handler: () => void) {
  onUnauthorized = handler;
}

export function triggerUnauthorized() {
  onUnauthorized?.();
}