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
import UpdateItems from "../Components/Log in User Info/UpdateItems";
import DetailsItems from "../Components/All Items List View/DetailsItems";
import RecoverItems from "../Components/Log in User Info/RecoverItems";
import ContactPage from "../Components/Contact/ContactPage";
import FaQ from "../Components/SomeFrequentyQuestion/FaQ";
import AboutUs from "../Components/About us/AboutUs";
import TermOfUser from "../Components/Home/Footer/Footer Link/TermOfUser";
// import PrivacyPolicy from "../Components/Home/Footer/Footer Link/PrivacyPolicy";
import Terms_of_user from "../Components/Home/Footer/Footer Link/Terms_of_user";

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
      },
      {
        path:'/updateItems/:id',
        loader: ({ params }) => fetch(`https://b11a11-server-side-sajjadjim.vercel.app/itemsAll/${params.id}`),
        element:<PrivateRoute><UpdateItems></UpdateItems></PrivateRoute>
      },
      {
        path:'/detailsItem/:id',
        loader: ({ params }) => fetch(`https://b11a11-server-side-sajjadjim.vercel.app/itemsAll/${params.id}`), 
        element:<PrivateRoute><DetailsItems></DetailsItems></PrivateRoute>
      },
      {
        path:'/recoverItems',
        element:<PrivateRoute><RecoverItems></RecoverItems></PrivateRoute>
      },
      {
        path:'/contact',
        Component:ContactPage
      },
      {
        path:'/FaQ',
        Component: FaQ
      },
      {
        path:'/aboutUs',
        Component: AboutUs
      },
      {
        path:'/termOfUse'
        ,
        Component:TermOfUser
      },
      // {
      //   path:'/privacyPolicy',
      //   Component:PrivacyPolicy
      // },
      {
        path:'/termOfUse',
        Component: Terms_of_user
      }
    ]
  },
]);

export default router;

