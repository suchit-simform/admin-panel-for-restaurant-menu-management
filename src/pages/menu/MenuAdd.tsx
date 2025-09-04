import { Button, Card, Flex, Form } from "antd";
import Header from "../../components/organism/Header";
import MenuForm from "./components/MenuForm";

const MenuAdd = () => {
  /**
   * TODO:
   * [] fetch category list and show in select
   * [] fetch ingredients list and show in select
   * [] on form submit send data to backend
   */
  return (
    <Flex vertical>
      <Card
        title={
          <Header
            headerType="add"
            moduleName="menu"
            moduleRouteKey="menu"
            onAddClick={() => {
              console.log("Add button clicked");
            }}
            title="Menu Feature"
          />
        }
      >
        <Flex gap={16} wrap style={{ paddingInline: 8, paddingBlock: 16 }}>
          <Form name="menu_add" scrollToFirstError variant="outlined" layout="vertical" style={{ width: "100%" }}>
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

export default MenuAdd;
