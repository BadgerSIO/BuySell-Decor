import Dashboard from "../layouts/Dashboard/Dashboard";
import Addproduct from "../pages/Addproduct/Addproduct";
import AllBuyers from "../pages/AllBuyers/AllBuyers";
import AllSellers from "../pages/AllSellers/AllSellers";
import Blog from "../pages/Blog/Blog";
import Home from "../pages/Home/Home";
import Login from "../pages/LoginRegister/Login/Login";
import LoginRegister from "../pages/LoginRegister/LoginRegister";
import Register from "../pages/LoginRegister/Register/Register";
import MyOrders from "../pages/MyOrders/MyOrders";
import MyProducts from "../pages/MyProducts/MyProducts";
import NotFound from "../shared/NotFound/NotFound";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

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
        element: (
          <SellerRoute>
            <Addproduct></Addproduct>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/myProducts",
        element: (
          <SellerRoute>
            <MyProducts></MyProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/allsellers",
        element: (
          <SellerRoute>
            <AllSellers></AllSellers>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/allbuyers",
        element: (
          <SellerRoute>
            <AllBuyers></AllBuyers>
          </SellerRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);
export default router;
