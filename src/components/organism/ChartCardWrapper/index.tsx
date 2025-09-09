import { Card } from "antd";
import React, { Suspense } from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

const ChartCardWrapper: React.FC<Props> = ({ title, children }) => {
  return (
    <Card title={title}>
      <Suspense fallback={<div>Loading chart...</div>}>{children}</Suspense>
    </Card>
  );
};

export default ChartCardWrapper;
