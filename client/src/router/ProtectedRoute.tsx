import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUserIsAuthenticated } from "../app/selects/userSelects";

type ProtectedRouteProps = {
  children: ReactElement;
  navigateTo: string;
  requireAuth: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  navigateTo,
  requireAuth,
}) => {
  const isAuth = useSelector(selectUserIsAuthenticated);

  if (requireAuth && isAuth) {
    return children;
  } else if (!requireAuth && !isAuth) {
    return children;
  }

  return <Navigate to={navigateTo} />;
};

export default ProtectedRoute;
