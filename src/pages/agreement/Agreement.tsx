import { Button, Card, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const { Paragraph } = Typography;
const { Meta } = Card;

const AgreementPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <Meta title="User Agreement" description="Please read below agreement before proceeding." />

      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          marginBlock: "16px",
          padding: "16px",
          marginBottom: "16px",
          background: "#fafafa",
        }}
      >
        <Typography>
          <Paragraph>Welcome to our application. By using our services, you agree to the following terms:</Paragraph>
          <Paragraph>1. You will not misuse our platform for unlawful activities.</Paragraph>
          <Paragraph>2. We may collect and use your data as described in our Privacy Policy.</Paragraph>
          <Paragraph>3. The service is provided “as is” without warranty of any kind.</Paragraph>
          <Paragraph>4. We reserve the right to update these terms at any time.</Paragraph>
        </Typography>
      </div>
      <Button
        type="primary"
        onClick={() =>
          navigate("/auth/register", {
            replace: true,
          })
        }
      >
        Go Back
      </Button>
    </Card>
  );
};

export default AgreementPage;
