import { Button, Card, Flex, Form } from "antd";
import Header from "../../components/organism/Header";
import CategoryForm from "./components/CategoryForm";

const CategoryAdd = () => {
  /**
   * TODO: on form submit store data into localstorage
   */
  return (
    <Flex vertical>
      <Card
        title={
          <Header
            headerType="add"
            moduleName="category"
            moduleRouteKey="category"
            onAddClick={() => {
              console.log("Add button clicked");
            }}
            title="Category Feature"
          />
        }
      >
        <Flex gap={16} wrap style={{ paddingInline: 8, paddingBlock: 16 }}>
          <Form name="category_add" scrollToFirstError variant="outlined" layout="vertical" style={{ width: "100%" }}>
            <CategoryForm />
            <Button type="primary" htmlType="submit" style={{ width: "fit-content" }}>
              Save Changes
            </Button>
          </Form>
        </Flex>
      </Card>
    </Flex>
  );
};

export default CategoryAdd;
