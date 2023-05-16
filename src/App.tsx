import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import { config } from "./config";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<RequireAuth allowedRoles={config.roles} />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;
