import { type PopconfirmProps, Button, Popconfirm } from "antd";
import React from "react";

type Props = Partial<Pick<PopconfirmProps, "title" | "description" | "onConfirm" | "onCancel">> &
  Omit<PopconfirmProps, "title" | "description" | "okText" | "cancelText" | "onConfirm" | "onCancel">;

const DeleteButton: React.FC<Props> = ({
  title = "Delete the task",
  description = "Are you sure to delete this task?",
  onConfirm,
  onCancel,
  ...restProps
}) => {
  return (
    <Popconfirm
      title={title}
      description={description}
      {...(onConfirm ? { onConfirm } : {})}
      {...(onCancel ? { onCancel } : {})}
      okText="Yes"
      cancelText="No"
      {...restProps}
    >
      <Button danger>Delete</Button>
    </Popconfirm>
  );
};

export default DeleteButton;
