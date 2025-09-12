import { Form, Input, Select, Switch } from "antd";
import { Fragment } from "react/jsx-runtime";
import ImageUploadFormItem from "src/components/atoms/ImageUpload";
import InputNumberCurrency from "src/components/molecules/InputNumberWithCurrency";
import { useAppSelector } from "src/store";
import type { MenuPayload } from "src/store/menu/menu.type";

const { TextArea } = Input;

type Props = {
  isEdit?: boolean;
  handlePreviewCallback: (args: { previewImage: string; previewTitle: string; previewOpen: boolean }) => void;
};

const MenuForm: React.FC<Props> = ({ handlePreviewCallback, isEdit }) => {
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
      <ImageUploadFormItem handlePreviewCallback={handlePreviewCallback} isEdit={isEdit} />
      <Form.Item label="Available" valuePropName="checked" name="isAvailable">
        <Switch />
      </Form.Item>
    </Fragment>
  );
};

export default MenuForm;
