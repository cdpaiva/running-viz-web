import { useState, ChangeEvent } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { register } from "../service/authService";

function Register() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register(name, email, password);
      console.log(JSON.stringify(res.data));
      const accessToken = res.data.token;
      const userId = res.data.user.userId;

      window.localStorage.setItem("token", accessToken);
      setAuth({ userId, accessToken });

      setEmail("");
      setPassword("");

      navigate("/");
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError("Missing username of password");
      } else {
        setError("Registration failed, try again later");
      }
    }
  };

  return (
    <div className="container max-w-xl mx-auto mt-4 shadow-md rounded p-6 text-center">
      <h1 className="text-2xl font-black text-blue-500 my-4">Running Viz</h1>
      <h2 className="text-xl font-black text-blue-400 my-4">
        CREATE NEW ACCOUNT
      </h2>
      <p className={error ? "error" : "offscreen"}>{error}</p>
      <form className="form" onSubmit={handleSubmit}>
        <label
          htmlFor="name"
          className="block text-left text-sm font-bold mb-2"
        >
          Name:
        </label>
        <input
          className="appearance-none border-2 border-white rounded w-full py-2 px-3 mb-2 focus:outline focus:outline-blue-500 bg-black text-white "
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          autoComplete="off"
          required
        ></input>
        <label
          htmlFor="username"
          className="block text-left text-sm font-bold mb-2"
        >
          Email:
        </label>
        <input
          className="appearance-none border-2 border-white rounded w-full py-2 px-3 mb-2 focus:outline focus:outline-blue-500 bg-black text-white "
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
          Register
        </button>
      </form>
      <a className="hover:underline hover:text-neon-green" href="/register">
        Already have an account? Sign in
      </a>
    </div>
  );
}

export default Register;
