import { Divider, Flex, Typography } from "antd";
import MenuDataTable from "./components/MenuDataTable";

const MenuAdd = () => {
  return (
    <Flex vertical>
      <Flex justify="space-between">
        <Typography.Title level={2}>Add Menu Item</Typography.Title>
      </Flex>
      <Divider />
      {/* here we need to add antd data table component with menu item list here */}
      <MenuDataTable />
    </Flex>
  );
};

export default MenuAdd;
