import { Divider, Flex, Typography } from "antd";

const MenuAdd = () => {
  return (
    <Flex vertical>
      <Flex justify="space-between">
        <Typography.Title level={2}>Add Menu Item</Typography.Title>
      </Flex>
      <Divider />
    </Flex>
  );
};

export default MenuAdd;
