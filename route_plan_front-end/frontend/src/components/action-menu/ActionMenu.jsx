// Action Menu Component to make it generic and reusable across different CRUD operations while maintaining proper Intergrations

import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, message, Popconfirm, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./ActionMenu.scss";

const ActionMenu = ({
  selectedRow,
  entityType,
  onDelete,
  updateEntityPath,
  additionalActions = [],
}) => {
  const navigate = useNavigate();

  console.log("Selected Row ID:", selectedRow.id); // Check if ID exists
  console.log("Update Path:", updateEntityPath); // Should be "/merchandiser/edit"
  const { id } = selectedRow;

  const baseActions = [
    {
      key: "edit",
      icon: <EditOutlined />,
      text: "Edit",
      onClick: () => navigate(`${updateEntityPath}/${id}/edit`),
      visible: true,
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      text: "Delete",
      danger: true,
      visible: true,
    },
    ...additionalActions,
  ];

  const handleDelete = async () => {
    try {
      await onDelete(id).unwrap();
      message.success(`${entityType} deleted successfully!`);
    } catch (err) {
      message.error(`Failed to delete ${entityType}: ${err.message}`);
    }
  };

  const menuItems = baseActions
    .filter((action) => action.visible)
    .map((action) => {
      if (action.key === "delete") {
        return {
          key: action.key,
          label: (
            <Popconfirm
              title={`Delete ${entityType}?`}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <Space className={action.danger ? "danger-action" : ""}>
                {action.icon}
                {action.text}
              </Space>
            </Popconfirm>
          ),
          disabled: action.disabled,
        };
      }

      return {
        key: action.key,
        label: (
          <Space
            onClick={action.onClick}
            className={action.danger ? "danger-action" : ""}
          >
            {action.icon}
            {action.text}
          </Space>
        ),
        disabled: action.disabled,
      };
    });

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={["click"]}
      overlayClassName="action-menu"
    >
      <a className="action-menu-trigger" onClick={(e) => e.preventDefault()}>
        <Space>
          Actions
          <DownOutlined className="action-menu-chevron" />
        </Space>
      </a>
    </Dropdown>
  );
};

ActionMenu.propTypes = {
  selectedRow: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  entityType: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  updateEntityPath: PropTypes.string.isRequired,
  additionalActions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      icon: PropTypes.node,
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      visible: PropTypes.bool,
      danger: PropTypes.bool,
      disabled: PropTypes.bool,
    })
  ),
};

export default ActionMenu;
