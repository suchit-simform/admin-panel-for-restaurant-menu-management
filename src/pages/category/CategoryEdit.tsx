import { Button, Card, Flex, Form } from "antd";
import { useParams } from "react-router-dom";
import Header from "../../components/organism/Header";
import CategoryForm from "./components/CategoryForm";

const CategoryEdit = () => {
  /**
   * TODO:
   * [] fetch category item details using params.categoryId
   * [] on form submit store data into localstorage
   */
  const params = useParams<{ categoryId?: string }>();

  return (
    <Flex vertical>
      <Card
        title={
          <Header
            headerType="edit"
            moduleName="category"
            moduleRouteKey="category"
            onAddClick={() => {
              console.log("Add button clicked");
            }}
            title="Category Feature"
          />
        }
      >
        <Flex gap={8} wrap style={{ paddingInline: 8, paddingBlock: 16 }}>
          <h2>Category ID: {params.categoryId}</h2>
          <Form
            name="category_add"
            scrollToFirstError
            variant="outlined"
            size="middle"
            layout="vertical"
            style={{ width: "100%" }}
          >
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

export default CategoryEdit;
