import { Button, Card, Flex, Form } from "antd";
import Header from "../../components/organism/Header";
import IngredientForm from "./components/IngredientForm";

const IngredientAdd = () => {
  /**
   * TODO: on form submit store data into localstorage
   */
  return (
    <Flex vertical>
      <Card
        title={
          <Header
            headerType="add"
            moduleName="ingredient"
            moduleRouteKey="ingredient"
            onAddClick={() => {
              console.log("Add button clicked");
            }}
            title="Ingredient Feature"
          />
        }
      >
        <Flex gap={16} wrap style={{ paddingInline: 8, paddingBlock: 16 }}>
          <Form name="ingredient_add" scrollToFirstError variant="outlined" layout="vertical" style={{ width: "100%" }}>
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

export default IngredientAdd;
