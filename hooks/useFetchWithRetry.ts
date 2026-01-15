import { useCallback } from "react";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

async function fetchWithRetry(
  input: RequestInfo,
  init?: RequestInit,
  retries: number = MAX_RETRIES
): Promise<Response> {
  let lastError;
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(input, init);
      return res;
    } catch (err) {
      lastError = err;
      if (i < retries - 1) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      }
    }
  }
  throw lastError;
}

export function useFetchWithRetry() {
  return useCallback(
    (input: RequestInfo, init?: RequestInit, retries?: number) =>
      fetchWithRetry(input, init, retries),
    []
  );
}