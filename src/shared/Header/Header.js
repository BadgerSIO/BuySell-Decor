import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
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
  return (
    <div className="container border-b border-gray-100 h-[7vh]">
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
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{navlinks}</ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" alt="" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link className="justify-between" href="/">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link>Settings</Link>
              </li>
              <li>
                <Link>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
