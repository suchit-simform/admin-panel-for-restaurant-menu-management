import type { TableColumnsType } from "antd";
import { Space, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteButton from "src/components/molecules/deleteButton";
import EditButton from "src/components/molecules/editButton";
import type { Category } from "src/store/category/category.type";

type DataType = Category;

const defaultColumns: TableColumnsType<DataType> = [
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
        <DeleteButton />
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    id: "1",
    name: "Margherita Pizza",
  },
  {
    id: "2",
    name: "Chicken Burger",
  },
  {
    id: "3",
    name: "Caesar Salad",
  },
];

const CategoryDataTable = () => {
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
  }, []);

  return <Table<DataType> columns={columns} dataSource={data} bordered rowKey="id" />;
};

export default CategoryDataTable;
