import { Line, type LineConfig } from "@ant-design/charts";
import type React from "react";

const data = [
  { year: "2015", sales: 3 },
  { year: "2016", sales: 4 },
  { year: "2017", sales: 3.5 },
  { year: "2018", sales: 5 },
  { year: "2019", sales: 4.9 },
  { year: "2020", sales: 6 },
  { year: "2021", sales: 7 },
  { year: "2022", sales: 9 },
  { year: "2023", sales: 13 },
];
const DemoLineChart: React.FC = () => {
  const config: LineConfig = {
    data,
    shapeField: "smooth",
    height: 400,
    xField: "year",
    yField: "sales",
    cartesian: { yAxis: { nice: true }, xAxis: { nice: true } },
    tooltip: { showCrosshairs: true, shared: true },
    point: { size: 5 },
    style: {
      lineWidth: 2,
    },
  };
  return <Line {...config} />;
};
export default DemoLineChart;
