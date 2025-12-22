import { AbilityBuilder, createMongoAbility, type MongoAbility } from "@casl/ability";
import { AppActions, AppSubjects, type AppActionsType, type AppSubjectsType } from "src/lib/ability/ability.config";
import type { User } from "src/types/user";

export type AppAbility = MongoAbility<[AppActionsType, AppSubjectsType]>;

function defineAbilityForUser(abilityBuilder: AbilityBuilder<AppAbility>) {
  const { can, cannot, build } = abilityBuilder;

  can(AppActions.READ, AppSubjects.DASHBOARD);

  // Explicitly list allowed actions for MENU instead of broad MANAGE
  can([AppActions.CREATE, AppActions.READ, AppActions.UPDATE], AppSubjects.MENU);
  // Restrict access to specific fields on MENU
  cannot(AppActions.CREATE, AppSubjects.MENU, ["isAvailable"]);
  cannot(AppActions.UPDATE, AppSubjects.MENU, ["isAvailable"]);
  // Explicitly list allowed actions for CATEGORY
  can([AppActions.CREATE, AppActions.READ, AppActions.UPDATE], AppSubjects.CATEGORY);
  // Explicitly list allowed actions for INGREDIENT
  can([AppActions.CREATE, AppActions.READ, AppActions.UPDATE], AppSubjects.INGREDIENT);

  return build();
}
function defineAbilityForAdmin(abilityBuilder: AbilityBuilder<AppAbility>) {
  const { can, build } = abilityBuilder;

  can(AppActions.MANAGE, AppSubjects.ALL);

  return build();
}
function defineAbilityForGuest(abilityBuilder: AbilityBuilder<AppAbility>) {
  const { cannot, build } = abilityBuilder;

  cannot(AppActions.MANAGE, AppSubjects.ALL);

  return build();
}

export function defineAbilityFor(user?: User | null) {
  const abilityBuilder = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (!user) {
    return defineAbilityForGuest(abilityBuilder);
  }

  if (user.role === "admin") {
    return defineAbilityForAdmin(abilityBuilder);
  }

  if (user.role === "user") return defineAbilityForUser(abilityBuilder);

  return defineAbilityForGuest(abilityBuilder);
}
