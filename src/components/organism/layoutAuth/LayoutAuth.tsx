import { Flex } from "antd";
import { Outlet } from "react-router-dom";

const LayoutAuth = () => {
  return (
    <Flex align="center" justify="center" style={{ minHeight: "100vh", padding: "1rem" }}>
      <Outlet />
    </Flex>
  );
};

export default LayoutAuth;
