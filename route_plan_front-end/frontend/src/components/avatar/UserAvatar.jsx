import { Avatar as AntdAvatar } from "antd";
import "./UserAvatar.scss";

const Avatar = ({ user }) => {
  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name.split(" ").map((n) => n[0].join("").toUpperCase());
  };

  return (
    <div className="avatar-container">
      <AntdAvatar
        src={user?.image}
        style={{ backgroundColor: "#1890ff" }}
        size="large"
      >
        {getInitials()}
      </AntdAvatar>
      <div className="user-info">
        <span className="user-name">{user?.name || "User"}</span>
        <span className="user-role">{user?.role || "Admin"}</span>
      </div>
    </div>
  );
};

export default Avatar;
