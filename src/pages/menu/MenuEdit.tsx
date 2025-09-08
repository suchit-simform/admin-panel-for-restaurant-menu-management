import { App, Button, Card, Flex, Form } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "src/store";
import { menuApi } from "src/store/menu/menu.api";
import { updateMenuItem } from "src/store/menu/menu.slice";
import type { Menu, MenuPayload } from "src/store/menu/menu.type";
import Header from "../../components/organism/Header";
import MenuForm from "./components/MenuForm";
import useCategories from "./hooks/useCategories";
import useIngredients from "./hooks/useIngredients";
import useMenus from "./hooks/useMenus";

const MenuEdit = () => {
  /**
   * TODO:
   * [] on form submit send data to backend
   */
  const params = useParams<{ menuId?: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { message } = App.useApp();
  const [form] = Form.useForm();

  const { menus, isPendingMenus } = useMenus();
  const { categories, isPendingCategories } = useCategories();
  const { ingredients, isPendingIngredients } = useIngredients();

  const [editMenuMutate, { isLoading: isMenuMutating }] = menuApi.useUpdateMenuItemMutation();

  const isLoading = useMemo(
    () => isMenuMutating || isPendingMenus || isPendingCategories || isPendingIngredients,
    [isMenuMutating, isPendingMenus, isPendingCategories, isPendingIngredients],
  );

  const [currentMenu, setCurrentMenu] = useState<Menu | undefined>();

  // to check if params.menuId is valid
  useEffect(() => {
    if (!params.menuId) {
      message.error("No menu ID provided");
      navigate("/menu");
      return;
    }
  }, [message, navigate, params.menuId]);

  // find the menu by id and set it to state and form
  useEffect(() => {
    if (isLoading) return;

    if (menus && menus.length) {
      const foundMenu = menus.find((item) => item.id === params.menuId);
      if (!foundMenu) {
        message.error("Menu not found");
        navigate("/menu");
        return;
      }
      setCurrentMenu(foundMenu);

      form.setFieldsValue({
        ...foundMenu,
        category: foundMenu.category.map((cat) => cat.id),
        ingredients: foundMenu.ingredients.map((ing) => ing.id),
      });
    }

    return () => {
      setCurrentMenu(undefined);
    };
  }, [
    dispatch,
    form,
    isLoading,
    isPendingCategories,
    isPendingIngredients,
    isPendingMenus,
    menus,
    message,
    navigate,
    params.menuId,
  ]);

  const onFinishHandler = async (values: MenuPayload) => {
    try {
      if (!currentMenu) {
        message.error("Menu not found");
        navigate("/menu");
        return;
      }

      const menuPayload = {
        ...currentMenu,
        ...values,
      };
      const categoriesValues = categories?.filter((category) => menuPayload.category.includes(category.id)) || [];
      const ingredientsValues =
        ingredients?.filter((ingredient) => menuPayload.ingredients.includes(ingredient.id)) || [];

      const response = await editMenuMutate({
        ...menuPayload,
        category: categoriesValues,
        ingredients: ingredientsValues,
        currencyOption: {
          locales: "en-US",
          style: "currency",
          currency: "USD",
        },
      });

      if (response.error) {
        message.error("Failed to update menu");
        return;
      }
      if (!response.data) {
        message.error("No data returned from update menu");
        return;
      }
      dispatch(
        updateMenuItem({
          ...menuPayload,
          category: categoriesValues,
          ingredients: ingredientsValues,
        }),
      );
      form.resetFields();
      message.success("Menu updated successfully");
      /**
       * Invalidate the cache for the menu list
       * ref: https://stackoverflow.com/a/73541408
       */
      dispatch(menuApi.util.resetApiState());
      navigate("/menu");
    } catch (err) {
      console.error(err);
      message.error("Failed to update menu");
    }
  };

  return (
    <Flex vertical>
      <Card title={<Header headerType="edit" moduleName="menu" moduleRouteKey="menu" title="Menu Feature" />}>
        <Flex gap={8} wrap style={{ paddingInline: 8, paddingBlock: 16 }}>
          <h2>Menu Item ID: {params.menuId}</h2>
          <Form
            form={form}
            name="menu_add"
            scrollToFirstError
            variant="outlined"
            size="middle"
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

export default MenuEdit;
