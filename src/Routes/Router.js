import Blog from "../pages/Blog/Blog";
import Home from "../pages/Home/Home";
import Login from "../pages/LoginRegister/Login/Login";
import LoginRegister from "../pages/LoginRegister/LoginRegister";
import Register from "../pages/LoginRegister/Register/Register";
import NotFound from "../shared/NotFound/NotFound";

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
    path: "*",
    element: <NotFound></NotFound>,
  },
]);
export default router;
