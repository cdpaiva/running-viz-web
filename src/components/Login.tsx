import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { config } from "../config";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { Role } from "../types/Roles";

const BASE_URL = config.baseURL;
const LOGIN_URL = "/auth/login";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  // if the user was redirected by the RequireAuth component, send them back to where they wanted
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(res.data));
      const accessToken = res.data.token;
      // TODO: Use roles in the future
      const roles: Role[] = ["user"];

      setAuth({ email, password, roles, accessToken });

      setEmail("");
      setPassword("");

      navigate(from, { replace: true });
    } catch (err: any) {
      if (err.response?.status === 400) {
        setErrMsg("Missing username of password");
      } else if (err.response?.status === 401) {
        setErrMsg("Authentication failed");
      } else {
        setErrMsg("Login failed, try again later");
      }
    }
  };

  return (
    <div className="container">
      <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}>
        {errMsg}
      </p>
      <h1>Sign in</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="username">Email:</label>
        <input
          ref={emailRef}
          type="email"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          required
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <button>Sign In</button>
      </form>
      <a href="#">Register</a>
    </div>
  );
}

export default Login;
