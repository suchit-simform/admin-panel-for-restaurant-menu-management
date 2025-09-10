import type { TableColumnsType } from "antd";

export function addDynamicFiltersForColumnsByColumnKey<TTableType, TDataList extends { name: string }>(
  columns: TableColumnsType<TTableType>,
  columnKey: string,
  dataList?: TDataList[],
): TableColumnsType<TTableType> {
  if (!dataList?.length) return columns;
  const nameFilter = dataList.map((item) => ({
    text: item.name,
    value: item.name,
  }));
  const nameColumn = columns.find((col) => col.key === columnKey);
  if (!nameColumn) return columns;
  return columns.map((col) => (col.key === columnKey ? { ...col, filters: nameFilter } : col));
}
