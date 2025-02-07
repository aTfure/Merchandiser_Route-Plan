import { MailOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";

const NotificationEmail = ({ route, merchandiser }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const handleCancel = () => setVisible(false);

  return (
    <>
      <Button
        type="primary"
        icon={<MailOutlined />}
        onClick={showModal}
        className="email-button"
      >
        Send Notification
      </Button>

      <Modal
        title="Route Management Notification"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="email-preview">
          <p>
            <strong>To:</strong> {merchandiser.email}
          </p>
          <p>
            <strong>Subject</strong>New Route Assignment: {route.name}
          </p>
          <div className="email-content">
            <p>Hello {merchandiser.full_name},</p>
            <p>You have been assigned to a new route</p>
            <ul>
              <li>
                <strong>Route Name:</strong> {route.name}
              </li>
              <li>
                <strong>Number of Outlets:</strong>
                {route.outlets_count}
              </li>
              <li>
                <strong>Assigned Date:</strong>{" "}
                {new Date().toLocaleDateString()}
              </li>
            </ul>
            <p>The ICS calender invite is attached to this email</p>
          </div>
        </div>
      </Modal>
    </>
  );
  return <div></div>;
};

export default NotificationEmail;
