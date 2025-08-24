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
import Feedback from "./Pages/Feedback";
import Advertising from "./Pages/Advertising";
import Notification from "./Pages/Notification";
import { Navigate } from "react-router";
const router = createBrowserRouter([
  // redirect "/" to "/login"
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/dashboard",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Dashboard },
      { path: "/dashboard/user", Component: User },
      { path: "/dashboard/subscription", Component: Subscription },
      { path: "/dashboard/user/:id", Component: UserDetails },
      { path: "/dashboard/terms", Component: Terms },
      { path: "/dashboard/feedback", Component: Feedback },
      { path: "/dashboard/advertising", Component: Advertising },
      { path: "/dashboard/notification", Component: Notification },
    ],
  },
  { path: "/login", Component: Login },
  { path: "/forgot-password", Component: Forgot },
  { path: "/set-password", Component: SetPassword },
  { path: "/name-change", Component: NameChange },
  { path: "/change-photo", Component: PhotoChange },
]);



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="inter">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
