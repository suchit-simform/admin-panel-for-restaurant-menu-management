import type { Role } from "./common";

export type User = {
  id: string;
  email: string;
  role: Role;
};
