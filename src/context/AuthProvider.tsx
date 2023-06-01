import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthData = {
  userId: string;
  accessToken: string;
};

type AuthContext = {
  auth: AuthData | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
  logout: Function;
};

const AuthContext = createContext<AuthContext>({
  auth: { userId: "", accessToken: "" },
  setAuth: () => {},
  logout: () => {},
});

type Props = { children: JSX.Element };

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token") || "";
  let userId = "";
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    userId = payload?.userId;
  }
  const [auth, setAuth] = useState<AuthData>({
    userId: userId,
    accessToken: token,
  });

  const logout = () => {
    window.localStorage.removeItem("token");

    setAuth({
      userId: "",
      accessToken: "",
    });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
