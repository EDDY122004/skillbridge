export type UserRole = "learner" | "provider" | "admin";

export type AuthUser = {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
};

export const DEFAULT_ROLE: UserRole = "learner";

export const ROLE_ROUTES: Record<UserRole, string> = {
  learner: "/dashboard",
  provider: "/provider",
  admin: "/admin",
};

export function isUserRole(value: string | undefined): value is UserRole {
  return value === "learner" || value === "provider" || value === "admin";
}

export function getDefaultDashboard(role?: string): string {
  if (role === "provider") return "/provider";
  if (role === "admin") return "/admin";
  return "/dashboard";
}

export function canAccessRoute(role: string | undefined, pathname: string): boolean {
  if (!role || !isUserRole(role)) return false;

  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    return true;
  }

  if (pathname === "/profile" || pathname.startsWith("/profile/")) {
    return true;
  }

  if (pathname === "/provider" || pathname.startsWith("/provider/")) {
    return role === "provider" || role === "admin";
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return role === "admin";
  }

  return true;
}
