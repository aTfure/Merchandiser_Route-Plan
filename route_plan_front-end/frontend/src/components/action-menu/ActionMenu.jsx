import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, message, Popconfirm } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteMerchandiserMutation } from "../../redux/slices/merchandiserSlice";

function useActionMenu({ selectedRow, updateEntityPath }) {
  const [deleteMerchandiser] = useDeleteMerchandiserMutation();
  const navigate = useNavigate();

  const action = [
    {
      key: "edit",
      icon: <EditOutlined />,
      text: "Update",
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      text: "Delete",
    },
  ];

  const handleMenuClick = ({ key }) => {
    if (key === "edit") {
      const updatePath = `/${updateEntityPath}/${selectedRow.id}`;
      navigate(updatePath);
    }
  };

  const handleSingleDelete = async () => {
    try {
      await deleteMerchandiser(selectedRow.id).unwrap();
      message.success("Merchandiser deleted!");
    } catch (err) {
      message.error("Deletion failed!");
    }
  };

  const actionMenu = (
    <Menu onClick={handleMenuClick}>
      {action.map((item) => {
        if (item.key === "delete") {
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              <Popconfirm
                title="Are you sure you want to delete?"
                placement="left"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={handleSingleDelete}
              >
                {item.text}
              </Popconfirm>
            </Menu.Item>
          );
        }
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.text}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const actionColumnView = (
    <span className="action-menu">
      <Dropdown overlay={actionMenu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Action <DownOutlined />
        </a>
      </Dropdown>
    </span>
  );

  return [actionColumnView];
}

export default useActionMenu;
