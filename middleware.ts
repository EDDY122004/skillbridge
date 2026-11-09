export type AuthSession = {
  userId: string;
  name: string;
  email: string;
  role: string;
};

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

const AUTH_KEY = "skillbridge-auth";
const PROFILE_KEY = "skillbridge-profile";
const USERS_KEY = "skillbridge-users";

const DEMO_USERS: StoredUser[] = [
  {
    id: "demo-learner",
    name: "Student User",
    email: "demo@skillbridge.com",
    password: "password123",
    role: "learner",
  },
  {
    id: "demo-provider",
    name: "Provider User",
    email: "provider@skillbridge.com",
    password: "provider123",
    role: "provider",
  },
  {
    id: "demo-admin",
    name: "Admin User",
    email: "admin@skillbridge.com",
    password: "admin123",
    role: "admin",
  },
];

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function getCookieValue(name: string): string | null {
  if (!isBrowser()) {
    return null;
  }

  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookieValue(name: string, value: string, maxAgeSeconds = 60 * 60 * 24 * 7): void {
  if (!isBrowser()) {
    return;
  }

  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

function clearCookieValue(name: string): void {
  if (!isBrowser()) {
    return;
  }

  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

export function saveAuthSession(session: AuthSession): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  setCookieValue(AUTH_KEY, JSON.stringify(session));
}

export function getAuthSession(): AuthSession | null {
  if (!isBrowser()) {
    return null;
  }

  const rawLocal = localStorage.getItem(AUTH_KEY);
  const rawCookie = getCookieValue(AUTH_KEY);
  const raw = rawLocal ?? rawCookie;

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function clearAuthSession(): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(AUTH_KEY);
  clearCookieValue(AUTH_KEY);
}

export function saveStoredProfile(profile: Record<string, unknown>): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getStoredProfile(): Record<string, unknown> | null {
  if (!isBrowser()) {
    return null;
  }

  const raw = localStorage.getItem(PROFILE_KEY);
  return raw ? (JSON.parse(raw) as Record<string, unknown>) : null;
}

export function getUsers(): StoredUser[] {
  if (!isBrowser()) {
    return DEMO_USERS;
  }

  const stored = localStorage.getItem(USERS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as StoredUser[];
    } catch {
      localStorage.removeItem(USERS_KEY);
    }
  }

  localStorage.setItem(USERS_KEY, JSON.stringify(DEMO_USERS));
  return DEMO_USERS;
}

export function saveUsers(users: StoredUser[]): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function ensureDemoUsers(): StoredUser[] {
  const users = getUsers();
  if (users.length === 0) {
    saveUsers(DEMO_USERS);
    return DEMO_USERS;
  }
  return users;
}
