import { Pie, type PieConfig } from "@ant-design/charts";

const data = [
  { category: "Pizza", count: 20 },
  { category: "Pasta", count: 10 },
  { category: "Salad", count: 5 },
  { category: "Dessert", count: 15 },
  { category: "Drinks", count: 8 },
];
const DemoPieChart = () => {
  const config: PieConfig = {
    data,
    angleField: "count",
    colorField: "category",
    radius: 0.9,
    height: 400,
    label: {
      type: "inner",
      offset: "-30%",
      content: "{value}",
      style: { fontSize: 14, textAlign: "center" },
    },
    interactions: [{ type: "element-active" }],
    legend: {
      position: "bottom",
    },
  };

  return <Pie {...config} />;
};

export default DemoPieChart;
