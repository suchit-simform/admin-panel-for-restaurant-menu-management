import type { AnyAbility } from "@casl/ability";
import { Can as CaslCan, type BoundCanProps, type CanProps } from "@casl/react";

import { createElement, type FC } from "react";
import type { AppAbility } from "src/lib/ability/ability";

import { useAbilityContext } from "src/lib/ability/ability.context";

type Props = BoundCanProps<AppAbility>;

const Can: FC<Props> = (props) => {
  const { ability } = useAbilityContext();
  return createElement(CaslCan, { ...props, ability: props.ability || ability } as CanProps<AnyAbility>);
};

export default Can;
