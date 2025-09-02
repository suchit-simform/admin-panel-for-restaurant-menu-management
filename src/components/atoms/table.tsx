import { Table, type TableProps } from "antd";
import React from "react";

const TableAtom: React.FC<TableProps> = ({ ...props }) => {
  return <Table {...props} />;
};

export default TableAtom;
