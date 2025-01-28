import React from "react";
import { Layout, Menu, Badge } from "antd";
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import "./LayoutBanner.styles.scss";
import UserAvatar from "../avatar/UserAvatar";

const { Header } = Layout;
const { SubMenu } = Menu;

function LayoutBanner({ collapsed, handleOnCollapse }) {
  const getCollapseIcon = () => {
    if (collapsed) {
      return (
        <MenuUnfoldOutlined onClick={handleOnCollapse} className="trigger" />
      );
    }
    return <MenuFoldOutlined onClick={handleOnCollapse} className="trigger" />;
  };

  const handleSettingMenuClick = () => {};
  const handleLogout = () => {};

  return (
    <Header className="header" style={{ background: "#fff", padding: 0 }}>
      <div
        style={{
          float: "left",
          width: "100%",
          alignSelf: "center",
          display: "flex",
        }}
      >
        {window.innerWidth > 992 && getCollapseIcon()}
      </div>
      <Menu mode="horizontal" className="menu">
        <SubMenu
          title={
            <Badge dot>
              <BellOutlined />
            </Badge>
          }
        />
      </Menu>
      <Menu onClick={handleSettingMenuClick} mode="horizontal" className="menu">
        <SubMenu title={UserAvatar("Cemal")}>
          <Menu.Item key="setting:1">
            <span>
              <UserOutlined /> Profile
            </span>
          </Menu.Item>
          <Menu.Item key="setting:2">
            <span>
              <LogoutOutlined onClick={handleLogout} /> Logout
            </span>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  );
}

export default LayoutBanner;
