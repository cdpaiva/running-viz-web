import { createContext, useState } from "react";
import { Role } from "../types/Roles";

type AuthData = {
  email: string;
  password: string;
  roles: Role[];
  accessToken: string;
};

type AuthContext = {
  auth: AuthData | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
};

const AuthContext = createContext<AuthContext>({
  auth: { email: "", password: "", roles: [], accessToken: "" },
  setAuth: () => {},
});

type Props = { children: JSX.Element };

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState<AuthData>({
    email: "",
    password: "",
    roles: [],
    accessToken: "",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
