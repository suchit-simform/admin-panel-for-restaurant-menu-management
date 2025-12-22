import { Button } from "antd";
import { useEffect } from "react";
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
    if (import.meta.env.DEV) {
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
    const currentUser: User = {
      id: "dev-user-id",
      role: "user",
      email: "user@example.com",
    };
    dispatch(
      handleLogin({
        authToken,
        currentUser,
      }),
    );
    setAbility(defineAbilityFor(currentUser));
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
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 1000,
        padding: "1rem",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Button onClick={handleUpdateOfAbility}>Update Ability</Button>
      <Button onClick={handleChangeToUserRole}>Change to user role</Button>
      <Button onClick={handleChangeToAdminRole}>Change to admin role</Button>
    </div>
  );
};

export default AbilityDevtoolComponent;
