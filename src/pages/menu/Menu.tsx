import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Typography } from "antd";
import MenuDataTable from "./components/MenuDataTable";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <Flex vertical>
      <Flex justify="space-between">
        <Typography.Title level={2}>Menu Feature</Typography.Title>
        <Link to="/menu/add">
          <Button type="primary" shape="round" size="large" icon={<PlusOutlined />} iconPosition="start">
            Add
          </Button>
        </Link>
      </Flex>
      <Divider />
      {/* here we need to add antd data table component with menu item list here */}
      <MenuDataTable />
    </Flex>
  );
};

export default Menu;
