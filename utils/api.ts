import * as SecureStore from "expo-secure-store";

export async function authFetch(
  input: RequestInfo | string,
  init?: RequestInit
) {
  // read token from secure storage
  const token = await SecureStore.getItemAsync("session");

  const headers = new Headers(init?.headers as HeadersInit | undefined);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // don't overwrite content-type for GET
  if (
    !headers.get("Content-Type") &&
    !(init && init.method && init.method.toUpperCase() === "GET")
  ) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(input, { ...init, headers });
  return response;
}

export async function authJson(
  input: RequestInfo | string,
  init?: RequestInit
) {
  const res = await authFetch(input, init);
  const data = await res.json().catch(() => null);
  return { res, data };
}
