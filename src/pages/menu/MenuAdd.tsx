import { App, Button, Card, Flex, Form } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploadPreviewModal, { useImageUploadPreviewModal } from "src/components/atoms/ImageUploadPreviewModal";
import { DEFAULT_CURRENCY } from "src/components/molecules/InputNumberWithCurrency";
import { processMenuFormPayload } from "src/pages/menu/lib/helper";
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
  const [form] = Form.useForm<MenuPayload>();

  const [addMenuMutate, { isLoading: isMenuMutating }] = menuApi.useAddMenuItemMutation();
  const { categories, isPendingCategories } = useCategories();
  const { ingredients, isPendingIngredients } = useIngredients();

  const { previewOpen, setPreviewOpen, previewImage, setPreviewImage, previewTitle, setPreviewTitle } =
    useImageUploadPreviewModal();

  const isLoading = useMemo(
    () => isMenuMutating || isPendingCategories || isPendingIngredients,
    [isMenuMutating, isPendingCategories, isPendingIngredients],
  );

  const onFinishHandler = async (menuPayload: MenuPayload) => {
    try {
      const processMenuUploaded = processMenuFormPayload({ menuPayload, categories, ingredients });

      const response = await addMenuMutate(processMenuUploaded);

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
      if (err instanceof Error) {
        message.error(err.message ?? "Failed to add menu item");
        return;
      }
      message.error("Failed to add menu item");
    }
  };

  return (
    <>
      <Flex vertical>
        <Card title={<Header headerType="add" moduleName="menu" moduleRouteKey="menu" title="Menu Feature" />}>
          <Flex gap={16} wrap style={{ paddingInline: 8, paddingBlock: 16 }}>
            <Form
              form={form}
              name="menu_add"
              scrollToFirstError
              variant="outlined"
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={onFinishHandler}
              disabled={isLoading}
              initialValues={{
                price: 0,
                currency: DEFAULT_CURRENCY,
              }}
            >
              <MenuForm
                handlePreviewCallback={({ previewImage, previewTitle, previewOpen }) => {
                  setPreviewImage(previewImage);
                  setPreviewTitle(previewTitle);
                  setPreviewOpen(previewOpen);
                }}
              />
              <Button type="primary" htmlType="submit" style={{ width: "fit-content" }} loading={isLoading}>
                Save Changes
              </Button>
            </Form>
          </Flex>
        </Card>
      </Flex>
      <ImageUploadPreviewModal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        src={previewImage}
      />
    </>
  );
};

export default MenuAdd;
