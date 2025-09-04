import { Flex } from "antd";
import { useParams } from "react-router-dom";
import Header from "../../components/organism/Header";

const MenuEdit = () => {
  const params = useParams<{ menuId?: string }>();

  return (
    <Flex vertical>
      <Header
        headerType="edit"
        moduleName="menu"
        moduleRouteKey="menu"
        onAddClick={() => {
          console.log("Add button clicked");
        }}
        title="Menu Feature"
      />
      <div>
        <ul>
          <li>Menu Item ID: {params.menuId}</li>
        </ul>
      </div>
    </Flex>
  );
};

export default MenuEdit;
