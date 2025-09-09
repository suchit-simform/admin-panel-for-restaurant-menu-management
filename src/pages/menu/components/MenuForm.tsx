import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Select, Switch, Upload } from "antd";
import type { UploadChangeParam, UploadFile } from "antd/es/upload";
import { Fragment } from "react/jsx-runtime";
import InputNumberCurrency from "src/components/molecules/InputNumberWithCurrency";
import { useAppSelector } from "src/store";
import type { MenuPayload } from "src/store/menu/menu.type";

const { TextArea } = Input;

const normFile = (e: UploadChangeParam | UploadFile[]) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList ? e.fileList : [];
};

const MenuForm = () => {
  const categories = useAppSelector((state) => state.category.items);
  const ingredients = useAppSelector((state) => state.ingredient.items);

  return (
    <Fragment>
      <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input name!" }]}>
        <Input autoFocus />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea rows={4} />
      </Form.Item>

      <InputNumberCurrency<MenuPayload> />

      <Form.Item label="Category" name="category">
        <Select mode="multiple" allowClear optionFilterProp="name">
          {categories.map((category) => (
            <Select.Option key={category.id} value={category.id} name={category.name}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Ingredients" name="ingredients">
        <Select mode="multiple" allowClear optionFilterProp="name">
          {ingredients.map((ingredient) => (
            <Select.Option key={ingredient.id} value={ingredient.id} name={ingredient.name}>
              {ingredient.name}
            </Select.Option>
          ))}
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
