import React from "react";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
  UserAddOutlined,
  PlusOutlined,
  ShopOutlined,
  OrderedListOutlined,
  BranchesOutlined,
  HomeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import "./SideMenu.scss";

const { Sider } = Layout;

const menuItems = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "merchandisers",
    icon: <TeamOutlined />,
    label: "Merchandisers",
    children: [
      {
        key: "showMerchandisers",
        icon: <OrderedListOutlined />,
        label: "Show Merchandisers",
      },
      {
        key: "addMerchandiser",
        icon: <UserAddOutlined />,
        label: "Add Merchandiser",
      },
    ],
  },
  {
    key: "outlets",
    icon: <ShopOutlined />,
    label: "Outlets",
    children: [
      {
        key: "showOutlets",
        icon: <HomeOutlined />,
        label: "Show Outlets",
      },
      {
        key: "addOutlet",
        icon: <PlusOutlined />,
        label: "Add Outlet",
      },
    ],
  },
  {
    key: "channels",
    icon: <BranchesOutlined />,
    label: "Channels",
    children: [
      {
        key: "showChannels",
        icon: <OrderedListOutlined />,
        label: "Show Channels",
      },
      {
        key: "addChannel",
        icon: <PlusOutlined />,
        label: "Add Channel",
      },
    ],
  },
  {
    key: "routes",
    icon: <ReloadOutlined />,
    label: "Routes",
    children: [
      {
        key: "showRoutes",
        icon: <OrderedListOutlined />,
        label: "Show Routes",
      },
      {
        key: "addRoute",
        icon: <PlusOutlined />,
        label: "Add Route",
      },
    ],
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Settings",
  },
];

const SiderMenu = ({ handleOnCollapse, collapsed }) => {
  const theme = "light";
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = ({ key }) => {
    const routeMap = {
      dashboard: "/dashboard",
      showMerchandisers: "/merchandisers",
      addMerchandiser: "/merchandisers/create",
      showOutlets: "/outlets",
      addOutlet: "/outlets/create",
      showChannels: "/channels",
      addChannel: "/channels/create",
      showRoutes: "/routes",
      addRoute: "/routes/create",
      settings: "/settings",
    };

    if (routeMap[key]) {
      navigate(routeMap[key]);
    }
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={handleOnCollapse}
      theme={theme}
      width={240}
    >
      <Menu
        mode="inline"
        theme={theme}
        defaultSelectedKeys={["dashboard"]}
        onClick={handleMenuClick}
        items={menuItems}
      />
    </Sider>
  );
};

export default SiderMenu;
