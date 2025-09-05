import { Button, Card, Flex, Form } from "antd";
import { useParams } from "react-router-dom";
import Header from "../../components/organism/Header";
import IngredientForm from "./components/IngredientForm";

const IngredientEdit = () => {
  /**
   * TODO:
   * [] fetch ingredient item details using params.ingredientId
   * [] on form submit store data into localstorage
   */
  const params = useParams<{ ingredientId?: string }>();

  return (
    <Flex vertical>
      <Card
        title={
          <Header
            headerType="edit"
            moduleName="ingredient"
            moduleRouteKey="ingredient"
            onAddClick={() => {
              console.log("Add button clicked");
            }}
            title="Ingredient Feature"
          />
        }
      >
        <Flex gap={8} wrap style={{ paddingInline: 8, paddingBlock: 16 }}>
          <h2>Ingredient ID: {params.ingredientId}</h2>
          <Form
            name="ingredient_edit"
            scrollToFirstError
            variant="outlined"
            size="middle"
            layout="vertical"
            style={{ width: "100%" }}
          >
            <IngredientForm />
            <Button type="primary" htmlType="submit" style={{ width: "fit-content" }}>
              Save Changes
            </Button>
          </Form>
        </Flex>
      </Card>
    </Flex>
  );
};

export default IngredientEdit;
