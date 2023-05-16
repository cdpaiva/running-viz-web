import { Role } from "./types/Roles";

export const config = {
  baseURL: "http://localhost:3000/api/v1",
  roles: ["user", "admin"] as Role[],
};
