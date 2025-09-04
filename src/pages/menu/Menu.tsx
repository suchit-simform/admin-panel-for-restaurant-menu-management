import { Card, Flex } from "antd";
import Header from "../../components/organism/Header";
import MenuDataTable from "./components/MenuDataTable";

const Menu = () => {
  return (
    <Flex vertical>
      <Card
        title={
          <Header
            headerType="list"
            moduleName="menu"
            moduleRouteKey="menu"
            onAddClick={() => {
              console.log("Add button clicked");
            }}
            title="Menu Feature"
          />
        }
      >
        <MenuDataTable />
      </Card>
    </Flex>
  );
};

export default Menu;
