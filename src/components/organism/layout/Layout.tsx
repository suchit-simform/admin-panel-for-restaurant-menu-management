import { Avatar, Flex, Menu } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonAtom from "src/components/atoms/button";
import { getUserName } from "src/lib/utils";
import { useAppDispatch, useAppSelector } from "src/store";
import { handleLogout } from "src/store/features/authSlice";
import styles from "./Layout.module.css";

import { Layout } from "antd";

const { Header, Content, Sider } = Layout;

const items = [
  {
    key: 1,
    label: (
      <Link to={"/"} className={styles.nav_link}>
        Dashboard
      </Link>
    ),
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
  },
];

type Props = { children: React.ReactNode; isViewOnly: boolean };
const BaseLayout: React.FC<Props> = ({ children, isViewOnly = true }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const logoutHandler = React.useCallback(() => {
    dispatch(handleLogout());
    navigate("/auth/login", { replace: true });
  }, [dispatch, navigate]);

  return (
    <Layout hasSider>
      <Sider breakpoint="lg" collapsedWidth="0" className={styles.sider} theme="light">
        <Flex align="center" justify="center" className={styles.sider_logo}>
          <img src="https://ik.imagekit.io/ashishkk22/simform_logo.svg?updatedAt=1697020836220" alt="simform_logo" />
        </Flex>
        <Menu mode="inline" theme="dark" items={items} className={styles.menu} defaultSelectedKeys={["1"]} />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <Flex align="center" justify="center">
            <img src="https://ik.imagekit.io/ashishkk22/simform_logo.svg?updatedAt=1697020836220" alt="simform_logo" />
          </Flex>

          {!isViewOnly && (
            <Flex gap={16} align="center" wrap>
              <Avatar style={{ verticalAlign: "middle" }} size="large" gap={4}>
                {getUserName(currentUser)}
              </Avatar>
              <ButtonAtom variant="link" onClick={logoutHandler}>
                Logout
              </ButtonAtom>
            </Flex>
          )}
        </Header>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
