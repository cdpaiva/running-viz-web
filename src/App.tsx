import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import AddRun from "./components/AddRun";
import Run from "./components/ViewRun.tsx";
import { getAllRuns, getRun } from "./service/runService";
import { AuthProvider } from "./context/AuthProvider.tsx";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route
          path="/"
          loader={() => "load"}
          // loader={async () => await getAllRuns()}
          element={<Home />}
        />
        <Route path="/new-run" element={<AddRun />} />
        <Route
          path="/run/:id"
          loader={() => "load"}
          // loader={async ({ params }) => await getRun(params.id)}
          element={<Run />}
        />
      </Route>
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;
