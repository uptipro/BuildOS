import { apiFetch } from "./client";

export interface UpdateProfileDto {
  phone?: string | null;
  signature?: string | null;
}

export function updateMyProfile(dto: UpdateProfileDto) {
  return apiFetch("/auth/me", {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}
