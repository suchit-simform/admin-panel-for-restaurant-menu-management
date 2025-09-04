import { Avatar, Flex } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonAtom from "src/components/atoms/button";
import { getUserName } from "src/lib/utils";
import { useAppDispatch, useAppSelector } from "src/store";
import { handleLogout } from "src/store/features/authSlice";
import styles from "./Layout.module.css";

type Props = { children: React.ReactNode; isViewOnly: boolean };
const Layout: React.FC<Props> = ({ children, isViewOnly = true }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const logoutHandler = React.useCallback(() => {
    dispatch(handleLogout());
    navigate("/auth/login", { replace: true });
  }, [dispatch, navigate]);

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <div>
          <img src="https://ik.imagekit.io/ashishkk22/simform_logo.svg?updatedAt=1697020836220" alt="simform_logo" />
        </div>
        {!isViewOnly && (
          <div>
            <div>
              <ul className={styles.nav_ul}>
                <li>
                  <Link to={"/"} className={styles.nav_link}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to={"/menu"} className={styles.nav_link}>
                    Menu
                  </Link>
                </li>
                <li>
                  <Link to={"/category"} className={styles.nav_link}>
                    Category
                  </Link>
                </li>
                <li>
                  <Flex gap={16} align="center">
                    <Avatar style={{ verticalAlign: "middle" }} size="large" gap={4}>
                      {getUserName(currentUser)}
                    </Avatar>
                    <ButtonAtom variant="link" onClick={logoutHandler}>
                      Logout
                    </ButtonAtom>
                  </Flex>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
      <div className={styles.content}>{children}</div>
    </main>
  );
};

export default Layout;
