export type AuthSession = {
  userId: string;
  name: string;
  email: string;
  role: string;
};

const PROFILE_CACHE_KEY = "skillbridge-profile";

// Deprecated auth-session helpers have been removed: authentication and authorization
// must use Supabase-managed HttpOnly cookies and trusted app_metadata roles.
export function saveStoredProfile(profile: Record<string, unknown>): void {
  if (typeof window !== "undefined") localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(profile));
}

export function getStoredProfile(): Record<string, unknown> | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(PROFILE_CACHE_KEY);
  if (!value) return null;
  try { return JSON.parse(value) as Record<string, unknown>; } catch { return null; }
}
