export type AuthSession = {
  userId: string;
  name: string;
  email: string;
  role: string;
};

const AUTH_KEY = "skillbridge-auth";
const PROFILE_KEY = "skillbridge-profile";

export function saveAuthSession(session: AuthSession) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
}

export function getAuthSession(): AuthSession | null {
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_KEY);
}

export function saveStoredProfile(profile: any) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getStoredProfile() {
  const raw = localStorage.getItem(PROFILE_KEY);
  return raw ? JSON.parse(raw) : null;
}
