import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { defineAbilityFor, type AppAbility } from "src/lib/ability/ability";

type AbilityContextState = {
  ability: AppAbility;
  setAbility: Dispatch<SetStateAction<AppAbility>>;
};
const initialAbilityContextState: AbilityContextState = {
  ability: defineAbilityFor(null),
  setAbility: () => {},
};
const AbilityContext = createContext<AbilityContextState>(initialAbilityContextState);

export const AbilityProvider = ({
  children,
  ability: defaultAbility,
}: {
  children: ReactNode;
  ability?: AppAbility;
}) => {
  const [ability, setAbility] = useState(defaultAbility ?? initialAbilityContextState.ability);
  return <AbilityContext.Provider value={{ ability, setAbility }}>{children}</AbilityContext.Provider>;
};
export const useAbilityContext = () => {
  const context = useContext(AbilityContext);
  if (!context) {
    throw new Error("useAbilityContext must be used within an AbilityProvider");
  }
  return context;
};
