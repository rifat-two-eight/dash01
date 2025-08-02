import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from './Layout/Root';
import Dashboard from './Pages/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children:[
      {
        path:"/dashboard",
        Component:Dashboard
      }
    ]
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />,
  </StrictMode>,
)
