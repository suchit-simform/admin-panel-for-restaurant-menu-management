import { Button } from "antd";
import { useEffect } from "react";
import styles from "./ability-devtool.module.css";
import { defineAbilityFor } from "src/lib/ability/ability";
import { useAbilityContext } from "src/lib/ability/ability.context";
import { useAppDispatch, useAppSelector } from "src/store";
import { handleLogin } from "src/store/features/authSlice";
import type { User } from "src/types/user";

const AbilityDevtoolComponent = () => {
  const { currentUser, authToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { setAbility } = useAbilityContext();

  // in dev mode add a logic which login user automatically for that ability was not present
  useEffect(() => {
    if (!import.meta.env.DEV) {
      return;
    }

    setAbility(defineAbilityFor(currentUser));

    return () => {
      setAbility(defineAbilityFor(null));
    };
  }, [currentUser, setAbility]);

  const handleUpdateOfAbility = () => {
    setAbility(defineAbilityFor(currentUser));
  };
  const handleChangeToUserRole = () => {
    const mockAdminForRole: User = {
      id: "dev-user-id",
      role: "user",
      email: "user@example.com",
    };
    dispatch(
      handleLogin({
        authToken,
        currentUser: mockAdminForRole,
      }),
    );
    setAbility(defineAbilityFor(mockAdminForRole));
  };
  const handleChangeToAdminRole = () => {
    const currentUser: User = {
      id: "dev-admin-id",
      role: "admin",
      email: "admin@example.com",
    };
    dispatch(
      handleLogin({
        authToken,
        currentUser,
      }),
    );
    setAbility(defineAbilityFor(currentUser));
  };

  if (!import.meta.env.DEV) {
    return null;
  }
  return (
    <div className={styles.container}>
      <Button onClick={handleUpdateOfAbility}>Update Ability</Button>
      <Button onClick={handleChangeToUserRole}>Change to user role</Button>
      <Button onClick={handleChangeToAdminRole}>Change to admin role</Button>
    </div>
  );
};

export default AbilityDevtoolComponent;
