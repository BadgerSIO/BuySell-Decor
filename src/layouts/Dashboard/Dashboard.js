import React, { useContext } from "react";
import { FaBoxes, FaUsers, FaUserTag } from "react-icons/fa";
import { MdAddBusiness, MdShoppingCart } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useAdmin from "../../customHooks/useAdmin";
import useSeller from "../../customHooks/useSeller";
import Header from "../../shared/Header/Header";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);
  let activeClassName = "bg-[#F1F5F9] rounded-md capitalize  m-2 md:m-3 ";
  let notActiveClassName =
    "hover:bg-[#F1F5F9] rounded-md capitalize  m-2 md:m-3 ";
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
        <div className="drawer-side  ">
          <label htmlFor="dashboard" className="drawer-overlay"></label>
          <ul className="menu py-4 pl-4 w-80 bg-base-100 text-base-content font-semibold">
            {/* <!-- Sidebar content here --> */}
            <li className="text-2xl mx-3 mb-10 capitalize font-bold m">
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
                <MdShoppingCart className="md:text-xl" /> My Orders
              </NavLink>
            </li>
            {(isSeller || isAdmin) && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/addProduct"
                    end
                    className={({ isActive }) =>
                      isActive ? activeClassName : notActiveClassName
                    }
                  >
                    <MdAddBusiness className="md:text-xl" /> Add A product
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myProducts"
                    end
                    className={({ isActive }) =>
                      isActive ? activeClassName : notActiveClassName
                    }
                  >
                    <FaBoxes className="md:text-xl" /> My products
                  </NavLink>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/allsellers"
                    end
                    className={({ isActive }) =>
                      isActive ? activeClassName : notActiveClassName
                    }
                  >
                    <FaUserTag className="md:text-xl" /> All sellers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/allbuyers"
                    end
                    className={({ isActive }) =>
                      isActive ? activeClassName : notActiveClassName
                    }
                  >
                    <FaUsers className="md:text-xl" /> All buyers
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
