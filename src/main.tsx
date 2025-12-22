import { ConfigProvider } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { AbilityProvider } from "src/lib/ability/ability.context.tsx";
import { store } from "src/store";
import theme from "src/theme/themeAntd";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <AbilityProvider>
          <App />
        </AbilityProvider>
      </ConfigProvider>
    </Provider>
  </StrictMode>,
);
