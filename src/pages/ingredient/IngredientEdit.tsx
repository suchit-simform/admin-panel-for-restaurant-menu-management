import { App, Button, Card, Flex, Form } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/store";
import { ingredientApi } from "src/store/ingredient/ingredient.api";
import { updateIngredient } from "src/store/ingredient/ingredient.slice";
import type { Ingredient } from "src/store/ingredient/ingredient.type";
import Header from "../../components/organism/Header";
import IngredientForm from "./components/IngredientForm";

const IngredientEdit = () => {
  const params = useParams<{ ingredientId?: string }>();
  const ingredients = useAppSelector((state) => state.ingredient.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { message } = App.useApp();
  const [form] = Form.useForm();

  const [editIngredientMutate, { isLoading }] = ingredientApi.useUpdateIngredientItemMutation();

  const [currentIngredient, setCurrentIngredient] = useState<Ingredient | undefined>();

  // to check if params.ingredientId is valid
  useEffect(() => {
    if (!params.ingredientId) {
      message.error("No ingredient ID provided");
      navigate("/ingredient");
      return;
    }
  }, [message, navigate, params.ingredientId]);

  // find the ingredient by id and set it to state and form
  useEffect(() => {
    if (ingredients && ingredients.length) {
      const foundIngredient = ingredients.find((item) => item.id === params.ingredientId);
      if (!foundIngredient) {
        message.error("Ingredient not found");
        navigate("/ingredient");
        return;
      }
      setCurrentIngredient(foundIngredient);
      form.setFieldsValue({
        name: foundIngredient.name,
      });
    }

    return () => {
      setCurrentIngredient(undefined);
    };
  }, [dispatch, form, ingredients, message, navigate, params.ingredientId]);

  const onFinishHandler = async (values: Omit<Ingredient, "id">) => {
    try {
      if (!currentIngredient) {
        message.error("Ingredient not found");
        navigate("/ingredient");
        return;
      }

      const ingredientPayload = {
        ...currentIngredient,
        ...values,
      };

      const response = await editIngredientMutate(ingredientPayload);

      if (response.error) {
        message.error("Failed to update ingredient");
        return;
      }
      if (!response.data) {
        message.error("No data returned from update ingredient");
        return;
      }
      dispatch(updateIngredient(ingredientPayload));
      form.resetFields();
      message.success("Ingredient updated successfully");
      /**
       * Invalidate the cache for the ingredient list
       * ref: https://stackoverflow.com/a/73541408
       */
      dispatch(ingredientApi.util.resetApiState());
      navigate("/ingredient");
    } catch (err) {
      console.error(err);
      message.error("Failed to update ingredient");
    }
  };

  return (
    <Flex vertical>
      <Card
        title={
          <Header headerType="edit" moduleName="ingredient" moduleRouteKey="ingredient" title="Ingredient Feature" />
        }
      >
        <Flex gap={8} wrap style={{ paddingInline: 8, paddingBlock: 16 }}>
          <h2>Ingredient ID: {params.ingredientId}</h2>
          <Form
            form={form}
            name="ingredient_edit"
            scrollToFirstError
            variant="outlined"
            size="middle"
            layout="vertical"
            onFinish={onFinishHandler}
            disabled={isLoading}
            style={{ width: "100%" }}
            preserve={false}
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

export default IngredientEdit;
