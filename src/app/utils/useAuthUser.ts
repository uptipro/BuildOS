/**
 * useAuthUser — reads the logged-in user from localStorage (set on login).
 * Returns name, email, role, and derived initials.
 */
export function useAuthUser() {
  let name = "";
  let email = "";
  let role = "";
  let assignedApps: string[] = [];

  try {
    const raw = localStorage.getItem("auth_user");
    if (raw) {
      const parsed = JSON.parse(raw);
      name = parsed.name ?? "";
      email = parsed.email ?? "";
      role = parsed.role ?? "";
      assignedApps = Array.isArray(parsed.assignedApps)
        ? parsed.assignedApps.map((app: unknown) => String(app))
        : [];
    }
  } catch {
    // ignore
  }

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0].toUpperCase())
    .slice(0, 2)
    .join("");

  return { name, email, role, initials, assignedApps };
}
