import {createBrowserRouter} from "react-router-dom";
import Layout from "@/pages/Layout";
import Year from "@/pages/Year";
import Month from "@/pages/Month";
import New from "@/pages/New";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/year",
        element: <Year />,
      },
      {
        index: true,//默认二级路由
        element: <Month />,
      },
    ],
  },
  {
    path: "/new",
    element: <New />,
  },
])

export default router