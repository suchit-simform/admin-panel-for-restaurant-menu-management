import { App as AntdApp } from "antd";
import { RouterProvider } from "react-router-dom";
import AbilityDevtoolComponent from "src/components/devtool/AbilityDevtool.component";
import router from "src/routes/router";
import { ThemeProvider } from "./context/themeContext";

function App() {
  return (
    <ThemeProvider>
      <AntdApp>
        <AbilityDevtoolComponent />
        <RouterProvider router={router} />
      </AntdApp>
    </ThemeProvider>
  );
}

export default App;
