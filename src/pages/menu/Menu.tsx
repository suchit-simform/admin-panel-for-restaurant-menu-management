import { Flex } from "antd";
import Header from "../../components/organism/Header";
import MenuDataTable from "./components/MenuDataTable";

const Menu = () => {
  return (
    <Flex vertical>
      <Header
        headerType="list"
        moduleName="menu"
        moduleRouteKey="menu"
        onAddClick={() => {
          console.log("Add button clicked");
        }}
        title="Menu Feature"
      />
      {/* here we need to add antd data table component with menu item list here */}
      <MenuDataTable />
    </Flex>
  );
};

export default Menu;
