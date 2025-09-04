import { Button, Card, Flex, Form } from "antd";
import { useParams } from "react-router-dom";
import Header from "../../components/organism/Header";
import MenuForm from "./components/MenuForm";

const MenuEdit = () => {
  /**
   * TODO:
   * [] fetch menu item details using params.menuId
   * [] fetch category list and show in select
   * [] fetch ingredients list and show in select
   * [] on form submit send data to backend
   */
  const params = useParams<{ menuId?: string }>();

  return (
    <Flex vertical>
      <Card
        title={
          <Header
            headerType="edit"
            moduleName="menu"
            moduleRouteKey="menu"
            onAddClick={() => {
              console.log("Add button clicked");
            }}
            title="Menu Feature"
          />
        }
      >
        <Flex gap={8} wrap style={{ paddingInline: 8, paddingBlock: 16 }}>
          <h2>Menu Item ID: {params.menuId}</h2>
          <Form
            name="menu_add"
            scrollToFirstError
            variant="outlined"
            size="middle"
            layout="vertical"
            style={{ width: "100%" }}
          >
            <MenuForm />
            <Button type="primary" htmlType="submit" style={{ width: "fit-content" }}>
              Save Changes
            </Button>
          </Form>
        </Flex>
      </Card>
    </Flex>
  );
};

export default MenuEdit;
