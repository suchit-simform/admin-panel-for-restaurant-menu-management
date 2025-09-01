import { lazy } from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { SuspenseErrorBoundary } from "./SuspenseErrorBoundary";

//lazy imports
const Dashboard = lazy(() => import("../pages/index"));
const Menu = lazy(() => import("../pages/menu/Menu"));
const LayoutAuth = lazy(() => import("../components/organism/layoutAuth/LayoutAuth"));
const Login = lazy(() => import("../pages/login/Login"));
const Register = lazy(() => import("../pages/register/Register"));
const ForgotPassword = lazy(() => import("../pages/forgot-password/ForgotPassword"));
const PrivateRoutes = lazy(() => import("./PrivateRouter"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <SuspenseErrorBoundary>
            <PrivateRoutes />
          </SuspenseErrorBoundary>
        }
      >
        <Route
          index
          element={
            <SuspenseErrorBoundary>
              <Dashboard />
            </SuspenseErrorBoundary>
          }
        />
        <Route
          path="/menu"
          element={
            <SuspenseErrorBoundary>
              <Menu />
            </SuspenseErrorBoundary>
          }
        />
      </Route>
      <Route
        path="auth/*"
        element={
          <SuspenseErrorBoundary>
            <LayoutAuth />
          </SuspenseErrorBoundary>
        }
      >
        <Route
          index
          path="register"
          element={
            <SuspenseErrorBoundary>
              <Register />
            </SuspenseErrorBoundary>
          }
        />
        <Route
          path="login"
          element={
            <SuspenseErrorBoundary>
              <Login />
            </SuspenseErrorBoundary>
          }
        />
        <Route
          path="forgot-password"
          element={
            <SuspenseErrorBoundary>
              <ForgotPassword />
            </SuspenseErrorBoundary>
          }
        />
        <Route />
      </Route>
    </>,
  ),
);

export default router;
