export interface User {
  access: string[],
  email: string;
  full_name: string;
  id: string;
  phone: string;
  project_id: number | null;
  role: number | null;
  username: string | null;
}

export function createUser(data: User): User {
  return {
    access: data.access,
    email: data.email || "",
    full_name: data.full_name,
    id: data.id,
    phone: data.phone || "",
    project_id: data.project_id,
    role: data.role,
    username: data.username,
  };
}
