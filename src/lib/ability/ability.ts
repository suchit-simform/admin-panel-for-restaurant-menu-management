import { AbilityBuilder, createMongoAbility, type MongoAbility } from "@casl/ability";
import type { User } from "src/types/user";

export type Actions = "create" | "read" | "update" | "delete" | "manage";
export type Subjects = "Kpi" | "Comment" | "User" | "all";
export type AppAbility = MongoAbility<[Actions, Subjects]>;

export function defineAbilityFor(user?: User | null) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (!user) {
    cannot("read", "all");
    return build();
  }

  if (user.role === "admin") {
    can("manage", "all"); // read-write access to everything
  } else {
    can("read", "all"); // read-only access to everything
    cannot("read", "Kpi"); // except Kpi
  }

  return build();
}
