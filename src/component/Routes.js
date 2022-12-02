import AllUsers from "../DashBoard/Admin/AllUsers";
import Layout from "../DashBoard/Dashboard_Layout/Layout";
import AddProduct from "../DashBoard/Seller/AddProduct";
import MyProducts from "../DashBoard/Seller/MyProducts";
import Orders from "../DashBoard/User/Orders";
import WishList from "../DashBoard/User/WishList";
import AdminRoute from "../Routes/Admin/AdminRoute";
import PrivateRoute from "../Routes/PrivateRoute/PrivateRoute";
import SellerRoute from "../Routes/SellerRoute/SellerRoute";
import Bikes from "./BikeDetails/Bikes";
import Blogs from "./Blogs";
import ErrorPage from "./ErrorPage";
import Login from "./Login";
import Register from "./Register";

const { createBrowserRouter } = require("react-router-dom");
const { default: Home } = require("./Home");
const { default: Main } = require("./Layout/Main");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/bikes/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/bikes/${params.id}`),
        element: (
          <PrivateRoute>
            <Bikes></Bikes>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Layout></Layout>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Orders></Orders>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/wishlist",
        element: (
          <PrivateRoute>
            <WishList></WishList>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myproduct",
        element: (
          <SellerRoute>
            <MyProducts></MyProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/addproducts",
        element: (
          <SellerRoute>
            <AddProduct></AddProduct>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
