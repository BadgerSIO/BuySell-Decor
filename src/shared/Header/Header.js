import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  MdAddBusiness,
  MdLogout,
  MdOutlineDashboardCustomize,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { AuthContext } from "../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "../../axios";
import Loader from "../Loader/Loader";
import { FaBoxes } from "react-icons/fa";
import useSeller from "../../customHooks/useSeller";
import useAdmin from "../../customHooks/useAdmin";
const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isSeller] = useSeller(user?.email);
  const [isAdmin] = useAdmin(user?.email);
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get("/categories");
      return data;
    },
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  let pathname = location.pathname.split("/")[1];

  const handleHover = () => {
    setShowDropdown(true);
  };
  const handleLeave = () => {
    setShowDropdown(false);
  };
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/category/${id}`);
  };

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
      <li>
        {location.pathname === "/" ? (
          <a href="#reviews" className={notActiveClassName}>
            Reviews
          </a>
        ) : (
          <Link to="/#reviews" className={notActiveClassName}>
            Reviews
          </Link>
        )}
      </li>
    </>
  );
  const categoryLinks = (
    <li
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className="group hover:bg-accent text-sm hover:text-neutral rounded-md py-2 pt-[10px] px-3  font-semibold capitalize lg:mr-2 mb-2 lg:mb-0"
    >
      Categories
      <ul
        className={`${
          showDropdown ? "flex" : "hidden"
        } p-2 bg-accent border rounded w-28 group-hover:flex space-y-3 transition-transform z-10`}
      >
        {categories?.map((category) => (
          <li
            key={category._id}
            className="cursor-pointer hover:bg-white py-1 px-2"
            onClick={() => handleNavigate(category._id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </li>
  );

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className=" border-b border-gray-100  flex items-center">
      <div className="navbar bg-base-100 p-0">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="mr-5 inline-block lg:hidden cursor-pointer p-2 border rounded-md hover:bg-primary/20"
            >
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
              {categoryLinks}
            </ul>
          </div>
          <Link to="/" className="font-bold text-sm lg:text-xl">
            <span className="text-primary">BuySell</span> Decor
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal p-0">
            {navlinks}
            {categoryLinks}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            {user?.email ? (
              <div>
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar relative"
                >
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL} alt="" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <div className="w-[60px] rounded-full mx-auto mt-3 mb-2 ">
                    <img
                      src={user?.photoURL}
                      alt=""
                      className="w-[70px] rounded-full mx-auto ring-offset-4 ring-2"
                    />
                  </div>
                  <h2 className="text-sm text-center capitalize ">
                    {user?.displayName}
                  </h2>
                  <hr className="my-3" />
                  <li>
                    <Link className="justify-start" to="/dashboard">
                      <MdOutlineSpaceDashboard /> Dashboard
                    </Link>
                  </li>
                  {(isAdmin || isSeller) && (
                    <>
                      <li>
                        <Link
                          className="justify-start"
                          to="/dashboard/addProduct"
                        >
                          <MdAddBusiness /> Add Product
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="justify-start"
                          to="/dashboard/myProducts"
                        >
                          <FaBoxes /> My Products
                        </Link>
                      </li>
                    </>
                  )}

                  <li onClick={logout}>
                    <button>
                      <MdLogout /> Logout
                    </button>
                  </li>
                </ul>
                {pathname === "dashboard" && (
                  <label
                    htmlFor="dashboard"
                    className=" lg:hidden inline-block "
                  >
                    <MdOutlineDashboardCustomize className="text-3xl cursor-pointer" />
                  </label>
                )}
              </div>
            ) : (
              <>
                <li className="list-none">
                  <Link
                    to="/login"
                    className="bg-primary py-1 px-2 text-white rounded"
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
