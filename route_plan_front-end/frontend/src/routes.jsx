import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/admin/dashboard.pages";
import MainLayout from "./components/main-layout/MainLayout";
import Login from "./pages/admin/login/Login";

// Merchandiser routes
import ViewMerchandisers from "./pages/admin/merchandisers/List";
import AddMerchandiser from "./pages/admin/merchandisers/Add";
import EditMerchandiser from "./pages/admin/merchandisers/Edit";
import ViewMerchandiserDetails from "./pages/admin/merchandisers/View";

// Outlet routes
import ShowOutlets from "./pages/admin/outlets/List";
import AddOutlet from "./pages/admin/outlets/Add";
import EditOutlet from "./pages/admin/outlets/Edit";
import ViewOutletDetails from "./pages/admin/outlets/View";

// Channel routes
import ViewChannels from "./pages/admin/channels/List";
import AddChannel from "./pages/admin/channels/Add";
import EditChannel from "./pages/admin/channels/Edit";
import ViewChannelDetails from "./pages/admin/channels/View";
import ViewRoutes from "./pages/admin/routes/List";
import AddRoute from "./pages/admin/routes/Add";
import EditRoute from "./pages/admin/routes/Edit";
import ViewRouteDetails from "./pages/admin/routes/View";

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
      // Merchandiser Routes
      {
        path: "merchandisers",
        children: [
          {
            index: true,
            element: <ViewMerchandisers />,
          },
          {
            path: "create",
            element: <AddMerchandiser />,
          },
          {
            path: ":id",
            children: [
              {
                path: "edit",
                element: <EditMerchandiser />,
              },
              {
                path: "view",
                element: <ViewMerchandiserDetails />,
              },
            ],
          },
        ],
      },
      // Outlet Routes
      {
        path: "outlets",
        children: [
          {
            index: true,
            element: <ShowOutlets />,
          },
          {
            path: "create",
            element: <AddOutlet />,
          },
          {
            path: ":id",
            children: [
              {
                path: "edit",
                element: <EditOutlet />,
              },
              {
                path: "view",
                element: <ViewOutletDetails />,
              },
            ],
          },
        ],
      },
      // Channel Routes
      {
        path: "channels",
        children: [
          {
            index: true,
            element: <ViewChannels />,
          },
          {
            path: "create",
            element: <AddChannel />,
          },
          {
            path: ":id",
            children: [
              {
                path: "edit",
                element: <EditChannel />,
              },
              {
                path: "view",
                element: <ViewChannelDetails />,
              },
            ],
          },
        ],
      },

      // Route Routes
      {
        path: "routes",
        children: [
          {
            index: true,
            element: <ViewRoutes />,
          },
          {
            path: "create",
            element: <AddRoute />,
          },
          {
            path: ":id",
            children: [
              {
                path: "edit",
                element: <EditRoute />,
              },
              {
                path: "view",
                element: <ViewRouteDetails />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
