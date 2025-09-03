import type { TableColumnsType } from "antd";
import { Space, Table, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteButton from "src/components/molecules/deleteButton";

const { Text } = Typography;

const defaultColumns: TableColumnsType<DataType> = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    render: (text) => <Link to={`/menu/${text}/edit`}>{text}</Link>,
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
        <DeleteButton />
      </Space>
    ),
  },
];
interface DataType {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string[];
  ingredients: string[];
  isAvailable: boolean;
}

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

const MenuDataTable = () => {
  const [columns, setColumns] = useState<TableColumnsType<DataType>>(defaultColumns);

  // effect to add dynamic data values inside name filter
  useEffect(() => {
    // Fetch data or perform side effects here
    setColumns((prev) => {
      if (!data.length) {
        return prev;
      }

      const nameFilter = data.map((item) => ({
        text: item.name,
        value: item.name,
      }));
      const nameColumn = prev.find((col) => col.key === "name");
      if (nameColumn) {
        return prev.map((col) => (col.key === "name" ? { ...col, filters: nameFilter } : col));
      }

      return prev;
    });

    return () => {
      setColumns(defaultColumns);
    };
  }, []);

  return <Table<DataType> columns={columns} dataSource={data} bordered />;
};

export default MenuDataTable;
