import React, { useContext } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { Authcontext } from "./Context/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(Authcontext);

  const handleLogout = () => {
    logout()
      .then(swal("User Logged Out"))
      .catch((error) => swal(error.message));
  };

  const menuItems = (
    <>
      <li>
        <Link to="/" className="text-2xl text-green-400">
          Home
        </Link>
      </li>
      <li>
        <Link to="/blogs" className="text-2xl text-green-400">
          Blogs
        </Link>
      </li>
      {user?.uid ? (
        <>
          <li>
            <Link to="/dashboard" className="text-2xl text-green-400">
              Dashboard
            </Link>
          </li>
          <li>
            <button className="text-2xl text-green-400" onClick={handleLogout}>
              Sign Out
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login" className="text-2xl text-green-400">
            Login
          </Link>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 flex justify-between">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={1}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost normal-case text-5xl font-bold text-green-400"
        >
          Bike Mart
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu  menu-horizontal p-0">{menuItems}</ul>
      </div>
      <label htmlFor="dashboard" tabIndex={2} className="btn btn-ghost ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
    </div>
  );
};

export default Navbar;
