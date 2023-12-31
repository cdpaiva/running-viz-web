import { useState, ChangeEvent } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { login } from "../service/authService";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrMsg("");
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrMsg("");
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      const accessToken = res.data.token;
      const userId = res.data.user.userId;

      window.localStorage.setItem("token", accessToken);
      setAuth({ userId, accessToken });

      setEmail("");
      setPassword("");

      navigate("/dashboard");
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
    <div className="container max-w-xl mx-auto mt-4 shadow-md rounded p-6 text-center">
      <h1 className="text-2xl font-black text-blue-500 my-4">Running Viz</h1>
      <h2 className="text-xl font-black text-blue-400 my-4">LOGIN</h2>
      <p className={errMsg ? "errMsg" : "offscreen"}>{errMsg}</p>
      <form className="form" onSubmit={handleSubmit}>
        <label
          htmlFor="username"
          className="block text-left text-sm font-bold mb-2"
        >
          Email:
        </label>
        <input
          className="appearance-none border-2 border-white rounded w-full py-2 px-3 mb-2 focus:outline focus:outline-blue-500 bg-black text-white"
          type="email"
          id="username"
          value={email}
          onChange={handleEmailChange}
          autoComplete="off"
          required
        ></input>
        <label
          htmlFor="password"
          className="block text-left text-sm font-bold mb-2"
        >
          Password:
        </label>
        <input
          className="appearance-none border-2 border-white bg-black text-white   rounded w-full py-2 px-3 mb-2 focus:outline focus:outline-blue-500 "
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        ></input>
        <button className="rounded-lg border-white border-2 my-4 px-4 py-3 transition-colors hover:border-neon-green hover:text-neon-green focus:text-neon-green">
          Sign In
        </button>
      </form>
      <a className="hover:underline hover:text-neon-green" href="/register">
        Do not have an account yet? Register
      </a>
    </div>
  );
}

export default Login;
