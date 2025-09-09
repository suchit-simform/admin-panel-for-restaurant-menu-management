import { Col, Form, Grid, InputNumber, Row, Select } from "antd";
import {
  currencyFormatter,
  currencyOptions,
  currencyParser,
} from "src/components/molecules/InputNumberWithCurrency/util";

const { Option } = Select;
const { useBreakpoint } = Grid;

export const DEFAULT_CURRENCY = "AMERICAN SAMOA::USD"; // USD

/**
 * InputNumberWithCurrency Component
 * @ref: https://ant.design/~demos/input-number-demo-formatter
 */
const InputNumberWithCurrency = <T,>() => {
  const screens = useBreakpoint();
  const form = Form.useFormInstance<T>();
  const currencyWatch = Form.useWatch("currency", form);

  return (
    <Row gutter={16}>
      <Col span={screens?.xs ? 24 : 12}>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input price!" }]}
          style={{ minWidth: "100%" }}
        >
          <InputNumber
            defaultValue={0}
            formatter={currencyFormatter(currencyWatch)}
            parser={currencyParser}
            min={0}
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Col>
      <Col span={screens?.xs ? 24 : 12}>
        <Form.Item
          label="Currency"
          name="currency"
          rules={[{ required: true, message: "Please select currency!" }]}
          style={{ minWidth: "100%" }}
        >
          <Select showSearch>
            {currencyOptions.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default InputNumberWithCurrency;
