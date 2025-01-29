import { Avatar as AntdAvatar } from "antd";
import "./UserAvatar.scss";

const colors = [
  "#ffa38a",
  "#a9a7e0",
  "#D686D4",
  "#96CE56",
  "#4A90E2",
  "#62b3d0",
  "#ef7676",
];

const getColor = (username) => {
  const name = username || "User"; // Handle undefined username
  const firstChar = name.charCodeAt(0) || 0;
  const secondChar = name.length > 1 ? name.charCodeAt(1) : 0;
  const thirdChar = name.length > 2 ? name.charCodeAt(2) : 0;

  return colors[(firstChar + secondChar + thirdChar) % 7];
};

const CustomAvatar = ({ user, size = "large", showInfo = false }) => {
  const username = user?.name || "User";
  const role = user?.role || "Admin";
  const initial = username.charAt(0).toUpperCase();

  return (
    <div className="avatar-container">
      <AntdAvatar
        style={{
          backgroundColor: getColor(username),
          verticalAlign: "middle",
        }}
        size={size}
      >
        {initial}
      </AntdAvatar>
      {showInfo && (
        <div className="user-info">
          <span className="user-name">{username}</span>
          <span className="user-role">{role}</span>
        </div>
      )}
    </div>
  );
};

export default CustomAvatar;
