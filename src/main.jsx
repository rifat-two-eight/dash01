import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
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
import SetPasswordRoute from "./Pages/SetPasswordRoute";
import PrivateRoute from "./Pages/PrivateRoute";


const router = createBrowserRouter([
  // Public routes
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <Forgot />,
  },
  // Private route for set-password (requires reset token from navigation state)
  {
    path: "/set-password",
    element: (
      <SetPasswordRoute>
        <SetPassword />
      </SetPasswordRoute>
    ),
  },
  // Private routes requiring authentication token
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Root />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "user", element: <User /> },
      { path: "subscription", element: <Subscription /> },
      { path: "user/:id", element: <UserDetails /> },
      { path: "terms", element: <Terms /> },
      { path: "feedback", element: <Feedback /> },
      { path: "advertising", element: <Advertising /> },
      { path: "notification", element: <Notification /> },
    ],
  },
  {
    path: "/name-change",
    element: (
      <PrivateRoute>
        <NameChange />
      </PrivateRoute>
    ),
  },
  {
    path: "/change-photo",
    element: (
      <PrivateRoute>
        <PhotoChange />
      </PrivateRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="inter">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);