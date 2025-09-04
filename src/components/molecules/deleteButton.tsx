import { DeleteOutlined } from "@ant-design/icons";
import { type PopconfirmProps, Button, Popconfirm } from "antd";
import React from "react";

type Props = Partial<Pick<PopconfirmProps, "title" | "description" | "onConfirm" | "onCancel">> &
  Omit<PopconfirmProps, "title" | "description" | "okText" | "cancelText" | "onConfirm" | "onCancel"> & {
    buttonType?: "text" | "icon";
  };

const DeleteButton: React.FC<Props> = ({
  title = "Delete the task",
  description = "Are you sure to delete this task?",
  onConfirm,
  onCancel,
  buttonType = "icon",
  ...restProps
}) => {
  return (
    <Popconfirm
      title={title}
      description={description}
      onConfirm={onConfirm}
      onCancel={onCancel}
      okText="Yes"
      cancelText="No"
      {...restProps}
    >
      {buttonType === "text" ? (
        <Button type="link">Delete</Button>
      ) : (
        <Button shape="circle" type="link" icon={<DeleteOutlined />} />
      )}
    </Popconfirm>
  );
};

export default DeleteButton;
