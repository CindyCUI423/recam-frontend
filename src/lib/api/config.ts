export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!url) {
    return "http://localhost:5000";
  }
  return url.replace(/\/+$/, "");
}