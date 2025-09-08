import { App, Button, Card, Flex, Form } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/store";
import { menuApi } from "src/store/menu/menu.api";
import { addMenuItem } from "src/store/menu/menu.slice";
import type { MenuPayload } from "src/store/menu/menu.type";
import Header from "../../components/organism/Header";
import MenuForm from "./components/MenuForm";
import useCategories from "./hooks/useCategories";
import useIngredients from "./hooks/useIngredients";

const MenuAdd = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const [addMenuMutate, { isLoading: isMenuMutating }] = menuApi.useAddMenuItemMutation();
  const { categories, isPendingCategories } = useCategories();
  const { ingredients, isPendingIngredients } = useIngredients();

  const isLoading = useMemo(
    () => isMenuMutating || isPendingCategories || isPendingIngredients,
    [isMenuMutating, isPendingCategories, isPendingIngredients],
  );

  const onFinishHandler = async (values: MenuPayload) => {
    try {
      const menuPayload = values;

      const categoriesValues = categories?.filter((category) => menuPayload.category.includes(category.id)) || [];
      const ingredientsValues =
        ingredients?.filter((ingredient) => menuPayload.ingredients.includes(ingredient.id)) || [];

      const response = await addMenuMutate({
        ...menuPayload,
        currencyOption: {
          locales: "en-US",
          style: "currency",
          currency: "USD",
        },
        category: categoriesValues,
        ingredients: ingredientsValues,
      });

      if (response.error) {
        message.error("Failed to add menu item");
        return;
      }
      if (!response.data) {
        message.error("No data returned from add menu item");
        return;
      }
      dispatch(addMenuItem(response.data));
      message.success("Menu item added successfully");
      dispatch(menuApi.util.resetApiState());
      navigate("/menu");
    } catch (err) {
      console.error(err);
      message.error("Failed to add menu item");
    }
  };

  return (
    <Flex vertical>
      <Card title={<Header headerType="add" moduleName="menu" moduleRouteKey="menu" title="Menu Feature" />}>
        <Flex gap={16} wrap style={{ paddingInline: 8, paddingBlock: 16 }}>
          <Form
            name="menu_add"
            scrollToFirstError
            variant="outlined"
            layout="vertical"
            style={{ width: "100%" }}
            onFinish={onFinishHandler}
            disabled={isLoading}
          >
            <MenuForm />
            <Button type="primary" htmlType="submit" style={{ width: "fit-content" }} loading={isLoading}>
              Save Changes
            </Button>
          </Form>
        </Flex>
      </Card>
    </Flex>
  );
};

export default MenuAdd;
