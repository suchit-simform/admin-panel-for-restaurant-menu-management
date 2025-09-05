import type { TableColumnsType } from "antd";
import { Space, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteButton from "src/components/molecules/deleteButton";
import EditButton from "src/components/molecules/editButton";
import { useAppDispatch } from "src/store";
import { ingredientApi } from "src/store/ingredient/ingredient.api";
import { setIngredients } from "src/store/ingredient/ingredient.slice";
import type { Ingredient } from "src/store/ingredient/ingredient.type";

type DataType = Ingredient;

const defaultColumns = (handleDelete: (id: string) => void): TableColumnsType<DataType> => [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    render: (text) => <Link to={`/ingredient/${text}/edit`}>{text}</Link>,
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
    title: "Action",
    key: "action",
    fixed: "right",
    render: (_, record) => (
      <Space size="middle">
        <EditButton routeTo={`/ingredient/${record.id}/edit`} />
        <DeleteButton onConfirm={() => handleDelete(record.id)} />
      </Space>
    ),
  },
];

const IngredientDataTable = () => {
  const dispatch = useAppDispatch();

  const { data: fetchedIngredients, isLoading: isFetchingIngredientsPending } =
    ingredientApi.useGetIngredientItemsQuery();
  const [handleDelete, { isLoading: isDeletingIngredientPending }] = ingredientApi.useDeleteIngredientItemMutation();

  const handleDeleteIngredient = async (id: string) => {
    await handleDelete(id);
    dispatch(ingredientApi.util.resetApiState());
  };

  const [columns, setColumns] = useState<TableColumnsType<DataType>>(defaultColumns(handleDeleteIngredient));

  // effect to add dynamic data values inside name filter if data is present
  useEffect(() => {
    if (!fetchedIngredients) {
      return;
    }
    dispatch(setIngredients(fetchedIngredients));
    // Fetch data or perform side effects here
    setColumns((prev) => {
      if (!fetchedIngredients.length) {
        return prev;
      }

      const nameFilter = fetchedIngredients.map((item) => ({
        text: item.name,
        value: item.name,
      }));
      const nameColumn = prev.find((col) => col.key === "name");
      if (nameColumn) {
        return prev.map((col) => (col.key === "name" ? { ...col, filters: nameFilter } : col));
      }

      return prev;
    });
  }, [dispatch, fetchedIngredients, isFetchingIngredientsPending]);

  return (
    <Table<DataType>
      columns={columns}
      dataSource={fetchedIngredients || []}
      bordered
      rowKey="id"
      loading={isFetchingIngredientsPending || isDeletingIngredientPending}
    />
  );
};

export default IngredientDataTable;
