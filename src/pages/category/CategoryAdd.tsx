import { App, Button, Card, Flex, Form } from "antd";
import Header from "../../components/organism/Header";
import CategoryForm from "./components/CategoryForm";
import { categoryApi } from "src/store/category/category.api";
import { useNavigate } from "react-router-dom";
import type { Category } from "src/store/category/category.type";
import { addCategory } from "src/store/category/category.slice";
import { useAppDispatch } from "src/store";

const CategoryAdd = () => {
  const dispatch = useAppDispatch();
  const [addCategoryMutate, { isLoading }] = categoryApi.useAddCategoryItemMutation();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const onFinishHandler = async (values: Omit<Category, "id">) => {
    try {
      const categoryPayload = values;
      const response = await addCategoryMutate({
        name: categoryPayload.name,
      });

      if (response.error) {
        message.error("Failed to add category");
        return;
      }
      if (!response.data) {
        message.error("No data returned from add category");
        return;
      }
      dispatch(addCategory(response.data));
      message.success("Category added successfully");
      dispatch(categoryApi.util.resetApiState());
      navigate("/category");
    } catch (err) {
      console.error(err);
      message.error("Failed to add category");
    }
  };

  return (
    <Flex vertical>
      <Card
        title={<Header headerType="add" moduleName="category" moduleRouteKey="category" title="Category Feature" />}
      >
        <Flex gap={16} wrap style={{ paddingInline: 8, paddingBlock: 16 }}>
          <Form
            name="category_add"
            scrollToFirstError
            variant="outlined"
            layout="vertical"
            style={{ width: "100%" }}
            onFinish={onFinishHandler}
            disabled={isLoading}
          >
            <CategoryForm />
            <Button type="primary" htmlType="submit" style={{ width: "fit-content" }} loading={isLoading}>
              Save Changes
            </Button>
          </Form>
        </Flex>
      </Card>
    </Flex>
  );
};

export default CategoryAdd;
