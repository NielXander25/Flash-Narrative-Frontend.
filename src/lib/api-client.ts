import { API_BASE } from "./constants";
import type { CampaignPayload } from "./types";

export interface CampaignCreateResponse {
  ok: boolean;
  id?: string;
  error?: string;
  raw?: unknown;
}

const TOKEN_KEY = "fn_access_token";
const API_KEY_KEY = "fn_api_key";

export const setAuthToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const setApiKey = (key: string) => localStorage.setItem(API_KEY_KEY, key);

export const createCampaign = async (
  payload: CampaignPayload,
): Promise<CampaignCreateResponse> => {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
  const apiKey = typeof window !== "undefined" ? localStorage.getItem(API_KEY_KEY) : null;
  if (token) headers.Authorization = `Bearer ${token}`;
  else if (apiKey) headers["X-API-KEY"] = apiKey;

  try {
    const res = await fetch(`${API_BASE}/campaigns/create`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (!res.ok) {
      return {
        ok: false,
        error:
          (data.detail as string | undefined) ??
          (data.error as string | undefined) ??
          `Request failed (${res.status})`,
        raw: data,
      };
    }
    return { ok: true, id: data.id as string | undefined, raw: data };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Network error contacting backend",
    };
  }
};
