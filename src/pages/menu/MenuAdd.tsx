import { Flex } from "antd";
import Header from "../../components/organism/Header";

const MenuAdd = () => {
  return (
    <Flex vertical>
      <Header
        headerType="add"
        moduleName="menu"
        moduleRouteKey="menu"
        onAddClick={() => {
          console.log("Add button clicked");
        }}
        title="Menu Feature"
      />
    </Flex>
  );
};

export default MenuAdd;
