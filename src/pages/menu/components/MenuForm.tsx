import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Select, Switch, Upload } from "antd";
import type { UploadChangeParam, UploadFile } from "antd/es/upload";
import { Fragment } from "react/jsx-runtime";

const { TextArea } = Input;

const normFile = (e: UploadChangeParam | UploadFile[]) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList ? e.fileList : [];
};

const MenuForm = () => {
  return (
    <Fragment>
      <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input name!" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please input price!" }]}>
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Category" name="category">
        <Select mode="multiple" allowClear>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Ingredients" name="ingredients">
        <Select mode="multiple" allowClear>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Upload" name="upload" valuePropName="fileList" getValueFromEvent={normFile}>
        <Upload action="/upload.do" listType="picture-card">
          <button style={{ color: "inherit", cursor: "inherit", border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      </Form.Item>
      <Form.Item label="Available" valuePropName="checked" name="isAvailable">
        <Switch />
      </Form.Item>
    </Fragment>
  );
};

export default MenuForm;
