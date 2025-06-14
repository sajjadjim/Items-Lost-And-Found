import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayouts from "../Components/MainLayouts/MainLayouts";
import Home from "../Components/Home/Home Page/Home";
import Login from "../Components/Login and signup Page/Login";
import SignUp from "../Components/Login and signup Page/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayouts,
    children:[
      {
        index: true, // This means this is the default route for the parent path
         Component:Home
      },
      {
        path:'/login',
        Component:Login
      },
      {
        path:'/signup',
        Component:SignUp
      }
    ]
  },
]);

export default router;

