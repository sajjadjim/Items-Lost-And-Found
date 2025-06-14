import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayouts from "../Components/MainLayouts/MainLayouts";
import Home from "../Components/Home/Home Page/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayouts,
    children:[
      {
        index: true, // This means this is the default route for the parent path
         Component:Home
      }
    ]
  },
]);

export default router;

