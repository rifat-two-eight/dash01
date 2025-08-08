import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./Layout/Root";
import Dashboard from "./Pages/Dashboard";
import User from "./Pages/User";
import Subscription from "./Pages/Subscription";
import UserDetails from "./Pages/UserDetails";
import ErrorPage from "./Pages/ErrorPage";
import Login from "./Pages/Login";
import Forgot from "./Pages/Forgot";
import SetPassword from "./Pages/SetPassword";
import NameChange from "./Pages/NameChange";
import PhotoChange from "./Pages/PhotoChange";
import Terms from "./Pages/Terms";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/user",
        Component: User,
      },
      {
        path: "/subscription",
        Component: Subscription,
      },
      {
        path: "/user/id",
        Component: UserDetails,
      },
      {
        path: "/terms",
        Component: Terms,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/forgot-password",
    Component: Forgot,
  },
  {
    path: "/set-password",
    Component: SetPassword,
  },
  {
    path: "/name-change",
    Component: NameChange,
  },
  {
    path: "/change-photo",
    Component: PhotoChange,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="inter">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
