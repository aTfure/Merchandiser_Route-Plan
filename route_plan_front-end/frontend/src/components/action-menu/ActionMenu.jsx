import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, Popconfirm } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function useActionMenu({ selectedRow, updateEntityPath }) {
  const navigate = useNavigate();

  const handleMenuClick = (action) => {
    if (action.key === "edit") {
      const updatePath = `/${updateEntityPath}/${selectedRow.id}`;
      navigate(updatePath);
    }
  };

  const handleSingleDelete = () => {
    console.log("handleSingleDelete, selected:", selectedRow);
  };

  const actionMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">
        <EditOutlined /> Update
      </Menu.Item>
      <Menu.Item key="delete">
        <Popconfirm
          title="Are you sure you want to delete?"
          placement="left"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          onConfirm={handleSingleDelete}
        >
          <span>
            <DeleteOutlined /> Delete
          </span>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const actionColumnView = (
    <span className="action-menu">
      <Dropdown overlay={actionMenu} trigger={["click"]}>
        <a className="ant-dropdown-link" href="#">
          Actions <DownOutlined />
        </a>
      </Dropdown>
    </span>
  );
  return [actionColumnView];
}

export default useActionMenu;
