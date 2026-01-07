import type { LoginResponseDTO } from "@/features/login/api";
import type { User } from "@/features/login/model";
import { createUser } from "@/features/login/model";

export function mapUserDtoToUser(dto: LoginResponseDTO["user_data"]): User {
  return createUser({
    access: dto.access ?? [],
    email: dto.email ?? "",
    full_name: dto.full_name ?? "",
    id: dto.id,
    phone: dto.phone || "",
    project_id: dto.project_id ?? null,
    role: dto.role ?? null,
    username: dto.username ?? "",
  });
}
