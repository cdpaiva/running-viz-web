import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

function Nav() {
  const { auth, logout } = useContext(AuthContext);

  return (
    <div className="nav">
      <Link to="/">
        <h2>Running viz</h2>
      </Link>
      <div className="nav-right">
        <Link to={`/settings/${auth?.userId}`}>Settings</Link>
        <button onClick={() => logout()}>Sign Out</button>
      </div>
    </div>
  );
}

export default Nav;
