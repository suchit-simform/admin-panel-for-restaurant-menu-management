import { Navigate, Outlet } from "react-router-dom";
import Layout from "src/components/organism/layout/Layout";
import { useAppSelector } from "src/store";

const PrivateRoutes = () => {
  const authenticated = useAppSelector((state) => state.auth.isAuth);

  /**
   * you can check if user is logged in or not
   * if you don't have user auth then hit GET request to server with token and get user logged in status
  *  const authenticated = useAppSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const [auth] = useAuthMutation();
  useEffect(() => {
    async function authOrNot() {
      try {
        await auth().unwrap();
        navigate("/");
      } catch (err) {}
    }

    if (!authenticated) {
      authOrNot();
    }
  }, [authenticated]);
  */

  //temp variable => change below variable to see login and sign up page
  // const authenticated = false;

  return authenticated ? (
    <Layout isGuest={false}>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default PrivateRoutes;
