import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// Simply exposes AuthContext, since it's used in several places
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
