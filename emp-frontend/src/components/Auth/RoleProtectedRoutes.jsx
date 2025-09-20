import React from "react";
import { Navigate } from "react-router-dom";
import { getTokenAndRole } from "../../utils/auth";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
    const { token, role } = getTokenAndRole();

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/app/dashboard" replace />;
    }

    return children;
};

export default RoleProtectedRoute;
