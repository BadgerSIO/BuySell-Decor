import Dashboard from "../layouts/Dashboard/Dashboard";
import Addproduct from "../pages/Addproduct/Addproduct";
import Blog from "../pages/Blog/Blog";
import Home from "../pages/Home/Home";
import Login from "../pages/LoginRegister/Login/Login";
import LoginRegister from "../pages/LoginRegister/LoginRegister";
import Register from "../pages/LoginRegister/Register/Register";
import MyOrders from "../pages/MyOrders/MyOrders";
import NotFound from "../shared/NotFound/NotFound";
import PrivateRoute from "./PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../layouts/Main/Main");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/login",
        element: <LoginRegister></LoginRegister>,
        children: [
          {
            path: "/login",
            element: <Login></Login>,
          },
          {
            path: "/login/register",
            element: <Register></Register>,
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/addProduct",
        element: <Addproduct></Addproduct>,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);
export default router;
