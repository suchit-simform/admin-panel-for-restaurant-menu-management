import { Card, Flex } from "antd";
import Header from "../../components/organism/Header";
import CategoryDataTable from "./components/CategoryDataTable";

const Category = () => {
  return (
    <Flex vertical>
      <Card
        title={
          <Header
            headerType="list"
            moduleName="category"
            moduleRouteKey="category"
            onAddClick={() => {
              console.log("Add button clicked");
            }}
            title="Category Feature"
          />
        }
      >
        <CategoryDataTable />
      </Card>
    </Flex>
  );
};

export default Category;
