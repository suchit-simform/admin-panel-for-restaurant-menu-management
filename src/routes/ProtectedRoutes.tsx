import React, { type PropsWithChildren } from "react";
import { useAppSelector } from "src/store";
import type { User } from "src/types/user";

type Props = {
  allowedRoles?: User["role"][];
} & PropsWithChildren;

const ProtectedRoutes: React.FC<Props> = ({ allowedRoles, children }) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  if (!currentUser || !allowedRoles?.includes(currentUser.role)) {
    return <div>Permission Denied</div>;
  }

  return children;
};

export default ProtectedRoutes;
