import { Divider, Flex, Typography } from "antd";
import { useParams } from "react-router-dom";

const MenuEdit = () => {
  const params = useParams<{ menuId?: string }>();
  return (
    <Flex vertical>
      <Flex justify="space-between">
        <Typography.Title level={2}>Edit Menu Item id:{params?.menuId}</Typography.Title>
      </Flex>
      <Divider />
    </Flex>
  );
};

export default MenuEdit;
