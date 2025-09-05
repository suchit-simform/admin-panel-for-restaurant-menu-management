import { App, Button, Card, Flex, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/store";
import { ingredientApi } from "src/store/ingredient/ingredient.api";
import { addIngredient } from "src/store/ingredient/ingredient.slice";
import type { Ingredient } from "src/store/ingredient/ingredient.type";
import Header from "../../components/organism/Header";
import IngredientForm from "./components/IngredientForm";

const IngredientAdd = () => {
  const dispatch = useAppDispatch();
  const [addIngredientMutate, { isLoading }] = ingredientApi.useAddIngredientItemMutation();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const onFinishHandler = async (values: Omit<Ingredient, "id">) => {
    try {
      const ingredientPayload = values;
      const response = await addIngredientMutate({
        name: ingredientPayload.name,
      });

      if (response.error) {
        message.error("Failed to add ingredient");
        return;
      }
      if (!response.data) {
        message.error("No data returned from add ingredient");
        return;
      }
      dispatch(addIngredient(response.data));
      message.success("Ingredient added successfully");
      dispatch(ingredientApi.util.resetApiState());
      navigate("/ingredient");
    } catch (err) {
      console.error(err);
      message.error("Failed to add ingredient");
    }
  };

  return (
    <Flex vertical>
      <Card
        title={
          <Header headerType="add" moduleName="ingredient" moduleRouteKey="ingredient" title="Ingredient Feature" />
        }
      >
        <Flex gap={16} wrap style={{ paddingInline: 8, paddingBlock: 16 }}>
          <Form
            name="ingredient_add"
            scrollToFirstError
            variant="outlined"
            layout="vertical"
            style={{ width: "100%" }}
            onFinish={onFinishHandler}
            disabled={isLoading}
          >
            <IngredientForm />
            <Button type="primary" htmlType="submit" style={{ width: "fit-content" }} loading={isLoading}>
              Save Changes
            </Button>
          </Form>
        </Flex>
      </Card>
    </Flex>
  );
};

export default IngredientAdd;
