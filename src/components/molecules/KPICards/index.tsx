import { Card, Typography } from "antd";

type Props = {
  title: string;
  value: string | number;
};

const { Title, Text } = Typography;

const KPICard: React.FC<Props> = ({ title, value }) => {
  return (
    <Card variant="outlined" style={{ textAlign: "center" }}>
      <Text type="secondary" strong>
        {title}
      </Text>
      <Title level={2}>{value}</Title>
    </Card>
  );
};

export default KPICard;
