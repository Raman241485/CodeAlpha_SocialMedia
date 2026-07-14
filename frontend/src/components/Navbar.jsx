import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <nav className="navbar">

      <h2>CodeAlpha Social</h2>

      <div>

        <Link to="/">Home</Link>

        {" | "}

        <Link to="/profile">Profile</Link>

        {" | "}

        <button onClick={logout}>
          Logout
        </button>

      </div>

    </nav>

  );

}

export default Navbar;