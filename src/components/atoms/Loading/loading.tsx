import { Spin } from "antd";
import "./loading.style.css";

const Loading = () => {
  return (
    <div className="loading">
      <Spin aria-label="Loading" />
    </div>
  );
};

export default Loading;
