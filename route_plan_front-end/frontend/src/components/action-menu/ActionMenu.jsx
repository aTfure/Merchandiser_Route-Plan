import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  MailOutlined,
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
  onResendEmail,
}) => {
  const navigate = useNavigate();
  const { id } = selectedRow;

  // Base actions with consistent structure
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
  ];

  // Conditionally add email action if onResendEmail is provided
  const emailAction = onResendEmail
    ? [
        {
          key: "send-email",
          icon: <MailOutlined />,
          text: "Resend Notification",
          onClick: () => onResendEmail(selectedRow),
          visible: true,
        },
      ]
    : [];

  // Combine base actions with additional and email actions
  const combinedActions = [
    ...baseActions,
    ...emailAction,
    ...additionalActions,
  ];

  const handleDelete = async () => {
    try {
      await onDelete(id);
      message.success(`${entityType} deleted successfully!`);
    } catch (err) {
      message.error(`Failed to delete ${entityType}: ${err.message}`);
    }
  };

  const menuItems = combinedActions
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
  onResendEmail: PropTypes.func,
};

export default ActionMenu;
