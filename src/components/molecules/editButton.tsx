import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  buttonType?: "text" | "icon";
  routeTo: string;
};

const EditButton: React.FC<Props> = ({ buttonType = "icon", routeTo }) => {
  if (buttonType === "text") {
    return (
      <Link to={routeTo}>
        <Button type="link">Edit</Button>
      </Link>
    );
  }
  return (
    <Link to={routeTo}>
      <Button shape="circle" type="link" icon={<EditOutlined />} />
    </Link>
  );
};

export default EditButton;
