import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import Button from "./Button";

function Nav() {
  const { auth, logout } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center py-3">
      <Link to="/dashboard">
        <h2 className="text-2xl font-bold text-blue-600">Running viz</h2>
      </Link>
      <div className="flex gap-4 items-center ">
        <Link
          className="text-blue-600 text-base"
          to={`/settings/${auth?.userId}`}
        >
          Settings
        </Link>
        <Button handler={() => logout()} text="Sign Out" />
      </div>
    </div>
  );
}

export default Nav;
