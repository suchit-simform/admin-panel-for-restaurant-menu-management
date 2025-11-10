import { defineAbilityFor } from "src/lib/ability/ability";
import { generateAuthToken } from "src/lib/utils";
import type { Role } from "src/types/common";
import type { User } from "src/types/user";
import { v4 as uuid } from "uuid";

export const handleMockUserAuthentication = (values: { email: string; role: Role }) => {
  const authToken = generateAuthToken();
  const currentUser: User = {
    email: values.email,
    role: values.role,
    id: uuid(),
  };
  const currentUserAbility = defineAbilityFor(currentUser);

  return { authToken, currentUser, currentUserAbility };
};
