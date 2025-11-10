import { lazy } from "react";
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router-dom";
import BaseLayout from "src/components/organism/layout/Layout";
import { SuspenseErrorBoundary } from "./SuspenseErrorBoundary";
import ProtectedRoutes from "./ProtectedRoutes";

//lazy imports
const PrivateRoutes = lazy(() => import("./PrivateRouter"));
const FullPageLayout = lazy(() => import("../components/organism/full-page.layout"));
const Agreement = lazy(() => import("../pages/agreement/Agreement"));

const Login = lazy(() => import("../pages/login/Login"));
const Register = lazy(() => import("../pages/register/Register"));
const ForgotPassword = lazy(() => import("../pages/forgot-password/ForgotPassword"));

const Dashboard = lazy(() => import("../pages/dashboard/index"));

const Menu = lazy(() => import("../pages/menu/Menu"));
const MenuAdd = lazy(() => import("../pages/menu/MenuAdd"));
const MenuEdit = lazy(() => import("../pages/menu/MenuEdit"));

const Category = lazy(() => import("../pages/category/Category"));
const CategoryAdd = lazy(() => import("../pages/category/CategoryAdd"));
const CategoryEdit = lazy(() => import("../pages/category/CategoryEdit"));

const Ingredient = lazy(() => import("../pages/ingredient/Ingredient"));
const IngredientAdd = lazy(() => import("../pages/ingredient/IngredientAdd"));
const IngredientEdit = lazy(() => import("../pages/ingredient/IngredientEdit"));

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
        <Route path="menu/*" element={<Outlet />}>
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
                <ProtectedRoutes allowedRoles={["admin"]}>
                  <MenuEdit />
                </ProtectedRoutes>
              </SuspenseErrorBoundary>
            }
          />
        </Route>
        <Route path="category/*" element={<Outlet />}>
          <Route
            index
            element={
              <SuspenseErrorBoundary>
                <ProtectedRoutes allowedRoles={["admin", "user"]}>
                  <Category />
                </ProtectedRoutes>
              </SuspenseErrorBoundary>
            }
          />
          <Route
            path="add"
            element={
              <SuspenseErrorBoundary>
                <ProtectedRoutes allowedRoles={["admin", "user"]}>
                  <CategoryAdd />
                </ProtectedRoutes>
              </SuspenseErrorBoundary>
            }
          />
          <Route
            path=":categoryId/edit"
            element={
              <SuspenseErrorBoundary>
                <ProtectedRoutes allowedRoles={["admin"]}>
                  <CategoryEdit />
                </ProtectedRoutes>
              </SuspenseErrorBoundary>
            }
          />
        </Route>
        <Route path="ingredient/*" element={<Outlet />}>
          <Route
            index
            element={
              <SuspenseErrorBoundary>
                <ProtectedRoutes allowedRoles={["admin", "user"]}>
                  <Ingredient />
                </ProtectedRoutes>
              </SuspenseErrorBoundary>
            }
          />
          <Route
            path="add"
            element={
              <SuspenseErrorBoundary>
                <ProtectedRoutes allowedRoles={["admin", "user"]}>
                  <IngredientAdd />
                </ProtectedRoutes>
              </SuspenseErrorBoundary>
            }
          />
          <Route
            path=":ingredientId/edit"
            element={
              <SuspenseErrorBoundary>
                <ProtectedRoutes allowedRoles={["admin"]}>
                  <IngredientEdit />
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
            <BaseLayout isViewOnly={true}>
              <Agreement />
            </BaseLayout>
          </SuspenseErrorBoundary>
        }
      />
      <Route
        path="auth/*"
        element={
          <SuspenseErrorBoundary>
            <FullPageLayout />
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
