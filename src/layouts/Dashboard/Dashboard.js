import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Header from "../../shared/Header/Header";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  let activeClassName = "bg-[#F1F5F9]   rounded-l-md capitalize  mb-2 ";
  let notActiveClassName = "hover:bg-[#F1F5F9]  rounded-l-md capitalize  mb-2 ";
  return (
    <div>
      <div className="drawer drawer-mobile bg-[#F1F5F9]  ">
        <input id="dashboard" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {/* <!-- Page content here --> */}
          <Header></Header>
          <div className="p-10">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side ">
          <label htmlFor="dashboard" className="drawer-overlay"></label>
          <ul className="menu py-4 pl-4 w-80 bg-base-100 text-base-content font-semibold">
            {/* <!-- Sidebar content here --> */}
            <li className="text-2xl mb-10 capitalize font-bold">
              Hi! {user?.displayName.split(" ")[0]}
            </li>
            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  isActive ? activeClassName : notActiveClassName
                }
              >
                My Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/addProduct"
                end
                className={({ isActive }) =>
                  isActive ? activeClassName : notActiveClassName
                }
              >
                Add A product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/allsellers"
                end
                className={({ isActive }) =>
                  isActive ? activeClassName : notActiveClassName
                }
              >
                All sellers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/allbuyers"
                end
                className={({ isActive }) =>
                  isActive ? activeClassName : notActiveClassName
                }
              >
                All buyers
              </NavLink>
            </li>
            {/* {admin && (
              <>
                <li>
                  <NavLink
                    to="allusers"
                    className={({ isActive }) =>
                      isActive ? activeClassName : notActiveClassName
                    }
                  >
                    All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="addDoctor"
                    className={({ isActive }) =>
                      isActive ? activeClassName : notActiveClassName
                    }
                  >
                    Add Doctor
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="manageDoctors"
                    className={({ isActive }) =>
                      isActive ? activeClassName : notActiveClassName
                    }
                  >
                    Manage Doctors
                  </NavLink>
                </li>
              </>
            )} */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
