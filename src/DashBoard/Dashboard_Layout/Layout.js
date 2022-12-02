import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { Authcontext } from "../../component/Context/AuthProvider";
import Footer from "../../component/Footer";
import Navbar from "../../component/Navbar";
import useAdmin from "../../UseHooks/USeAdmin/UseAdmin";
import useSeller from "../../UseHooks/UseSeller/UseSeller";

const Layout = () => {
  const { user } = useContext(Authcontext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);
  return (
    <div>
      <Navbar></Navbar>
      <div className="mx-10">
        <div className="drawer drawer-end">
          <input id="dashboard" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <Outlet></Outlet>
          </div>
          <div className="drawer-side">
            <label htmlFor="dashboard" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 bg-base-100 text-base-content">
              {!isSeller && !isAdmin && (
                <>
                  <li>
                    <Link className="text-2xl text-green-400" to={"/dashboard"}>
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-2xl text-green-400"
                      to={"/dashboard/wishlist"}
                    >
                      My Wishlist
                    </Link>
                  </li>
                </>
              )}
              {isAdmin && (
                <>
                  <li>
                    <Link
                      className="text-2xl text-green-400"
                      to={"/dashboard/allusers"}
                    >
                      All Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-2xl text-green-400"
                      to={"/dashboard/reports"}
                    >
                      Report
                    </Link>
                  </li>
                </>
              )}
              {isSeller && (
                <>
                  <li>
                    <Link
                      className="text-2xl text-green-400"
                      to={"/dashboard/addproducts"}
                    >
                      Add Product
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-2xl text-green-400"
                      to={"/dashboard/myproduct"}
                    >
                      My Product
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Layout;
