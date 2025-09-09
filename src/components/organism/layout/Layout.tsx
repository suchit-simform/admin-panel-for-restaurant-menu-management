import { Avatar, Flex, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonAtom from "src/components/atoms/button";
import { getUserName } from "src/lib/utils";
import { useAppDispatch, useAppSelector } from "src/store";
import { handleLogout } from "src/store/features/authSlice";
import type { User } from "src/types/user";
import styles from "./Layout.module.css";

const { Header, Content, Sider } = Layout;

const items = [
  {
    key: 1,
    label: (
      <Link to={"/"} className={styles.nav_link}>
        Dashboard
      </Link>
    ),
    link: "/",
  },
  {
    key: 2,
    label: (
      <Link to={"/menu"} className={styles.nav_link}>
        Menu
      </Link>
    ),
    link: "/menu",
  },
  {
    key: 3,
    label: (
      <Link to={"/category"} className={styles.nav_link}>
        Category
      </Link>
    ),
    link: "/category",
  },
  {
    key: 4,
    label: (
      <Link to={"/ingredient"} className={styles.nav_link}>
        Ingredient
      </Link>
    ),
    link: "/ingredient",
  },
];

const mobileUserMenuItems = (currentUser?: User | null, logoutHandler?: React.MouseEventHandler<HTMLElement>) => [
  {
    key: 1,
    label: (
      <Flex gap={16} align="center" wrap>
        <Avatar style={{ verticalAlign: "middle" }} size="large" gap={4}>
          {getUserName(currentUser)}
        </Avatar>
        <ButtonAtom variant="link" onClick={logoutHandler}>
          Logout
        </ButtonAtom>
      </Flex>
    ),
  },
];

type Props = { children: React.ReactNode; isViewOnly: boolean };
const BaseLayout: React.FC<Props> = ({ children, isViewOnly = true }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const [selectedMenuKey, setSelectedMenuKey] = useState<Array<string>>(["0"]);

  // effect which would help to find the current selected menu item link
  useEffect(() => {
    setSelectedMenuKey([(items.findIndex((item) => item.link === location.pathname) + 1).toString()]);
  }, [location.pathname]);

  const logoutHandler = React.useCallback(() => {
    dispatch(handleLogout());
    navigate("/auth/login", { replace: true });
  }, [dispatch, navigate]);

  return (
    <Layout hasSider className={styles.layout}>
      <Sider breakpoint="lg" collapsedWidth="0" className={styles.sider} theme="light">
        <Flex align="center" justify="center" className={styles.sider_logo}>
          <img src="https://ik.imagekit.io/ashishkk22/simform_logo.svg?updatedAt=1697020836220" alt="simform_logo" />
        </Flex>
        <Menu mode="inline" theme="dark" items={items} className={styles.menu} selectedKeys={selectedMenuKey} />
        <Menu
          mode="inline"
          theme="dark"
          items={mobileUserMenuItems(currentUser, logoutHandler)}
          className={styles.mobileSubMenu}
        />
      </Sider>
      <Layout className={styles.layoutSub}>
        <Header className={styles.header}>
          <Flex align="center" justify="center">
            <img src="https://ik.imagekit.io/ashishkk22/simform_logo.svg?updatedAt=1697020836220" alt="simform_logo" />
          </Flex>

          {!isViewOnly && (
            <div className={styles.desktopUserMenu}>
              <Flex gap={16} align="center" wrap>
                <Avatar style={{ verticalAlign: "middle" }} size="large" gap={4}>
                  {getUserName(currentUser)}
                </Avatar>
                <ButtonAtom variant="link" onClick={logoutHandler}>
                  Logout
                </ButtonAtom>
              </Flex>
            </div>
          )}
        </Header>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
