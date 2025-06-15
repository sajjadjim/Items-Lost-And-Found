import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayouts from "../Components/MainLayouts/MainLayouts";
import Home from "../Components/Home/Home Page/Home";
import Login from "../Components/Login and signup Page/Login";
import SignUp from "../Components/Login and signup Page/SignUp";
import PrivateRoute from "../Authcontext/Privateroute";
import Add_item from "../Components/Add Lost and Found Items/Add_item";
import AllItemsView from "../Components/All Items List View/AllItemsView";
import CurrentUser_Myitems from "../Components/Log in User Info/CurrentUser_Myitems";
import ErroPage from "../Error Page/ErroPage";
import User_info from "../Components/Log in User Info/User_info";

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
      },
      {
        path:'/addItems',
        element:<PrivateRoute><Add_item></Add_item></PrivateRoute>
      },
      {
        path:'/postItems',
        element:<PrivateRoute><AllItemsView></AllItemsView></PrivateRoute>
      },
      {
        path:'/myItems',
        element:<PrivateRoute><CurrentUser_Myitems></CurrentUser_Myitems></PrivateRoute>
      },
      {
        path: '/*',
        Component:ErroPage
      },
      {
        path:'/userInfo',
        element:<PrivateRoute><User_info></User_info></PrivateRoute>
      }
    ]
  },
]);

export default router;

