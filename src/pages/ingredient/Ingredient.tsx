import { Card, Flex } from "antd";
import Header from "../../components/organism/Header";
import IngredientDataTable from "./components/IngredientDataTable";

const Ingredient = () => {
  return (
    <Flex vertical>
      <Card
        title={
          <Header
            headerType="list"
            moduleName="ingredient"
            moduleRouteKey="ingredient"
            onAddClick={() => {
              console.log("Add button clicked");
            }}
            title="Ingredient Feature"
          />
        }
      >
        <IngredientDataTable />
      </Card>
    </Flex>
  );
};

export default Ingredient;
