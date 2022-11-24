import Blog from "../pages/Blog/Blog";
import Home from "../pages/Home/Home";
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
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);
export default router;
