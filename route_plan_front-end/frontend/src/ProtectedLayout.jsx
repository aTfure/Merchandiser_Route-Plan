import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "./components/main-layout/MainLayout";

const ProtectedLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedLayout;
