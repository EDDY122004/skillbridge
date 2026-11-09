export type UserRole = "learner" | "provider" | "admin";

export function isUserRole(value: unknown): value is UserRole {
  return value === "learner" || value === "provider" || value === "admin";
}

export function getDefaultDashboard(role: unknown): string {
  if (role === "provider") return "/provider";
  if (role === "admin") return "/admin";
  return "/dashboard";
}

export function getTrustedRole(appMetadata: Record<string, unknown> | undefined): UserRole {
  const role = appMetadata?.role;
  return isUserRole(role) ? role : "learner";
}
