import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/">🏠 Home</Link>
      <Link to="/profile">👤 Profile</Link>
      <Link to="/login">🔐 Login</Link>
    </div>
  );
}

export default Sidebar;