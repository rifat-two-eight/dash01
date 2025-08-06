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
import Subscription from './Pages/Subscription';
import UserDetails from './Pages/UserDetails';
import ErrorPage from './Pages/ErrorPage';


const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        path:"/dashboard",
        Component:Dashboard
      },
      {
        path:"/user",
        Component:User
      },
      {
        path:"/subscription",
        Component:Subscription
      },
      {
        path:"/user/id",
        Component: UserDetails
      }
    ]
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <div className="inter">
    <RouterProvider router={router} />
  </div>
  </StrictMode>,
)
