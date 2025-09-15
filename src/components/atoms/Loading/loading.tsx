import { Spin } from "antd";
import "./loading.style.css";

const Loading = () => {
  return (
    <div className="loading" aria-label="Loading">
      <Spin />
    </div>
  );
};

export default Loading;
