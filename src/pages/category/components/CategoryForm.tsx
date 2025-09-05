import { Form, Input } from "antd";
import { Fragment } from "react/jsx-runtime";

const CategoryForm = () => {
  return (
    <Fragment>
      <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input name!" }]}>
        <Input />
      </Form.Item>
    </Fragment>
  );
};

export default CategoryForm;
