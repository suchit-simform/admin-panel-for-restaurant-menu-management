import { RouterProvider } from "react-router-dom";
import router from "src/routes/router";
import { ThemeProvider } from "./context/themeContext";
import { App as AntdApp } from "antd";

function App() {
  return (
    <ThemeProvider>
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
    </ThemeProvider>
  );
}

export default App;
