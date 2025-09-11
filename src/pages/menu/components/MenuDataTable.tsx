import type { TableColumnsType } from "antd";
import { App, Image, Space, Table, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteButton from "src/components/molecules/deleteButton";
import EditButton from "src/components/molecules/editButton";
import { currencyFormatter } from "src/components/molecules/InputNumberWithCurrency/util";
import useCategories from "src/pages/menu/hooks/useCategories";
import useIngredients from "src/pages/menu/hooks/useIngredients";
import useMenus from "src/pages/menu/hooks/useMenus";
import { addDynamicFiltersForColumnsByColumnKey } from "src/pages/menu/lib/helper";
import { useAppDispatch } from "src/store";
import type { Category } from "src/store/category/category.type";
import type { Ingredient } from "src/store/ingredient/ingredient.type";
import { menuApi } from "src/store/menu/menu.api";
import type { Menu } from "src/store/menu/menu.type";

const { Text } = Typography;

type DataType = Menu;

const defaultColumns = (handleDelete: (id: string) => void): TableColumnsType<DataType> => [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    render: (text) => <Link to={`/menu/${text}/edit`}>{text}</Link>,
  },
  // add single image thumbnail column
  {
    title: "Image",
    dataIndex: "images",
    key: "image",
    render: (imageValues) => {
      if (!imageValues?.length) return null;
      imageValues = Array.isArray(imageValues) ? imageValues : [imageValues];
      const image = imageValues[0];
      return (
        <Image src={image?.url} alt={image?.name ?? "Menu Item"} style={{ width: 100, height: 100, borderRadius: 4 }} />
      );
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    filters: [],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value as string),
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
    render: (price, { currency }) => {
      const parsedValue = currencyFormatter(currency)(price);
      return (
        <Text style={{ width: 100 }} ellipsis={{ tooltip: parsedValue }}>
          {parsedValue}
        </Text>
      );
    },
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Category",
    key: "category",
    dataIndex: "category",
    filters: [],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) =>
      record.category.some((categoryItem: Category) => categoryItem.name.includes(value as string)),
    render: (_, { category }) => (
      <>
        {category.map((categoryItem: Category) => {
          return (
            <Tag color="blue" key={categoryItem.id}>
              {categoryItem.name.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Ingredient",
    key: "ingredient",
    dataIndex: "ingredients",
    filters: [],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) =>
      record.ingredients.some((ingredientItem: Ingredient) => ingredientItem.name.includes(value as string)),
    render: (_, { ingredients }) => (
      <>
        {ingredients.map((ingredientItem: Ingredient) => {
          return (
            <Tag color="volcano" key={ingredientItem.id}>
              {ingredientItem.name.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Available",
    key: "isAvailable",
    dataIndex: "isAvailable",
    filters: [
      { text: "Available", value: true },
      { text: "Unavailable", value: false },
    ],
    onFilter: (value, record) => record.isAvailable === value,
    render: (isAvailable) => (
      <Tag color={isAvailable ? "green" : "red"}>{isAvailable ? "Available" : "Unavailable"}</Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    fixed: "right",
    render: (_, record) => (
      <Space size="middle">
        <EditButton routeTo={`/menu/${record.id}/edit`} />
        <DeleteButton onConfirm={() => handleDelete(record.id)} />
      </Space>
    ),
  },
];

const MenuDataTable = () => {
  const dispatch = useAppDispatch();
  const { message } = App.useApp();

  const { menus, isPendingMenus } = useMenus();
  const { categories, isPendingCategories } = useCategories();
  const { ingredients, isPendingIngredients } = useIngredients();
  const [handleDelete, { isLoading: isDeletingMenuPending }] = menuApi.useDeleteMenuItemMutation();

  const handleDeleteMenu = async (id: string) => {
    try {
      await handleDelete(id);
      message.success("Menu item deleted successfully");
      dispatch(menuApi.util.resetApiState());
    } catch (err) {
      console.error(`Error deleting menu item with ID ${id}:`, err);
      message.error("Something went wrong while deleting the menu item");
    }
  };

  const [columns, setColumns] = useState<TableColumnsType<DataType>>(defaultColumns(handleDeleteMenu));

  // effect to add dynamic data values inside name filter
  useEffect(() => {
    if (isPendingMenus || isPendingCategories || isPendingIngredients) {
      return;
    }

    // Fetch data or perform side effects here
    setColumns((prev) => {
      let currentColumns = prev;
      currentColumns = addDynamicFiltersForColumnsByColumnKey<DataType, Menu>(currentColumns, "name", menus);
      currentColumns = addDynamicFiltersForColumnsByColumnKey<DataType, Category>(
        currentColumns,
        "category",
        categories,
      );
      currentColumns = addDynamicFiltersForColumnsByColumnKey<DataType, Ingredient>(
        currentColumns,
        "ingredient",
        ingredients,
      );
      return currentColumns;
    });
  }, [dispatch, menus, isPendingMenus, categories, isPendingCategories, isPendingIngredients, ingredients]);

  return (
    <Table<DataType>
      columns={columns}
      dataSource={menus}
      bordered
      rowKey="id"
      loading={isDeletingMenuPending || isPendingMenus}
    />
  );
};

export default MenuDataTable;
