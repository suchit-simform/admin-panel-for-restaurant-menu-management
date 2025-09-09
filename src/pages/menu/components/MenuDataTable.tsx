import type { TableColumnsType } from "antd";
import { Space, Table, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteButton from "src/components/molecules/deleteButton";
import EditButton from "src/components/molecules/editButton";
import { formatPrice } from "src/lib/format";
import { useAppDispatch } from "src/store";
import type { Category } from "src/store/category/category.type";
import type { Ingredient } from "src/store/ingredient/ingredient.type";
import { menuApi } from "src/store/menu/menu.api";
import { setMenus } from "src/store/menu/menu.slice";
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
    render: (text, { currencyOption }) => {
      return (
        <Text style={{ width: 100 }} ellipsis={{ tooltip: text }}>
          {formatPrice(text, currencyOption)}
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
    dataIndex: "ingredient",
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

  const { data: fetchedMenus, isLoading: isFetchingMenusPending } = menuApi.useGetMenuItemsQuery();
  const [handleDelete, { isLoading: isDeletingMenuPending }] = menuApi.useDeleteMenuItemMutation();

  const handleDeleteMenu = async (id: string) => {
    await handleDelete(id);
    dispatch(menuApi.util.resetApiState());
  };

  const [columns, setColumns] = useState<TableColumnsType<DataType>>(defaultColumns(handleDeleteMenu));

  // effect to add dynamic data values inside name filter
  useEffect(() => {
    if (!fetchedMenus) {
      return;
    }

    dispatch(setMenus(fetchedMenus));

    // Fetch data or perform side effects here
    setColumns((prev) => {
      if (!fetchedMenus.length) {
        return prev;
      }

      const nameFilter = fetchedMenus.map((item) => ({
        text: item.name,
        value: item.name,
      }));
      const nameColumn = prev.find((col) => col.key === "name");
      if (nameColumn) {
        return prev.map((col) => (col.key === "name" ? { ...col, filters: nameFilter } : col));
      }

      return prev;
    });
  }, [dispatch, fetchedMenus, isFetchingMenusPending]);

  return (
    <Table<DataType>
      columns={columns}
      dataSource={fetchedMenus}
      bordered
      rowKey="id"
      loading={isDeletingMenuPending || isFetchingMenusPending}
    />
  );
};

export default MenuDataTable;
