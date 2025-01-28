import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  FundProjectionScreenOutlined,
  PartitionOutlined,
  SettingOutlined,
  TeamOutlined,
  UserAddOutlined,
  PlusOutlined,
  ShopOutlined,
  ShareAltOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import "./SideMenu.scss";

const { SubMenu } = Menu;
const { Sider } = Layout;

const SiderMenu = ({ handleOnCollapse, collapsed }) => {
  const theme = "light";
  const history = useNavigate();

  const handleSiderMenuClick = (action) => {
    const routes = {
      dashboard: "/",
      showMerchandisers: "/merchandisers",
      addMerchandiser: "/add-merchandiser",
      showOutlets: "/outlets",
      addOutlet: "/add-outlet",
    };
    history.push(routes[action.key] || "/");
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
        onClick={handleSiderMenuClick}
      >
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          Dashboard
        </Menu.Item>

        <SubMenu
          key="merchandisers"
          icon={<TeamOutlined />}
          title="Merchandisers"
        >
          <Menu.Item key="showMerchandisers" icon={<OrderedListOutlined />}>
            Show Merchandisers
          </Menu.Item>
          <Menu.Item key="addMerchandiser" icon={<UserAddOutlined />}>
            Add Merchandiser
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="outlets"
          icon={<FundProjectionScreenOutlined />}
          title="Outlets"
        >
          <Menu.Item key="showOutlets" icon={<ShopOutlined />}>
            Show Outlets
          </Menu.Item>
          <Menu.Item key="addOutlet" icon={<PlusOutlined />}>
            Add Outlet
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="channels" icon={<ShareAltOutlined />}>
          Channels
        </Menu.Item>

        <Menu.Item key="settings" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SiderMenu;
