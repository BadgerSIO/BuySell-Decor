import axios from "../axios";
import Dashboard from "../layouts/Dashboard/Dashboard";
import Payment from "../layouts/Dashboard/Payment";
import PaymentSuccess from "../layouts/Dashboard/PaymentSuccess";
import Addproduct from "../pages/Addproduct/Addproduct";
import AllBuyers from "../pages/AllBuyers/AllBuyers";
import AllSellers from "../pages/AllSellers/AllSellers";
import Blog from "../pages/Blog/Blog";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import Home from "../pages/Home/Home";
import Login from "../pages/LoginRegister/Login/Login";
import LoginRegister from "../pages/LoginRegister/LoginRegister";
import Register from "../pages/LoginRegister/Register/Register";
import MyOrders from "../pages/MyOrders/MyOrders";
import MyProducts from "../pages/MyProducts/MyProducts";
import ReportedItems from "../pages/ReportedItems/ReportedItems";
import SingleProduct from "../pages/SingleProduct.js/SingleProduct";
import DisplayErrors from "../shared/DisplayErrors/DisplayErrors";
import NotFound from "../shared/NotFound/NotFound";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../layouts/Main/Main");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayErrors></DisplayErrors>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/category/:id",
        loader: async ({ params }) => axios(`/productsByCategory/${params.id}`),
        element: (
          <PrivateRoute>
            <CategoryPage></CategoryPage>
          </PrivateRoute>
        ),
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
      {
        path: "/product/:id",
        loader: async ({ params }) =>
          axios(`/product/${params.id}`, {
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }),
        element: <SingleProduct />,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <DisplayErrors></DisplayErrors>,
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
          <AdminRoute>
            <AllSellers></AllSellers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allbuyers",
        element: (
          <AdminRoute>
            <AllBuyers></AllBuyers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reportedItems",
        element: (
          <AdminRoute>
            <ReportedItems></ReportedItems>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <CheckoutPage />,
        loader: async ({ params }) =>
          fetch(
            `https://buysell-decor-server.vercel.app/bookingPayment/${params.id}`
          ),
      },
      {
        path: "/dashboard/paymentSuccess",
        element: <PaymentSuccess />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);
export default router;
