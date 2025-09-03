import { lazy } from "react";
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router-dom";
import Layout from "src/components/organism/layout/Layout";
import { SuspenseErrorBoundary } from "./SuspenseErrorBoundary";
import ProtectedRoutes from "./ProtectedRoutes";
import MenuAdd from "src/pages/menu/MenuAdd";
import MenuEdit from "src/pages/menu/MenuEdit";

//lazy imports
const Dashboard = lazy(() => import("../pages/index"));
const Menu = lazy(() => import("../pages/menu/Menu"));
const LayoutAuth = lazy(() => import("../components/organism/layoutAuth/LayoutAuth"));
const Login = lazy(() => import("../pages/login/Login"));
const Register = lazy(() => import("../pages/register/Register"));
const ForgotPassword = lazy(() => import("../pages/forgot-password/ForgotPassword"));
const Agreement = lazy(() => import("../pages/agreement/Agreement"));
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
        <Route path="/menu*" element={<Outlet />}>
          <Route
            index
            element={
              <SuspenseErrorBoundary>
                <ProtectedRoutes allowedRoles={["admin", "user"]}>
                  <Menu />
                </ProtectedRoutes>
              </SuspenseErrorBoundary>
            }
          />
          <Route
            path="add"
            element={
              <SuspenseErrorBoundary>
                <ProtectedRoutes allowedRoles={["admin", "user"]}>
                  <MenuAdd />
                </ProtectedRoutes>
              </SuspenseErrorBoundary>
            }
          />
          <Route
            path=":menuId/edit"
            element={
              <SuspenseErrorBoundary>
                <ProtectedRoutes allowedRoles={["admin", "user"]}>
                  <MenuEdit />
                </ProtectedRoutes>
              </SuspenseErrorBoundary>
            }
          />
        </Route>
      </Route>
      <Route
        path="agreement"
        element={
          <SuspenseErrorBoundary>
            <Layout isViewOnly={true}>
              <Agreement />
            </Layout>
          </SuspenseErrorBoundary>
        }
      />
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
