import React, { useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  MdLogout,
  MdOutlineDashboardCustomize,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { AuthContext } from "../../context/AuthProvider";
const Header = () => {
  const { user, logout } = useContext(AuthContext);
  let activeClassName =
    "bg-accent text-primary rounded-md py-2 px-3 font-semibold capitalize lg:mr-2 mb-2 lg:mb-0";
  let notActiveClassName =
    "hover:bg-accent text-sm hover:text-neutral rounded-md py-2 px-3  font-semibold capitalize lg:mr-2 mb-2 lg:mb-0";
  const navlinks = (
    <>
      {[
        ["Home", "/"],
        ["Blog", "/blog"],
      ].map(([title, url]) => {
        return (
          <li key={url}>
            <NavLink
              to={url}
              className={({ isActive }) =>
                isActive ? activeClassName : notActiveClassName
              }
            >
              {title}
            </NavLink>
          </li>
        );
      })}
    </>
  );
  const location = useLocation();
  let pathname = location.pathname.split("/")[1];
  console.log(pathname);
  return (
    <div className=" border-b border-gray-100 h-[8vh]">
      <div className="navbar bg-base-100">
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
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navlinks}
            </ul>
          </div>
          <Link className="font-bold">
            <span className="text-primary">BuySell</span> Decor
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal p-0">{navlinks}</ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            {user?.email ? (
              <div className="">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL} alt="" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link className="justify-start" to="/dashboard">
                      <MdOutlineSpaceDashboard /> Dashboard
                    </Link>
                  </li>

                  <li onClick={logout}>
                    <button>
                      <MdLogout /> Logout
                    </button>
                  </li>
                </ul>
                {pathname === "dashboard" ? (
                  <label
                    htmlFor="dashboard"
                    className=" lg:hidden inline-block "
                  >
                    <MdOutlineDashboardCustomize className="text-3xl cursor-pointer" />
                  </label>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <>
                <li className="list-none">
                  <Link
                    to="/login"
                    className="bg-primary py-2 px-3 text-white rounded"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
