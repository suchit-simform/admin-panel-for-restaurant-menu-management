import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import ButtonAtom from "src/components/atoms/button";
import { handleLogout } from "src/store/features/authSlice";
import { useAppDispatch } from "src/store";

type Props = { children: React.ReactNode; isViewOnly: boolean };
const Layout: React.FC<Props> = ({ children, isViewOnly = true }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
                  <ButtonAtom variant="link" onClick={logoutHandler}>
                    Logout
                  </ButtonAtom>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
      {children}
    </main>
  );
};

export default Layout;
