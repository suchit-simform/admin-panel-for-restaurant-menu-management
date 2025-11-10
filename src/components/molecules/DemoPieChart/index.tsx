import { Pie, type PieConfig } from "@ant-design/plots";
import type React from "react";

const data = [
  { category: "Pizza", count: 20 },
  { category: "Pasta", count: 10 },
  { category: "Salad", count: 5 },
  { category: "Dessert", count: 15 },
  { category: "Drinks", count: 8 },
];

const DemoPieChart: React.FC = () => {
  const config: PieConfig = {
    data,
    angleField: "count",
    colorField: "category",
    radius: 0.9,
    height: 400,
    label: {
      text: "category",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };

  return <Pie {...config} />;
};

export default DemoPieChart;
