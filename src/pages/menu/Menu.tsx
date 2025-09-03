import { PlusOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Button, Divider, Flex, Space, Table, Tag, Typography } from "antd";
import { Link } from "react-router-dom";

const { Text } = Typography;

interface DataType {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string[];
  ingredients: string[];
  isAvailable: boolean;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Category 1",
        value: "Category 1",
      },
      {
        text: "Category 2",
        value: "Category 2",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value as string),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text) => {
      return (
        <Text style={{ width: 200 }} ellipsis={{ tooltip: text }}>
          {text}
        </Text>
      );
    },
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text) => {
      return (
        <Text style={{ width: 100 }} ellipsis={{ tooltip: text }}>
          {Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(text)}
        </Text>
      );
    },
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Category",
    key: "category",
    dataIndex: "category",
    render: (_, { category }) => (
      <>
        {category.map((cat: string) => {
          // let color = category.length > 5 ? "geekblue" : "green";
          // if (category === "loser") {
          //   color = "volcano";
          // }
          return (
            <Tag color="blue" key={cat}>
              {cat.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Ingredient",
    key: "ingredient",
    dataIndex: "ingredient",
    render: (_, { ingredients }) => (
      <>
        {ingredients.map((ingredientItem: string) => {
          // let color = ingredient.length > 5 ? "geekblue" : "green";
          // if (ingredient === "loser") {
          //   color = "volcano";
          // }
          return (
            <Tag color="volcano" key={ingredientItem}>
              {ingredientItem.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    fixed: "right",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/menu/update/${record.id}`}>Update</Link>
        <Link to={`/menu/delete/${record.id}`}>Delete</Link>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce and mozzarella cheese",
    price: 299,
    category: ["Pizza", "Vegetarian"],
    isAvailable: true,
    ingredients: ["Tomato", "Mozzarella", "Basil"],
  },
  {
    id: "2",
    name: "Chicken Burger",
    description: "Grilled chicken patty with lettuce and mayo",
    price: 199,
    category: ["Burger", "Non-Vegetarian"],
    isAvailable: true,
    ingredients: ["Chicken", "Lettuce", "Mayo", "Bun"],
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with Caesar dressing",
    price: 149,
    category: ["Salad", "Vegetarian"],
    isAvailable: false,
    ingredients: ["Lettuce", "Croutons", "Parmesan", "Caesar Dressing"],
  },
];

const Menu = () => {
  return (
    <Flex vertical>
      <Flex justify="space-between">
        <Typography.Title level={2}>Menu Feature</Typography.Title>
        <Button type="primary" shape="round" size="large" icon={<PlusOutlined />} iconPosition="start">
          Add
        </Button>
      </Flex>
      <Divider />
      {/* here we need to add antd data table component with menu item list here */}
      <Table<DataType> columns={columns} dataSource={data} bordered />
    </Flex>
  );
};

export default Menu;
