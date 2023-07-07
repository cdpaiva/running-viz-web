import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./components/AuthOutlet.tsx";
import Home from "./components/Dashboard.tsx";
import { getAllRuns, getRun } from "./service/runService.ts";
import AddRun from "./components/AddRun.tsx";
import Missing from "./components/Missing.tsx";
import Login from "./components/Login.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import ViewRun from "./components/ViewRun.tsx";
import EditRun from "./components/EditRun.tsx";
import Settings from "./components/Settings.tsx";
import { getProfile } from "./service/polarService.ts";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import Register from "./components/Register.tsx";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/",
        element: <RequireAuth />,
        children: [
          {
            path: "/dashboard",
            loader: async () => await getAllRuns(),
            element: <Home />,
          },
          {
            path: "/settings/:id",
            loader: async ({ params }) => await getProfile(params.id),
            element: <Settings />,
          },
          {
            path: "/runs/:id",
            loader: async ({ params }) => await getRun(params.id),
            element: <ViewRun />,
          },
          {
            path: "/edit-run/:id",
            loader: async ({ params }) => await getRun(params.id),
            element: <EditRun />,
          },
          {
            path: "/new-run",
            element: <AddRun />,
          },
          {
            path: "*",
            element: <Missing />,
          },
        ],
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
