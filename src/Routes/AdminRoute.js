import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../customHooks/useAdmin";
import Loader from "../shared/Loader/Loader";

const AdminRoute = ({ children }) => {
  const { user, loading, logout } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);

  const location = useLocation();
  if (loading || isAdminLoading) {
    return <Loader></Loader>;
  }
  if (user && isAdmin) {
    return children;
  }
  logout();
  return <Navigate to="/login" state={{ form: location }} replace></Navigate>;
};

export default AdminRoute;
