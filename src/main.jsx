import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from './Layout/Root';
import Dashboard from './Pages/Dashboard';
import User from './Pages/User';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children:[
      {
        path:"/dashboard",
        Component:Dashboard
      },
      {
        path:"/user",
        Component:User
      }
    ]
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />,
  </StrictMode>,
)
