import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../customHooks/useAdmin";
import useSeller from "../customHooks/useSeller";
import Loader from "../shared/Loader/Loader";

const SellerRoute = ({ children }) => {
  const { user, loading, logout } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const location = useLocation();
  if (loading || isSellerLoading || isAdminLoading) {
    return <Loader></Loader>;
  }
  if ((user && isSeller) || (user && isAdmin)) {
    return children;
  }
  logout();
  return <Navigate to="/login" state={{ form: location }} replace></Navigate>;
};

export default SellerRoute;
