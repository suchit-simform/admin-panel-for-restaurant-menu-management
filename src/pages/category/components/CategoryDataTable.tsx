import type { TableColumnsType } from "antd";
import { Space, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteButton from "src/components/molecules/deleteButton";
import EditButton from "src/components/molecules/editButton";
import { useAppDispatch } from "src/store";
import { categoryApi } from "src/store/category/category.api";
import { setCategories } from "src/store/category/category.slice";
import type { Category } from "src/store/category/category.type";

type DataType = Category;

const defaultColumns = (handleDelete: (id: string) => void): TableColumnsType<DataType> => [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    render: (text) => <Link to={`/category/${text}/edit`}>{text}</Link>,
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
        <EditButton routeTo={`/category/${record.id}/edit`} />
        <DeleteButton onConfirm={() => handleDelete(record.id)} />
      </Space>
    ),
  },
];

const CategoryDataTable = () => {
  const dispatch = useAppDispatch();

  const { data: fetchedCategories, isLoading: isFetchingCategoriesPending } = categoryApi.useGetCategoryItemsQuery();
  const [handleDelete, { isLoading: isDeletingCategoryPending }] = categoryApi.useDeleteCategoryItemMutation();

  const handleDeleteCategory = async (id: string) => {
    await handleDelete(id);
    dispatch(categoryApi.util.resetApiState());
  };

  const [columns, setColumns] = useState<TableColumnsType<DataType>>(defaultColumns(handleDeleteCategory));

  // effect to add dynamic data values inside name filter if data is present
  useEffect(() => {
    if (!fetchedCategories) {
      return;
    }
    dispatch(setCategories(fetchedCategories));
    // Fetch data or perform side effects here
    setColumns((prev) => {
      if (!fetchedCategories.length) {
        return prev;
      }

      const nameFilter = fetchedCategories.map((item) => ({
        text: item.name,
        value: item.name,
      }));
      const nameColumn = prev.find((col) => col.key === "name");
      if (nameColumn) {
        return prev.map((col) => (col.key === "name" ? { ...col, filters: nameFilter } : col));
      }

      return prev;
    });
  }, [dispatch, fetchedCategories, isFetchingCategoriesPending]);

  return (
    <Table<DataType>
      columns={columns}
      dataSource={fetchedCategories || []}
      bordered
      rowKey="id"
      loading={isDeletingCategoryPending || isFetchingCategoriesPending}
    />
  );
};

export default CategoryDataTable;
