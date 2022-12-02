import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Authcontext } from "../../component/Context/AuthProvider";

import useSeller from "../../UseHooks/UseSeller/UseSeller";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(Authcontext);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  const location = useLocation();

  if (loading || isSellerLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && isSeller) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;
