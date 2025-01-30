import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/admin/dashboard.pages";
import MainLayout from "./components/main-layout/MainLayout";
import AddMerchandiser from "./pages/admin/merchandisers/Add";
import ViewMerchandisers from "./pages/admin/merchandisers/List";
import ShowOutlets from "./pages/admin/outlets/List";
import AddOutlet from "./pages/admin/outlets/Add";
import ViewChannels from "./pages/admin/channels/List";
import AddChannel from "./pages/admin/channels/Add";
import Login from "./pages/admin/login/Login";

const router = createBrowserRouter([
  {
    path: "/auth/log-in",
    element: <Login />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "merchandisers",
        element: <ViewMerchandisers />,
      },
      {
        path: "add-merchandiser",
        element: <AddMerchandiser />,
      },
      {
        path: "outlets",
        element: <ShowOutlets />,
      },
      {
        path: "add-outlet",
        element: <AddOutlet />,
      },
      {
        path: "channels",
        element: <ViewChannels />,
      },
      {
        path: "add-channel",
        element: <AddChannel />,
      },
    ],
  },
]);

export default router;
