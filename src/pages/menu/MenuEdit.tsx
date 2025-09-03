import { Divider, Flex, Typography } from "antd";
import MenuDataTable from "./components/MenuDataTable";
import { useParams } from "react-router-dom";

const MenuEdit = () => {
  const params = useParams<{ menuId?: string }>();
  return (
    <Flex vertical>
      <Flex justify="space-between">
        <Typography.Title level={2}>Edit Menu Item id:{params?.menuId}</Typography.Title>
      </Flex>
      <Divider />
      {/* here we need to add antd data table component with menu item list here */}
      <MenuDataTable />
    </Flex>
  );
};

export default MenuEdit;
