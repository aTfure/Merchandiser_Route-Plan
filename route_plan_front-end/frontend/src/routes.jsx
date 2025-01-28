import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/admin/dashboard.pages";
import ProtectedLayout from "./ProtectedLayout";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <ProtectedLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
