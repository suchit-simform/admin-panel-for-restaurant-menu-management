import { App, Button, Card, Flex, Form } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/store";
import { categoryApi } from "src/store/category/category.api";
import { updateCategoryItem } from "src/store/category/category.slice";
import type { Category } from "src/store/category/category.type";
import Header from "../../components/organism/Header";
import CategoryForm from "./components/CategoryForm";

const CategoryEdit = () => {
  const params = useParams<{ categoryId?: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector((state) => state.category.items);

  const { message } = App.useApp();
  const [form] = Form.useForm();

  const [editCategoryMutate, { isLoading }] = categoryApi.useUpdateCategoryItemMutation();

  const [currentCategory, setCurrentCategory] = useState<Category | undefined>();

  // to check if params.categoryId is valid
  useEffect(() => {
    if (!params.categoryId) {
      message.error("No category ID provided");
      navigate("/category");
      return;
    }
  }, [message, navigate, params.categoryId]);

  // find the category by id and set it to state and form
  useEffect(() => {
    if (categories && categories.length) {
      const foundCategory = categories.find((item) => item.id === params.categoryId);
      if (!foundCategory) {
        message.error("Category not found");
        navigate("/category");
        return;
      }
      setCurrentCategory(foundCategory);
      form.setFieldsValue({
        name: foundCategory.name,
      });
    }

    return () => {
      setCurrentCategory(undefined);
    };
  }, [dispatch, form, categories, message, navigate, params.categoryId]);

  const onFinishHandler = async (values: Omit<Category, "id">) => {
    try {
      if (!currentCategory) {
        message.error("Category not found");
        navigate("/category");
        return;
      }

      const categoryPayload = {
        ...currentCategory,
        ...values,
      };

      const response = await editCategoryMutate(categoryPayload);

      if (response.error) {
        message.error("Failed to update category");
        return;
      }
      if (!response.data) {
        message.error("No data returned from update category");
        return;
      }
      dispatch(updateCategoryItem(categoryPayload));
      form.resetFields();
      message.success("Category updated successfully");
      /**
       * Invalidate the cache for the category list
       * ref: https://stackoverflow.com/a/73541408
       */
      dispatch(categoryApi.util.resetApiState());
      navigate("/category");
    } catch (err) {
      console.error(err);
      message.error("Failed to update category");
    }
  };

  return (
    <Flex vertical>
      <Card
        title={<Header headerType="edit" moduleName="category" moduleRouteKey="category" title="Category Feature" />}
      >
        <Flex gap={8} wrap style={{ paddingInline: 8, paddingBlock: 16 }}>
          <h2>Category ID: {params.categoryId}</h2>
          <Form
            form={form}
            name="category_add"
            scrollToFirstError
            variant="outlined"
            size="middle"
            layout="vertical"
            onFinish={onFinishHandler}
            disabled={isLoading}
            style={{ width: "100%" }}
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

export default CategoryEdit;
